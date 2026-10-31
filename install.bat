@echo off
rem Double-click to set up Agent HQ, the vault and the Roblox gate.
where node >nul 2>nul || (
  echo Node.js is not installed. Get it from https://nodejs.org, then run this again.
  pause
  exit /b 1
)
node "%~dp0install.mjs" %*
pause
