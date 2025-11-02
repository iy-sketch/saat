# 🌐 NETLIFY'DA YAYINLAMA REHBERİ

## 🚀 ADIM ADIM NETLIFY DEPLOY

### 1️⃣ GitHub'a Yükleme (Eğer yapılmadıysa)

Terminal'de proje klasöründe:

```bash
# 1. Git başlat
git init

# 2. Dosyaları ekle
git add .

# 3. Commit yap
git commit -m "Netlify deploy için hazırlık"

# 4. GitHub'da repository oluştur:
#    https://github.com → New repository
#    İsim: sinav-calar-saati
#    Public seç
#    Create repository

# 5. GitHub'a push (KULLANICI-ADI değiştir):
git remote add origin https://github.com/KULLANICI-ADI/sinav-calar-saati.git
git branch -M main
git push -u origin main
```

### 2️⃣ Netlify'a Deploy

#### A) Web'den Deploy (ÖNERİLEN):

1. **https://netlify.com** → "Sign up" → **GitHub** ile giriş yap

2. Dashboard'da **"Add new site"** → **"Import an existing project"**

3. **"Deploy with GitHub"** → GitHub hesabınızı bağlayın (iznin verin)

4. Repository seçin: **`sinav-calar-saati`**

5. **Deploy settings** (Otomatik gelir ama kontrol edin):
   - **Build command:** `npm run build` ✅
   - **Publish directory:** `dist` ✅
   - **Base directory:** (boş bırakın) ✅

6. **"Deploy site"** butonuna tıklayın!

7. ⏳ 2-3 dakika bekle... 

8. ✅ **HAZIR!** Site linkiniz: `sinav-calar-saati.netlify.app`

#### B) Netlify CLI ile (Terminal'den):

```bash
# 1. Netlify CLI kur
npm install -g netlify-cli

# 2. Netlify'da giriş yap
netlify login

# 3. Projeyi deploy et
netlify deploy

# 4. Production'a yayınla
netlify deploy --prod
```

### 3️⃣ Site Ayarları

#### Site İsmini Değiştirme:

1. Site Settings → **General** → **Site details**
2. **Change site name** → İstediğiniz ismi yazın
3. Link: `yeni-isim.netlify.app`

#### Özel Domain Ekleme (İsteğe Bağlı):

1. Site Settings → **Domain management**
2. **Add custom domain**
3. Domain adınızı ekleyin

---

## 🎯 DEPLOY SONRASI

### Otomatik Güncelleme:

Her GitHub'a push yaptığınızda Netlify otomatik deploy eder:

```bash
git add .
git commit -m "Yeni özellik"
git push
```

Netlify otomatik olarak yeniden deploy eder! 🎉

### Site Linkini Paylaşma:

✅ `sinav-calar-saati.netlify.app` linkini paylaşın
✅ Okullarda, öğrencilerde kullanılabilir
✅ Mobil uyumlu
✅ HTTPS (güvenli)

---

## 📱 MOBİL UYUMLU

Siteniz otomatik olarak mobil uyumlu! ✅

---

## ✨ ÖZELLİKLER

- ✅ Tamamen ücretsiz
- ✅ Sınırsız trafik
- ✅ HTTPS (SSL sertifikası)
- ✅ Global CDN (hızlı yükleme)
- ✅ Otomatik deploy
- ✅ Mobil uyumlu

---

## ❓ SORUN GİDERME

**Build hatası alırsanız:**
- Site Settings → Build & deploy → Build logs kontrol edin
- `npm run build` komutunu yerel olarak test edin

**Domain hatası:**
- Domain ayarlarını kontrol edin
- DNS ayarları için Netlify dokümantasyonuna bakın

**Başka sorun:**
- Netlify support ile iletişime geçin
- Veya issue açın

---

## 🎉 BAŞARILAR!

Siteniz hazır ve kullanıma açık! 🚀

