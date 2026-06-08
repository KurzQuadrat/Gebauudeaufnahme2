@echo off
REM ============================================================
REM  Lokaler Testserver — Gebäudeerfassung (Kurz Quadrat)
REM  Doppelklick genügt. Fenster schliessen zum Stoppen.
REM ============================================================
cd /d "%~dp0"
echo Starte lokalen Testserver...
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0start-local-server.ps1"
pause
