param([string]$ProductionRoot)
$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
Push-Location $project
try {
  $composeArgs = @()
  if ($ProductionRoot) {
    $ProductionRoot = (Resolve-Path -LiteralPath $ProductionRoot).Path
    $envFile = Join-Path $ProductionRoot '.env'
    $dataPath = Join-Path $ProductionRoot 'deploy/data'
    if (!(Test-Path -LiteralPath $envFile) -or !(Test-Path -LiteralPath (Join-Path $dataPath 'price-history.sqlite'))) {
      throw 'Existing production environment and database are required'
    }
    $env:DATA_DIR = $dataPath.Replace('\', '/')
    $composeArgs = @('--env-file', $envFile, '--project-name', 'dpstools01')
  }
  & node --check dist/app.js
  if ($LASTEXITCODE -ne 0) { throw 'Frontend syntax check failed' }
  & node --test 'collector/test/*.test.mjs'
  if ($LASTEXITCODE -ne 0) { throw 'Tests failed; deployment stopped' }
  & node scripts/write-version.mjs
  if ($LASTEXITCODE -ne 0) { throw 'Version generation failed' }
  & docker compose @composeArgs -f compose.yaml -f compose.cloudflare.yaml up -d --build --wait --wait-timeout 180
  if ($LASTEXITCODE -ne 0) { throw 'Docker deployment failed' }
  & docker compose @composeArgs -f compose.yaml -f compose.cloudflare.yaml ps
} finally {
  Pop-Location
}

