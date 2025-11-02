@echo off
echo ========================================
echo GITHUB'A YUKLEME BASLATILIYOR...
echo ========================================
echo.

git init
git add .
git commit -m "Eğitim çalar saati - İlk sürüm"

echo.
echo ========================================
echo SONRAKI ADIMLAR:
echo ========================================
echo 1. GitHub.com'da yeni repository olustur
echo 2. Repository adi: sinav-calar-saati (veya istediginiz)
echo 3. Asagidaki komutu calistirin (KULLANICI-ADI'ni degistirin):
echo.
echo    git remote add origin https://github.com/KULLANICI-ADI/sinav-calar-saati.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
pause

