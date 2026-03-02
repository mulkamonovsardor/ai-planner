# 🚀 AI Planner — PWA Deploy Qo'llanmasi

## Fayllar tarkibi
```
ai-planner-pwa/
├── index.html        ← Asosiy ilova
├── manifest.json     ← PWA konfiguratsiya
├── sw.js             ← Service Worker (offline)
├── icon-32.png       ← Favicon
├── icon-180.png      ← iOS icon
├── icon-192.png      ← Android icon  
├── icon-512.png      ← Splash screen icon
└── netlify.toml      ← Netlify sozlamalari
```

---

## ⚡ Netlify orqali deploy (5 daqiqa, BEPUL)

### 1. GitHub ga yuklash
```bash
git init
git add .
git commit -m "AI Planner PWA v1.0"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/ai-planner.git
git push -u origin main
```

### 2. Netlify.com da deploy
1. **netlify.com** ga kiring → "Add new site" → "Import from Git"
2. GitHub repo ni tanlang
3. Build settings: hech narsa o'zgartirmang
4. **"Deploy site"** tugmasini bosing
5. ✅ 2 daqiqada tayyor! `https://sizning-sayt.netlify.app`

### 3. Custom domen (ixtiyoriy)
- Netlify → Domain settings → Add custom domain
- Masalan: `aiplanner.uz`

---

## 📱 Telefonga o'rnatish

### Android (Chrome):
1. Saytga kiring
2. 30 soniyadan keyin "O'rnatish" banner chiqadi
3. Yoki: Chrome menu → "Add to Home Screen"

### iPhone (Safari):
1. Saytga kiring
2. Pastdagi "Share" (↑) tugmasini bosing
3. "Add to Home Screen" → "Add"

---

## 🔔 Push Notifications (keyingi qadam)
Push notifications uchun backend kerak bo'ladi.
Variantlar:
- **Firebase Cloud Messaging (FCM)** — bepul
- **OneSignal** — bepul tier bor, oson integratsiya
- **Supabase** — database + notifications

---

## 📊 PWA Score
Lighthouse audit da kutilayotgan ball:
- Performance: 90+
- Accessibility: 85+
- Best Practices: 95+
- SEO: 90+
- PWA: ✅

---

## 🗺️ Keyingi qadamlar
1. **Custom domen** (`aiplanner.uz`) — $10/yil
2. **Analytics** — Plausible yoki Umami (GDPR-friendly)
3. **Push notifications** — Firebase FCM
4. **Backend sync** — Supabase (ko'p qurilmada sinxronlash)
5. **App Store** — Capacitor bilan wrapping (1-2 oy)
