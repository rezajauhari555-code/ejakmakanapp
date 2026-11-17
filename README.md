# 🍽️ Ejakmakan

**Ejakmakan** adalah aplikasi mobile penjelajah kuliner cerdas yang dibangun menggunakan **React Native + Expo SDK 58** (Frontend) dan **Node.js + Express 5** (Backend).

Repository Resmi: [https://github.com/rezajauhari555-code/ejakmakanapp](https://github.com/rezajauhari555-code/ejakmakanapp)

---

## ✨ Fitur Utama

1. **Onboarding & Pengenalan Aplikasi**
   - Panduan interaktif 3 langkah dengan tipografi iOS modern dan transisi halus.
2. **Autentikasi & Manajemen Sesi**
   - Google Sign-In menggunakan verifikasi token asli melalui `google-auth-library`.
   - Apple Sign-In asli untuk iOS melalui `apple-signin-auth`.
   - Autentikasi Email & Mode Eksplorasi Tamu.
   - Penyimpanan sesi aman pada perangkat menggunakan `expo-secure-store`.
3. **Personalisasi Preferensi Rasa**
   - Pemilihan kategori makanan favorit (Nusantara, Kopi & Kafe, Jepang & Asia, Western, Street Food, Dessert).
   - Penyesuaian suasana/mood kuliner (Makan Cepat, Nongkrong Santai, Family Time, Date Night, Kulineran Malam).
4. **Beranda & Eksplorasi**
   - Navigasi lokasi aktif (Jakarta, Indonesia).
   - Pencarian instan berdasarkan nama sentra kuliner, kategori, atau menu.
   - Filter cepat kategori kuliner.
   - Banner pintasan ke Roda Rekomendasi.
5. **🎯 Roda Rekomendasi Interaktif (Spinwheel)**
   - Roda putar animasi interaktif berbasis physics rotation untuk pengguna yang bingung memilih makanan.
   - 8 segmen rasa warna-warni dengan inspirasi hidangan spesifik.
   - Modal hasil putaran dengan aksi langsung mencari sentra kuliner di peta.
6. **⚙️ Spin Helper (Pengaturan Roda Putar)**
   - Halaman khusus untuk mengkustomisasi roda rekomendasi.
   - Preset cepat: *Makan Siang Hemat*, *Nongkrong & Kafe*, *Spesial & Dinner*, *Semua Selera*.
   - Filter target budget (*Hemat < 25k*, *Sedang 25k - 60k*, *Puas > 60k*).
   - Filter suasana/mood dan sakelar kurasi ramah Halal.
   - Manajemen aktivasi segmen roda sesuai keinginan pengguna.
7. **🗺️ Peta Kuliner Interaktif (Maps)**
   - Menggunakan `react-native-maps` dengan lokasi sentra kuliner nyata dan koordinat GPS akurat (Jalan Sabang, Blok M Little Tokyo, Senopati & Suryo, Pasar Santa, Benhil, Kelapa Gading, Pantai Maju PIK).
   - Filter chip kategori langsung di atas peta.
   - Kartu preview bawah (bottom sheet) dengan tombol rute langsung ke aplikasi Apple Maps / Google Maps bawaan.
8. **🔖 Koleksi Tempat Favorit**
   - Menyimpan sentra kuliner untuk dikunjungi kembali.
   - *Honest Empty State* yang informatif saat koleksi belum memiliki data.
9. **🔍 Detail Sentra Kuliner**
   - Informasi lengkap sentra rasa: foto cover, jam operasional, rating rasa, jarak estimasi, dan deskripsi kawasan.
   - Rekomendasi hidangan populer wajib coba.
   - Tombol integrasi kontak WhatsApp dan rute navigasi.
10. **👤 Profil & Pengaturan Aplikasi**
    - Ringkasan preferensi selera dan jumlah tempat yang disimpan.
    - Kontrol notifikasi, akses GPS, pembersihan cache, dan logout aman.

---

## 🏗️ Struktur Project Modular

```text
ejakmakanapp/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── providerAuth.js      # Verifikasi token Google & Apple
│   │   ├── app.js                   # Express application & routes
│   │   └── server.js                # Server entry point
│   ├── test/
│   │   └── app.test.js              # Vitest API integration test suite
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts             # Definisi tipe TypeScript
│   │   ├── theme/
│   │   │   ├── colors.ts            # Skema warna Figma
│   │   │   └── spacing.ts           # Spacing & border radius
│   │   ├── services/
│   │   │   ├── api.ts               # Klien HTTP backend
│   │   │   ├── authService.ts       # Manajemen login & SecureStore
│   │   │   └── culinaryData.ts      # Data sentra kuliner nyata & opsi spin
│   │   ├── components/
│   │   │   ├── common/              # Header, Button, Input, Icon, EmptyState
│   │   │   ├── home/                # CategoryCard, DestinationCard, PromoBanner
│   │   │   ├── spinwheel/           # SpinWheel, SpinResultModal
│   │   │   └── navigation/          # BottomTabBar
│   │   └── screens/
│   │       ├── OnboardingScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       ├── RegisterScreen.tsx
│   │       ├── PreferencesScreen.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── RecommendationsScreen.tsx # Layar Spinwheel
│   │       ├── SpinHelperScreen.tsx      # Layar Spin Helper
│   │       ├── MapScreen.tsx             # Layar Peta Interaktif
│   │       ├── DetailScreen.tsx
│   │       ├── CollectionScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── App.tsx                      # Root component & screen navigator
│   ├── app.json                     # Konfigurasi Expo iOS & Android
│   └── package.json
└── README.md
```

---

## 🧰 Teknologi

| Bagian | Teknologi |
|---|---|
| **Frontend Mobile** | React Native 0.88.1, Expo SDK 58.0.22, TypeScript 6.0 |
| **Styling** | React Native StyleSheet (dioptimalkan untuk mobile iOS & Android) |
| **Ikon** | `@expo/vector-icons` (Ionicons) |
| **Peta** | `react-native-maps` |
| **Penyimpanan Sesi** | `expo-secure-store` |
| **Autentikasi Mobile** | `expo-auth-session`, `expo-apple-authentication`, `expo-web-browser` |
| **Backend API** | Node.js, Express.js 5.1 (ES Modules) |
| **Validasi & Keamanan** | Zod, Helmet, CORS, jsonwebtoken, dotenv |
| **Verifikasi Provider** | `google-auth-library`, `apple-signin-auth` |
| **Testing** | Vitest, Supertest |

---

## 🚀 Panduan Menjalankan Project

### 1. Menjalankan Backend API

Masuk ke folder `backend`:

```powershell
cd backend
npm install
```

Salin file environment:

```powershell
Copy-Item .env.example .env
```

Isi konfigurasi pada `.env` (PORT, JWT_SECRET, GOOGLE_CLIENT_ID, APPLE_CLIENT_ID). Jalankan server pengembangan:

```powershell
npm run dev
```

Server API berjalan di `http://localhost:5000`.

Uji endpoint health check:

```powershell
curl http://localhost:5000/api/health
```

Jalankan pengujian otomatis backend:

```powershell
npm test
```

---

### 2. Menjalankan Frontend Mobile (Expo)

Buka terminal baru dan masuk ke folder `frontend`:

```powershell
cd frontend
npm install
```

Atur variabel environment di file `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

> **Catatan Pengujian Fisik (iPhone / Android)**: Ganti `localhost` pada `EXPO_PUBLIC_API_URL` dengan alamat IP Wi-Fi lokal komputer Anda (contoh: `http://192.168.1.50:5000`).

Jalankan bundler Expo:

```powershell
npx expo start
```

- **Testing di iPhone**: Buka aplikasi **Expo Go** atau Kamera di iPhone, lalu scan QR code pada terminal.
- **Testing di Android**: Scan QR code menggunakan aplikasi **Expo Go** di Android.

---

## 🧪 Validasi Kualitas Kode

Frontend typecheck:

```powershell
cd frontend
npx tsc --noEmit
```

Backend syntax check:

```powershell
cd backend
node --check src/app.js
node --check src/server.js
node --check src/services/providerAuth.js
npm test
```

---

## 🔒 Keamanan

1. Rahasia seperti `JWT_SECRET`, private key Apple, dan client secret tidak disimpan di frontend maupun git repository.
2. Token provider Google dan Apple selalu diverifikasi melalui library resmi di backend sebelum menerbitkan JWT aplikasi.
3. Seluruh sesi login disimpan di enkripsi keychain/keystore native via `expo-secure-store`.
