@echo off
set "GIT_EXE=C:\Users\Admin\AppData\Local\Programs\Git\cmd\git.exe"
set "PROJECT_DIR=C:\Users\Admin\Desktop\APP_hotrotaoqrcode"

cd /d "%PROJECT_DIR%"

echo ===================================================
echo   DANG DAY CODE LEN GITHUB:
echo   https://github.com/huynd1995/MNPH.git
echo ===================================================
echo.

"%GIT_EXE%" status
echo.
echo ---------------------------------------------------
echo Dang day code len branch main...
echo (Neu co trinh duyet hien len, hay bam Authorize/Dang nhap nhe)
echo ---------------------------------------------------
echo.

"%GIT_EXE%" push -u origin main

echo.
echo ===================================================
echo   HOAN TAT! Hay kiem tra tren GitHub:
echo   https://github.com/huynd1995/MNPH
echo ===================================================
echo.
pause
