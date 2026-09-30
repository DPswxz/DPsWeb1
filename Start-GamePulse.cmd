@echo off
setlocal
title GAME PULSE Launcher
pushd "%~dp0"
where powershell.exe >nul 2>nul
if errorlevel 1 goto no_powershell
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Start-GamePulse.ps1" -Mode Menu
set "EXITCODE=%ERRORLEVEL%"
popd
if not "%EXITCODE%"=="0" goto failed
goto done
:no_powershell
echo PowerShell was not found on this computer.
goto failed
:failed
echo.
echo GAME PULSE failed to start. Please check the message above.
:done
echo.
pause
endlocal
