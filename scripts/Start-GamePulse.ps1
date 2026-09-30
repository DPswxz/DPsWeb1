[CmdletBinding()]
param(
  [ValidateSet('Menu', 'Local', 'Public')]
  [string]$Mode = 'Menu',
  [ValidateRange(1024, 65535)]
  [int]$Port = 8787,
  [ValidateRange(5, 1440)]
  [int]$RefreshMinutes = 60,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$projectRoot = Split-Path -Parent $PSScriptRoot
$collectorDir = Join-Path $projectRoot 'collector'
$runDir = Join-Path $collectorDir 'run'
$binDir = Join-Path $collectorDir 'bin'
$processFile = Join-Path $runDir 'processes.json'
$publicUrlFile = Join-Path $runDir 'public-url.txt'
$serverOut = Join-Path $runDir 'server.out.log'
$serverErr = Join-Path $runDir 'server.err.log'
$tunnelOut = Join-Path $runDir 'tunnel.out.log'
$tunnelErr = Join-Path $runDir 'tunnel.err.log'
$localUrl = "http://127.0.0.1:$Port"

function Write-Step([string]$Text) {
  Write-Host "`n[GAME PULSE] $Text" -ForegroundColor Cyan
}

function Test-GamePulseHealth {
  try {
    $health = Invoke-RestMethod -Uri "$localUrl/health" -TimeoutSec 2
    return $health.ok -eq $true -and $health.service -eq 'game-pulse-nintendo-collector'
  } catch {
    return $false
  }
}

function Wait-GamePulseHealth([int]$TimeoutSeconds = 90) {
  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  do {
    if (Test-GamePulseHealth) { return $true }
    Start-Sleep -Milliseconds 500
  } while ((Get-Date) -lt $deadline)
  return $false
}

function Read-ProcessState {
  if (-not (Test-Path -LiteralPath $processFile)) { return [ordered]@{} }
  try {
    $raw = Get-Content -LiteralPath $processFile -Raw | ConvertFrom-Json
    $state = [ordered]@{}
    if ($raw.serverPid) { $state.serverPid = [int]$raw.serverPid }
    if ($raw.tunnelPid) { $state.tunnelPid = [int]$raw.tunnelPid }
    if ($raw.publicUrl) { $state.publicUrl = [string]$raw.publicUrl }
    return $state
  } catch {
    return [ordered]@{}
  }
}

function Save-ProcessState($State) {
  $State | ConvertTo-Json | Set-Content -LiteralPath $processFile -Encoding utf8
}

function Test-RunningProcess([int]$Id, [string]$ExpectedName) {
  if (-not $Id) { return $false }
  try {
    $process = Get-Process -Id $Id -ErrorAction Stop
    return $process.ProcessName -like "$ExpectedName*"
  } catch {
    return $false
  }
}

function Ensure-NodeDependencies {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw '未检测到 Node.js。请先安装 Node.js 20 或更高版本。'
  }
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw '未检测到 npm。请重新安装包含 npm 的 Node.js。'
  }
  if (-not (Test-Path -LiteralPath (Join-Path $collectorDir 'node_modules\express'))) {
    Write-Step '首次运行，正在安装采集器依赖……'
    & npm install --prefix $collectorDir
    if ($LASTEXITCODE -ne 0) { throw 'npm install 执行失败。' }
  }
}

function Get-LocalLanIp {
  try {
    $script = @"
const os = require('os');
const ifaces = os.networkInterfaces();
let best = null;
for (const [name, addrs] of Object.entries(ifaces)) {
  for (const a of addrs) {
    if (a.family === 'IPv4' && !a.internal && !a.address.startsWith('198.18.') && !name.toLowerCase().includes('vmware') && !name.toLowerCase().includes('virtual')) {
      best = a.address;
      break;
    }
  }
  if (best) break;
}
console.log(best || '');
"@
    $nodePath = (Get-Command node -ErrorAction Stop).Source
    $ip = (& $nodePath -e $script).Trim()
    if ($ip -and $ip -match '^\d+\.\d+\.\d+\.\d+$') {
      return $ip
    }
  } catch {}
  return $null
}

function Start-Collector($State) {
  $lanIp = Get-LocalLanIp
  if (Test-GamePulseHealth) {
    Write-Step "本机采集器已经运行："
    Write-Host "  本机地址：  $localUrl" -ForegroundColor Green
    if ($lanIp) {
      Write-Host "  局域网地址：http://$lanIp`:$Port (同一 Wi-Fi 手机/平板免翻墙秒开)" -ForegroundColor Cyan
    }
    return $State
  }

  if ($State.serverPid -and (Test-RunningProcess $State.serverPid 'node')) {
    throw '采集器进程仍在运行，但健康检查失败。请先双击“一键停止.cmd”，再重新启动。'
  }

  Write-Step '正在启动本机与局域网服务……'
  $env:HOST = '0.0.0.0'
  $env:PORT = [string]$Port
  $env:REFRESH_MINUTES = [string]$RefreshMinutes
  $env:SERVE_FRONTEND = '1'
  $env:ALLOWED_ORIGINS = '*'

  $nodePath = (Get-Command node -ErrorAction Stop).Source
  $server = Start-Process -FilePath $nodePath `
    -ArgumentList @('src/server.mjs') `
    -WorkingDirectory $collectorDir `
    -WindowStyle Hidden `
    -RedirectStandardOutput $serverOut `
    -RedirectStandardError $serverErr `
    -PassThru

  $State.serverPid = $server.Id
  Save-ProcessState $State
  if (-not (Wait-GamePulseHealth)) {
    $details = if (Test-Path -LiteralPath $serverErr) { Get-Content -LiteralPath $serverErr -Tail 20 | Out-String } else { '' }
    throw "采集器启动超时。`n$details"
  }
  Write-Host "本机地址：  $localUrl" -ForegroundColor Green
  if ($lanIp) {
    Write-Host "局域网地址：http://$lanIp`:$Port (同一 Wi-Fi 手机/平板免翻墙秒开)" -ForegroundColor Cyan
  }
  return $State
}

function Ensure-Cloudflared {
  $bundled = Join-Path $binDir 'cloudflared.exe'
  $installed = Get-Command cloudflared -ErrorAction SilentlyContinue
  if ($installed) { return $installed.Source }
  if (Test-Path -LiteralPath $bundled) { return $bundled }

  Write-Step '首次使用公网模式，正在下载 Cloudflare Tunnel……'
  $download = "$bundled.download"
  Invoke-WebRequest `
    -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' `
    -OutFile $download `
    -UseBasicParsing
  Move-Item -LiteralPath $download -Destination $bundled -Force
  return $bundled
}

function Wait-PublicUrl([int]$TimeoutSeconds = 60) {
  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  $pattern = 'https://[-a-z0-9]+\.trycloudflare\.com'
  do {
    foreach ($log in @($tunnelOut, $tunnelErr)) {
      if (Test-Path -LiteralPath $log) {
        $content = Get-Content -LiteralPath $log -Raw
        if ([string]::IsNullOrWhiteSpace($content)) { continue }
        $match = [regex]::Match($content, $pattern)
        if ($match.Success) { return $match.Value }
      }
    }
    Start-Sleep -Milliseconds 500
  } while ((Get-Date) -lt $deadline)
  return $null
}

function Start-PublicTunnel($State) {
  if ($State.tunnelPid -and (Test-RunningProcess $State.tunnelPid 'cloudflared') -and $State.publicUrl) {
    Write-Step "公网隧道已经运行：$($State.publicUrl)"
    return $State
  }

  if ($State.tunnelPid -and (Test-RunningProcess $State.tunnelPid 'cloudflared')) {
    $existingUrl = Wait-PublicUrl -TimeoutSeconds 3
    if ($existingUrl) {
      $State.publicUrl = $existingUrl
      $existingUrl | Set-Content -LiteralPath $publicUrlFile -Encoding utf8
      Save-ProcessState $State
      Write-Step "公网隧道已经运行：$existingUrl"
      return $State
    }
    Stop-Process -Id ([int]$State.tunnelPid) -Force
    $State.Remove('tunnelPid')
  }

  $cloudflared = Ensure-Cloudflared
  Remove-Item -LiteralPath $tunnelOut, $tunnelErr -Force -ErrorAction SilentlyContinue
  Write-Step '正在建立临时 HTTPS 公网隧道……'
  $tunnel = Start-Process -FilePath $cloudflared `
    -ArgumentList @('tunnel', '--url', $localUrl, '--protocol', 'http2', '--no-autoupdate') `
    -WorkingDirectory $collectorDir `
    -WindowStyle Hidden `
    -RedirectStandardOutput $tunnelOut `
    -RedirectStandardError $tunnelErr `
    -PassThru

  $State.tunnelPid = $tunnel.Id
  Save-ProcessState $State
  $publicUrl = Wait-PublicUrl
  if (-not $publicUrl) {
    $details = if (Test-Path -LiteralPath $tunnelErr) { Get-Content -LiteralPath $tunnelErr -Tail 30 | Out-String } else { '' }
    throw "公网隧道启动超时。`n$details"
  }
  $State.publicUrl = $publicUrl
  $publicUrl | Set-Content -LiteralPath $publicUrlFile -Encoding utf8
  Save-ProcessState $State
  Write-Host "公网地址：  $publicUrl" -ForegroundColor Green
  Write-Warning '提示：Cloudflare 免费临时域名（*.trycloudflare.com）在国内移动网络下受防火墙 SNI 阻断干扰（可能提示 ERR_CONNECTION_RESET）。'
  Write-Host '访问建议：' -ForegroundColor Yellow
  $lanIp = Get-LocalLanIp
  if ($lanIp) {
    Write-Host "  ● 同一 Wi-Fi 下手机/电脑：推荐直接用局域网地址 http://$lanIp`:$Port (无需翻墙、秒开)" -ForegroundColor White
  }
  Write-Host '  ● 外部 4G/5G 移动网络：访问端（手机/电脑）需要开启科学上网/代理工具方可访问 trycloudflare 临时链接' -ForegroundColor White
  return $State
}

if ($Mode -eq 'Menu') {
  Clear-Host
  Write-Host '========================================' -ForegroundColor DarkCyan
  Write-Host '       GAME PULSE 一键启动器' -ForegroundColor Cyan
  Write-Host '========================================' -ForegroundColor DarkCyan
  Write-Host '  1. 本机与局域网使用（推荐：同 Wi-Fi 手机/电脑直接秒开）'
  Write-Host '  2. 本机 + 临时公网 HTTPS 地址（Cloudflare 隧道，外网访问需代理）'
  Write-Host '  Q. 退出'
  $choice = Read-Host '请选择'
  switch ($choice.Trim().ToUpperInvariant()) {
    '1' { $Mode = 'Local' }
    '2' { $Mode = 'Public' }
    'Q' { return }
    default { throw '无效选项，请重新运行启动器。' }
  }
}

New-Item -ItemType Directory -Path $runDir, $binDir -Force | Out-Null
Ensure-NodeDependencies
$state = Read-ProcessState
$state = Start-Collector $state
$openUrl = $localUrl

if ($Mode -eq 'Public') {
  $state = Start-PublicTunnel $state
  $openUrl = $state.publicUrl
}

Save-ProcessState $state
if (-not $NoBrowser) { Start-Process $openUrl }

Write-Host "`n启动完成。关闭此窗口不会停止服务。" -ForegroundColor Green
Write-Host '需要停止时，请双击项目目录中的“一键停止.cmd”。'
