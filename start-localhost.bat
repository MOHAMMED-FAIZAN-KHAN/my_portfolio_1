@echo off
cd /d "%~dp0"
echo Starting your portfolio website...
echo.
echo Keep this window open while you use the website.
echo Open this URL in your browser:
echo http://127.0.0.1:5176/index.html
echo.
npm.cmd run dev -- --host 127.0.0.1 --port 5176 --strictPort
echo.
echo Server stopped. Press any key to close this window.
pause >nul
