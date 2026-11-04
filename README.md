# Ejakmakan

Aplikasi mobile untuk menemukan makanan favorit dengan React Native + Expo dan REST API Node.js + Express.

Repository: https://github.com/rezajauhari555-code/ejakmakanapp

## Status

Fondasi project sudah tersedia:

- Layar login mobile dengan tombol Google dan Apple.
- Backend Express dengan endpoint health check.
- Verifikasi token Google dan Apple di backend.
- JWT aplikasi setelah token provider berhasil diverifikasi.
- Konfigurasi aplikasi iOS dan Android.

Fitur produk, keranjang, pesanan, database, dan akun email belum diimplementasikan.

## Teknologi

- React Native 0.88 dan Expo SDK 58.
- TypeScript untuk aplikasi mobile.
- Node.js dan Express 5 untuk backend.
- `google-auth-library` untuk verifikasi token Google.
- `apple-signin-auth` untuk verifikasi token Apple.
- JSON Web Token untuk sesi aplikasi.
- `zod`, Helmet, CORS, dan dotenv.

## Struktur Project

```text
ejakmakanapp/
├── backend/
│   ├── src/
│   │   ├── services/providerAuth.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── App.tsx
│   ├── app.json
│   └── package.json
├── .gitignore
└── README.md
```

## Persyaratan

- Node.js versi LTS.
- npm.
- Git.
- Expo Go pada iPhone untuk testing melalui jaringan lokal.
- Xcode hanya diperlukan untuk iOS Simulator atau build native lokal, dan Xcode hanya tersedia di macOS.

## Menjalankan Backend

Masuk ke folder backend dan pasang dependency:

```powershell
cd backend
npm install
```

Salin konfigurasi contoh:

```powershell
Copy-Item .env.example .env
```

Isi `.env` dengan credential OAuth Anda. Jangan commit file `.env`.

```env
PORT=5000
JWT_SECRET=ganti-dengan-secret-acak-yang-panjang
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
APPLE_CLIENT_ID=com.rezajauhari.ejakmakan
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nreplace-me\n-----END PRIVATE KEY-----"
```

Jalankan server:

```powershell
npm run dev
```

API berjalan pada `http://localhost:5000`.

## Endpoint Auth

### Health check

```http
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "service": "ejakmakan-api"
}
```

### Login Google

```http
POST /api/auth/google
Content-Type: application/json
```

```json
{
  "token": "GOOGLE_ID_TOKEN_DARI_MOBILE"
}
```

### Login Apple

```http
POST /api/auth/apple
Content-Type: application/json
```

```json
{
  "token": "APPLE_ID_TOKEN_DARI_MOBILE"
}
```

Backend memverifikasi token provider, kemudian mengembalikan JWT aplikasi dan data user. Jangan mengirim access token palsu atau credential rahasia dari aplikasi mobile.

## Menjalankan Frontend

Masuk ke folder frontend dan pasang dependency:

```powershell
cd frontend
npm install
```

Atur URL API melalui environment Expo. Untuk Android Emulator gunakan `10.0.2.2`; untuk iPhone fisik gunakan alamat IP komputer di jaringan lokal.

```powershell
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.10:5000"
npx expo start
```

Ganti `192.168.1.10` dengan alamat IP komputer Anda. `localhost` pada iPhone menunjuk ke iPhone, bukan ke komputer.

### Testing di iPhone dari Windows

1. Install Expo Go dari App Store.
2. Pastikan iPhone dan komputer tersambung ke Wi-Fi yang sama.
3. Jalankan `npx expo start --lan` dari folder `frontend`.
4. Scan QR code dari Expo Go atau kamera iPhone.

Windows tidak dapat menjalankan iOS Simulator. Untuk iOS Simulator gunakan macOS + Xcode. Untuk build iOS dari Windows, gunakan EAS Build setelah menyiapkan akun Expo dan Apple Developer.

## Identitas Aplikasi

Konfigurasi di `frontend/app.json`:

- Nama: `Ejakmakan`.
- Slug: `ejakmakan`.
- iOS Bundle ID: `com.rezajauhari.ejakmakan`.
- Android package: `com.rezajauhari.ejakmakan`.
- Versi: `1.0.0`.

## Styling Mobile

Frontend menggunakan `StyleSheet` bawaan React Native, bukan CSS web. Pendekatan ini dipilih karena ringan dan sesuai dengan komponen native. NativeWind dapat ditambahkan kemudian jika project membutuhkan workflow utility class seperti Tailwind CSS.

## Validasi

Typecheck frontend:

```powershell
cd frontend
npx tsc --noEmit
```

Syntax check backend:

```powershell
cd backend
node --check src/app.js
node --check src/services/providerAuth.js
node --check src/server.js
```

## Keamanan

- Jangan commit `.env`, private key Apple, client secret, atau JWT secret.
- Validasi token Google dan Apple selalu dilakukan di backend.
- Gunakan HTTPS untuk environment production.
- Ganti `JWT_SECRET` dengan nilai acak yang panjang.
- Credential Google Cloud, Apple Developer, dan Expo harus dibuat oleh pemilik akun masing-masing.

## Git

```powershell
git status
git add .
git commit -m "Describe Ejakmakan project setup"
git push origin main
```

## Lisensi

Lisensi project belum ditentukan.
