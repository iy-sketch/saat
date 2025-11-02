# 🚀 ÜCRETSİZ SİTE OLARAK YAYINLAMA REHBERİ

## ⚡ EN KOLAY YÖNTEM: VERCEL (5 DAKİKA)

### Adım 1: GitHub'a Yükleme

```bash
# Terminal'de proje klasöründe:

# 1. Git başlat (eğer yapılmadıysa)
git init

# 2. Tüm dosyaları ekle
git add .

# 3. Commit yap
git commit -m "İlk sürüm - Eğitim çalar saati"

# 4. GitHub'da yeni repository oluştur (github.com'da)
#    Repository adı: sinav-calar-saati (veya istediğiniz isim)

# 5. GitHub'da oluşturduğunuz repository URL'ini kullanın
git remote add origin https://github.com/KULLANICI-ADI/sinav-calar-saati.git

# 6. Push yap
git branch -M main
git push -u origin main
```

### Adım 2: Vercel'e Deploy

1. **https://vercel.com** adresine git
2. "Sign up" → GitHub hesabınla giriş yap
3. "Add New Project" butonuna tıkla
4. GitHub repository'ni seç: `sinav-calar-saati`
5. **Import** butonuna tıkla
6. Ayarlar otomatik gelir:
   - Framework Preset: **Vite** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
7. **Deploy** butonuna tıkla!
8. 1-2 dakika sonra siteniz hazır! 🎉

**URL şöyle olur:** `sinav-calar-saati.vercel.app`

---

## 🌐 ALTERNATİF: NETLIFY

1. **https://netlify.com** → Sign up with GitHub
2. "Add new site" → "Import an existing project"
3. Repository'ni seç
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy Site!

---

## 📦 ALTERNATİF: GITHUB PAGES

1. GitHub repository'nde:
   - Settings → Pages
   - Source: **GitHub Actions** seç
   - Workflow dosyası zaten hazır! ✅

---

## 🎯 HEMEN ŞİMDİ YAPILACAKLAR

### 1. Vercel ile (ÖNERİLEN - En Hızlı):

```bash
# Terminal'de:
npm install -g vercel

# Proje klasöründe:
vercel

# Soruları cevaplayın:
# - Set up and deploy? Y
# - Which scope? [Enter]
# - Link to existing project? N
# - Project name? [Enter]
# - Directory? ./
# - Override settings? N

# 30 saniyede hazır! ✅
```

### 2. Manuel Vercel:

1. vercel.com → GitHub ile giriş
2. Import project → Repository seç
3. Deploy!

---

## ✨ ÖZELLEŞTİRME

### Özel Domain Ekleme (İsteğe Bağlı):

Vercel'de:
- Settings → Domains
- Domain adınızı ekleyin (örn: sinav-saati.com)

### Logo/Efavicon Ekleme:

`public/` klasörüne `favicon.ico` ekleyin.

---

## 📱 MOBİL UYUMLU

Siteniz otomatik olarak mobil uyumlu! ✅

---

## 💡 İPUÇLARI

- ✅ Tüm yöntemler **TAMAMEN ÜCRETSİZ**
- ✅ Sınırsız trafik
- ✅ SSL sertifikası otomatik (HTTPS)
- ✅ Anında global erişim
- ✅ Otomatik güncelleme (her push'ta yeniden deploy)

---

**SORUN MU VAR?** 
- GitHub repository paylaş, yardımcı olayım
- Veya Vercel/Netlify'da hata alırsanız, hata mesajını paylaşın

🎉 **BAŞARILAR!**

