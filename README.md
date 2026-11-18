# 🍽️ Ejakmakan

**Ejakmakan** adalah aplikasi mobile penjelajah kuliner cerdas yang membantu pengguna menemukan sentra kuliner, mengeksplorasi berbagai pilihan makanan, dan memperoleh rekomendasi tempat makan sesuai preferensi serta anggaran.

Aplikasi ini dikembangkan menggunakan **React Native, Expo SDK 58, dan TypeScript** untuk frontend, serta **Node.js dan Express.js 5** untuk backend REST API.

\<p align="center">   \<a href="[https://www.figma.com/design/QfoxA3XmtHH776m97ERqD9/Untitled?node-id=0-1&t=veKPYPreFjZqLaem-0](https://www.figma.com/design/QfoxA3XmtHH776m97ERqD9/Untitled?node-id=0-1\&t=veKPYPreFjZqLaem-0)">     🎨 View UI/UX Design – Figma   \</a> \</p>

\<p align="center">   \<a href="[https://github.com/rezajauhari555-code/ejakmakanapp](https://github.com/rezajauhari555-code/ejakmakanapp)">GitHub Repository\</a> \</p>

---

## 🎨 UI/UX Design

Seluruh rancangan antarmuka dan pengalaman pengguna Ejakmakan dapat dilihat melalui tautan Figma berikut:

- **Design Tool:** Figma
- **Platform:** Android dan iOS
- **Design Reference:** [Ejakmakan – Figma Design](https://www.figma.com/design/QfoxA3XmtHH776m97ERqD9/Untitled?node-id=0-1\&t=veKPYPreFjZqLaem-0)

---

## ✨ Fitur Utama

### 1. Onboarding & Pengenalan Aplikasi

- Panduan interaktif sebanyak 3 langkah.
- Pengenalan fitur dan fungsi utama aplikasi.
- Tampilan modern dengan transisi antarlayar yang halus.

### 2. Autentikasi & Manajemen Sesi

- **Google Sign-In** dengan verifikasi token melalui `google-auth-library`.
- **Apple Sign-In** dengan verifikasi identitas melalui `apple-signin-auth`.
- Autentikasi menggunakan email.
- Mode eksplorasi tamu (Guest Mode).
- Penyimpanan sesi secara aman menggunakan `expo-secure-store`.
- Pengelolaan autentikasi melalui backend REST API.

### 3. Personalisasi Preferensi Rasa

- Pemilihan kategori makanan favorit:
  - Nusantara
  - Kopi & Kafe
  - Jepang & Asia
  - Western
  - Street Food
  - Dessert
- Penyesuaian suasana kuliner:
  - Makan Cepat
  - Nongkrong Santai
  - Family Time
  - Date Night
  - Kulineran Malam

### 4. Beranda & Eksplorasi

- Navigasi berdasarkan lokasi aktif (Jakarta, Indonesia).
- Pencarian berdasarkan nama sentra kuliner, kategori, atau menu.
- Filter kategori kuliner.
- Banner pintasan menuju fitur Roda Rekomendasi.

### 5. 🎯 Roda Rekomendasi Interaktif (Spinwheel)

- Roda putar animasi untuk membantu pengguna menentukan pilihan makanan.
- Delapan segmen rekomendasi dengan inspirasi hidangan spesifik.
- Animasi rotasi interaktif.
- Modal hasil putaran dengan pintasan pencarian sentra kuliner melalui peta.

### 6. ⚙️ Spin Helper

- Pengaturan dan kustomisasi roda rekomendasi.
- Preset pilihan:
  - Makan Siang Hemat
  - Nongkrong & Kafe
  - Spesial & Dinner
  - Semua Selera
- Filter anggaran:
  - Hemat: di bawah Rp25.000
  - Sedang: Rp25.000–Rp60.000
  - Puas: di atas Rp60.000
- Filter suasana dan preferensi kuliner ramah halal.
- Pengaturan aktivasi segmen roda.

### 7. 🗺️ Peta Kuliner Interaktif

- Integrasi `react-native-maps`.
- Menampilkan lokasi sentra kuliner di Jakarta:
  - Jalan Sabang
  - Blok M Little Tokyo
  - Senopati & Suryo
  - Pasar Santa
  - Benhil
  - Kelapa Gading
  - Pantai Maju PIK
- Filter kategori langsung melalui peta.
- Kartu informasi lokasi (Bottom Sheet).
- Navigasi rute berdasarkan platform:
  - **Android:** Google Maps.
  - **iOS:** Apple Maps.

### 8. 🔖 Koleksi Tempat Favorit

- Menyimpan sentra kuliner favorit.
- Mengakses kembali tempat yang ingin dikunjungi.
- Empty State informatif ketika belum ada tempat tersimpan.

### 9. 🔍 Detail Sentra Kuliner

- Foto dan deskripsi kawasan kuliner.
- Informasi jam operasional.
- Rating dan estimasi jarak.
- Rekomendasi hidangan populer.
- Integrasi WhatsApp Click to Chat untuk menghubungi pengelola tempat kuliner.
- Pintasan navigasi menggunakan aplikasi peta sesuai platform perangkat.

### 10. 👤 Profil & Pengaturan Aplikasi

- Ringkasan preferensi kuliner.
- Informasi jumlah tempat favorit.
- Pengaturan notifikasi.
- Pengaturan akses GPS.
- Pembersihan cache.
- Logout dan manajemen sesi.

---

## 🏗️ Struktur Project

Project menggunakan arsitektur modular yang memisahkan frontend mobile dan backend REST API.

```text
ejakmakanapp/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── providerAuth.js
│   │   ├── app.js
│   │   └── server.js
│   ├── test/
│   │   └── app.test.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── theme/
│   │   │   ├── colors.ts
│   │   │   └── spacing.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── culinaryData.ts
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── home/
│   │   │   ├── spinwheel/
│   │   │   └── navigation/
│   │   └── screens/
│   │       ├── OnboardingScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       ├── RegisterScreen.tsx
│   │       ├── PreferencesScreen.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── RecommendationsScreen.tsx
│   │       ├── SpinHelperScreen.tsx
│   │       ├── MapScreen.tsx
│   │       ├── DetailScreen.tsx
│   │       ├── CollectionScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── App.tsx
│   ├── app.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🧰 Teknologi yang Digunakan

| Bagian                            | Teknologi                        |
| --------------------------------- | -------------------------------- |
| Mobile Framework                  | React Native 0.88.1              |
| Development Platform              | Expo SDK 58.0.22                 |
| Programming Language              | TypeScript 6.0                   |
| Styling                           | React Native StyleSheet          |
| Icon Library                      | @expo/vector-icons (Ionicons)    |
| Maps Integration                  | react-native-maps                |
| Secure Storage                    | expo-secure-store                |
| Authentication                    | expo-auth-session                |
| Apple Authentication              | expo-apple-authentication        |
| Browser Integration               | expo-web-browser                 |
| WhatsApp Integration              | WhatsApp Click to Chat (`wa.me`) |
| Backend Runtime                   | Node.js                          |
| Backend Framework                 | Express.js 5.1                   |
| Validation                        | Zod                              |
| Security                          | Helmet, CORS                     |
| Token Authentication              | JSON Web Token                   |
| Environment Configuration         | dotenv                           |
| Google Authentication             | google-auth-library              |
| Apple Authentication Verification | apple-signin-auth                |
| Testing                           | Vitest, Supertest                |

---

## 🚀 Panduan Instalasi dan Menjalankan Project

### Persyaratan Sistem

Pastikan perangkat pengembangan telah memiliki:

- Node.js versi LTS.
- npm.
- Git.
- Android Studio dan Android SDK untuk pengembangan Android.
- Xcode dan iOS Simulator untuk pengembangan iOS (macOS).
- Expo Go untuk pengujian pada perangkat yang kompatibel.

### 1. Clone Repository

```bash
git clone https://github.com/rezajauhari555-code/ejakmakanapp.git

cd ejakmakanapp
```

### 2. Menjalankan Backend API

Masuk ke direktori backend:

```bash
cd backend
npm install
```

Salin konfigurasi environment:

```powershell
Copy-Item .env.example .env
```

Atur konfigurasi pada file `.env`:

```env
PORT=5000
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
APPLE_CLIENT_ID=your-apple-service-id-or-bundle-id
```

Jalankan backend:

```bash
npm run dev
```

Backend API berjalan pada:

```text
http://localhost:5000
```

Untuk memeriksa status backend:

```bash
curl http://localhost:5000/api/health
```

Menjalankan pengujian backend:

```bash
npm test
```

### 3. Menjalankan Frontend Mobile

Buka terminal baru dan masuk ke direktori frontend:

```bash
cd frontend
npm install
```

Atur alamat backend melalui environment variable:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000

EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

**Konfigurasi alamat API berdasarkan perangkat:**

| Perangkat        | Alamat Backend            |
| ---------------- | ------------------------- |
| Android Emulator | `http://10.0.2.2:5000`    |
| Android Fisik    | `http://IP-KOMPUTER:5000` |
| iOS Simulator    | `http://localhost:5000`   |
| iPhone Fisik     | `http://IP-KOMPUTER:5000` |

Untuk perangkat fisik, gunakan alamat IP lokal komputer yang terhubung ke jaringan Wi-Fi yang sama.

Contoh:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.50:5000
```

Jalankan Expo:

```bash
npx expo start
```

### 4. Konfigurasi Autentikasi Google dan Apple

**Google Sign-In**

- Siapkan OAuth Client ID melalui Google Cloud Console.
- Konfigurasikan Client ID untuk Android, iOS, dan Web sesuai kebutuhan.
- Sesuaikan konfigurasi aplikasi dengan package name Android dan bundle identifier iOS.
- Pastikan backend memverifikasi token Google sebelum menerbitkan JWT aplikasi.

**Apple Sign-In**

- Siapkan konfigurasi Sign in with Apple melalui Apple Developer.
- Aktifkan capability Sign in with Apple pada App ID yang digunakan.
- Konfigurasikan Bundle ID dan Service ID sesuai alur autentikasi yang diterapkan.
- Gunakan `expo-apple-authentication` untuk autentikasi native pada iOS.
- Gunakan alur OAuth berbasis web untuk Apple Sign-In pada Android jika fitur tersebut diaktifkan di aplikasi.
- Verifikasi identity token Apple melalui backend menggunakan `apple-signin-auth` sebelum menerbitkan JWT aplikasi.

**Catatan:** Apple Sign-In native menggunakan perangkat iOS yang kompatibel. Implementasi pada Android memerlukan alur web OAuth tersendiri. Credential rahasia Apple dan konfigurasi provider harus disimpan di backend, bukan di aplikasi frontend.

### 5. Integrasi WhatsApp

Ejakmakan menggunakan **WhatsApp Click to Chat** untuk memudahkan pengguna menghubungi pengelola atau pemilik tempat kuliner melalui halaman detail sentra kuliner.

**Fitur integrasi:**

- Menghubungkan pengguna dengan kontak WhatsApp tempat kuliner.
- Membuka percakapan melalui aplikasi WhatsApp atau WhatsApp Web.
- Menyediakan pesan otomatis sebagai pembuka percakapan.
- Mempermudah pengguna bertanya mengenai informasi tempat makan.

**Format URL WhatsApp:**

```text
https://wa.me/6281234567890
```

Nomor telepon harus menggunakan format internasional tanpa tanda `+`, spasi, atau angka `0` di awal nomor lokal.

**Contoh implementasi React Native:**

```typescript
import { Linking } from "react-native";

const openWhatsApp = (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  Linking.openURL(whatsappUrl);
};
```

**Contoh dengan pesan otomatis:**

```typescript
import { Linking } from "react-native";

const openWhatsApp = (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/\D/g, "");

  const message = encodeURIComponent(
    "Halo, saya ingin bertanya mengenai tempat kuliner Anda."
  );

  const whatsappUrl =
    `https://wa.me/${formattedNumber}?text=${message}`;

  Linking.openURL(whatsappUrl);
};
```

**Catatan:** Integrasi ini menggunakan WhatsApp Click to Chat, bukan WhatsApp Business Platform API. Pengguna tetap memerlukan akses ke WhatsApp untuk melanjutkan percakapan. Integrasi ini tidak memerlukan access token WhatsApp Business API.

### 6. Pengujian Aplikasi Android

**Menggunakan Android Emulator:**

1. Buka Android Studio.
2. Jalankan Android Virtual Device (AVD).
3. Pastikan backend sudah aktif.
4. Jalankan Expo dari direktori frontend.
5. Buka aplikasi melalui emulator.

**Menggunakan Perangkat Android Fisik:**

1. Install Expo Go melalui Google Play Store.
2. Pastikan komputer dan smartphone terhubung ke jaringan Wi-Fi yang sama.
3. Jalankan `npx expo start --lan`.
4. Scan QR Code menggunakan Expo Go.
5. Tunggu proses bundling sampai aplikasi terbuka.

### 7. Pengujian Aplikasi iOS

**Menggunakan iOS Simulator:**

1. Siapkan perangkat macOS dengan Xcode.
2. Jalankan iOS Simulator.
3. Pastikan backend sudah aktif.
4. Jalankan Expo dari direktori frontend.
5. Buka aplikasi melalui simulator.

**Menggunakan Perangkat iPhone:**

1. Siapkan perangkat iPhone dan lingkungan pengembangan yang kompatibel.
2. Pastikan komputer dan iPhone terhubung ke jaringan yang sama.
3. Jalankan Expo.
4. Buka aplikasi melalui Expo Go atau build development yang sesuai.
5. Uji autentikasi Apple dan navigasi Apple Maps pada perangkat yang mendukungnya.

---

## 🧪 Validasi Kualitas Kode

### Frontend TypeScript Check

```bash
cd frontend
npx tsc --noEmit
```

### Backend Syntax Check

```bash
cd backend

node --check src/app.js
node --check src/server.js
node --check src/services/providerAuth.js
```

### Backend Automated Testing

```bash
npm test
```

---

## 🔒 Keamanan Aplikasi

1. Informasi rahasia seperti `JWT_SECRET`, Google credentials, dan Apple credentials tidak disimpan dalam repository publik.
2. Verifikasi token Google dilakukan melalui backend menggunakan `google-auth-library`.
3. Verifikasi identity token Apple dilakukan melalui backend menggunakan `apple-signin-auth`.
4. Token aplikasi dikelola menggunakan JSON Web Token (JWT).
5. Penyimpanan sesi pada perangkat menggunakan `expo-secure-store`.
6. File `.env` harus dimasukkan ke `.gitignore`.
7. Gunakan HTTPS untuk komunikasi API pada lingkungan production.
8. Nomor WhatsApp tempat kuliner hanya ditampilkan atau digunakan sesuai data kontak yang tersedia.

---

## 📱 Platform Pengembangan

| Komponen              | Android                              | iOS                         |
| --------------------- | ------------------------------------ | --------------------------- |
| Aplikasi Mobile       | React Native                         | React Native                |
| Development Framework | Expo                                 | Expo                        |
| Google Sign-In        | Didukung                             | Didukung                    |
| Apple Sign-In         | Melalui web OAuth jika dikonfigurasi | Native Apple Authentication |
| Map Navigation        | Google Maps                          | Apple Maps                  |
| WhatsApp Integration  | WhatsApp Click to Chat               | WhatsApp Click to Chat      |
| Backend               | Node.js + Express.js                 | Node.js + Express.js        |
| UI/UX Design          | Figma                                | Figma                       |
| API Communication     | REST API                             | REST API                    |

Ejakmakan dikembangkan sebagai aplikasi mobile lintas platform menggunakan React Native dan Expo. Beberapa integrasi disesuaikan dengan sistem operasi perangkat, terutama autentikasi Apple dan layanan navigasi peta.

---

## 🔗 Repository & Referensi

- **GitHub Repository:** [Ejakmakan App](https://github.com/rezajauhari555-code/ejakmakanapp)
- **Figma Design:** [Ejakmakan – Figma Design](https://www.figma.com/design/QfoxA3XmtHH776m97ERqD9/Untitled?node-id=0-1\&t=veKPYPreFjZqLaem-0)

---

\<p align="center">
&#x20; \<b>🍽️ Ejakmakan – Explore Your Taste, Discover Your Place.\</b>
\</p>
