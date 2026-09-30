[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$runDir = Join-Path $projectRoot 'collector\run'
$processFile = Join-Path $runDir 'processes.json'
$publicUrlFile = Join-Path $runDir 'public-url.txt'

if (-not (Test-Path -LiteralPath $processFile)) {
  Write-Host '没有找到正在运行的 GAME PULSE 进程记录。' -ForegroundColor Yellow
  return
}

try {
  $state = Get-Content -LiteralPath $processFile -Raw | ConvertFrom-Json
} catch {
  Write-Host '进程记录无法读取，请在任务管理器中检查 node 和 cloudflared 进程。' -ForegroundColor Red
  return
}

foreach ($entry in @(
  @{ Id = $state.tunnelPid; Name = 'cloudflared'; Label = '公网隧道' },
  @{ Id = $state.serverPid; Name = 'node'; Label = '本机采集器' }
)) {
  if (-not $entry.Id) { continue }
  try {
    $process = Get-Process -Id ([int]$entry.Id) -ErrorAction Stop
    if ($process.ProcessName -like "$($entry.Name)*") {
      Stop-Process -Id $process.Id -Force
      Write-Host "已停止：$($entry.Label)" -ForegroundColor Green
    } else {
      Write-Warning "PID $($entry.Id) 已被其他程序使用，未停止该进程。"
    }
  } catch {
    Write-Host "$($entry.Label) 已经停止。" -ForegroundColor DarkGray
  }
}

Remove-Item -LiteralPath $processFile, $publicUrlFile -Force -ErrorAction SilentlyContinue
Write-Host 'GAME PULSE 已完全停止。' -ForegroundColor Green
