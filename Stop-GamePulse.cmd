@echo off
setlocal
title GAME PULSE Stop
pushd "%~dp0"
where powershell.exe >nul 2>nul
if errorlevel 1 goto no_powershell
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Stop-GamePulse.ps1"
popd
goto done
:no_powershell
echo PowerShell was not found on this computer.
:done
echo.
pause
endlocal
