$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
Push-Location $project
try {
  & node --check dist/app.js
  if ($LASTEXITCODE -ne 0) { throw 'Frontend syntax check failed' }
  & node --test 'collector/test/*.test.mjs'
  if ($LASTEXITCODE -ne 0) { throw 'Tests failed; deployment stopped' }
  & node scripts/write-version.mjs
  if ($LASTEXITCODE -ne 0) { throw 'Version generation failed' }
  & docker compose -f compose.yaml -f compose.cloudflare.yaml up -d --build --wait
  if ($LASTEXITCODE -ne 0) { throw 'Docker deployment failed' }
  & docker compose -f compose.yaml -f compose.cloudflare.yaml ps
} finally {
  Pop-Location
}

