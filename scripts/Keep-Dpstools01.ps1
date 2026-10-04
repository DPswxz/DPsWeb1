$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$docker = (Get-Command docker.exe).Source
$probe = Start-Process $docker -ArgumentList 'info --format {{.ServerVersion}}' -WindowStyle Hidden -PassThru
if (-not $probe.WaitForExit(15000)) {
  $probe.Kill()
  exit 1
}
if ($probe.ExitCode -ne 0) {
  Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe' -WindowStyle Hidden
  exit 0
}
Set-Location $project
$keepRunning = Start-Process $docker -ArgumentList 'compose -f compose.yaml -f compose.cloudflare.yaml up -d' -WorkingDirectory $project -WindowStyle Hidden -PassThru
if (-not $keepRunning.WaitForExit(60000)) {
  $keepRunning.Kill()
  exit 1
}
exit $keepRunning.ExitCode
