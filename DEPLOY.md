# 🚀 Yayınlama Rehberi

Bu uygulamayı ücretsiz olarak yayınlamak için birkaç seçeneğiniz var:

## 1. GitHub Pages (Ücretsiz)

### Adımlar:

1. **GitHub'da Repository Oluşturun**
   ```bash
   git init
   git add .
   git commit -m "İlk commit: Eğitim amaçlı çalar saat uygulaması"
   git branch -M main
   git remote add origin https://github.com/KULLANICI-ADI/sinav-calar-saati.git
   git push -u origin main
   ```

2. **Vite Config'i Güncelleyin**
   `vite.config.js` dosyasına base path ekleyin:
   ```js
   export default {
     base: '/sinav-calar-saati/',
     // ... diğer ayarlar
   }
   ```

3. **GitHub Actions ile Otomatik Deploy**
   `.github/workflows/deploy.yml` dosyası oluşturun (aşağıda örnek var)

4. **GitHub Settings'ten Pages Aktifleştirin**
   - Settings > Pages
   - Source: GitHub Actions seçin

## 2. Vercel (Ücretsiz - Önerilen)

1. [Vercel.com](https://vercel.com)'a kaydolun
2. GitHub repository'nizi import edin
3. Build ayarları:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy butonuna tıklayın!

## 3. Netlify (Ücretsiz)

1. [Netlify.com](https://netlify.com)'a kaydolun
2. "Add new site" > "Import an existing project"
3. GitHub repository'nizi seçin
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

## 4. Okul Sunucusuna Yükleme

Okulunuzun kendi sunucusu varsa:

```bash
# Build oluşturun
npm run build

# dist klasörünü sunucuya yükleyin
# (FTP, SCP veya okulun yöntemi ile)
```

## 📝 Önemli Notlar

- ✅ Tüm bu yöntemler **tamamen ücretsiz**
- ✅ Eğitim amaçlı kullanım için hiçbir kısıtlama yok
- ✅ Okullarda kullanılması tamamen yasal ve etik
- ✅ MIT lisansı sayesinde herkes özgürce kullanabilir

## 🎓 Okullara Dağıtım

Okullara dağıtmak için:

1. GitHub repository linkini paylaşın
2. Veya yayınladığınız URL'i paylaşın
3. Öğretmenler ve öğrenciler direkt kullanabilir
4. Hiçbir ücret veya kayıt gerektirmez

---

**Not**: Bu uygulama eğitim amaçlıdır ve tamamen ücretsizdir. Ticari kullanım için değildir.

