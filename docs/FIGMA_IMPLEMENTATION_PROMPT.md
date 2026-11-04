# Prompt Implementasi Ejakmakan Berdasarkan Figma

Gunakan brief ini pada coding agent yang memiliki akses ke repository dan file Figma.

## Sumber utama

- Desain UI/UX (dibuat oleh Dwi Anjasmara): https://www.figma.com/design/u8BZWEcEZo6zR69zmNqIKr/Untitled?node-id=0-1
- Repository: https://github.com/rezajauhari555-code/ejakmakanapp
- Branch kerja: `feat/figma-ejakmakan`

## Instruksi utama

Bertindak sebagai senior React Native engineer sekaligus UI implementation engineer. Implementasikan aplikasi Ejakmakan berdasarkan desain Figma secara setia (pixel-conscious), dan kerjakan langsung pada repository yang sudah ada. Jangan membuat repository atau project pengganti.

**Figma adalah sumber kebenaran visual.** Sebelum menulis kode:
1. Buka file Figma dan periksa frame/page yang relevan.
2. Inventarisasi seluruh layar, komponen, varian, alur navigasi, ukuran, spacing, warna, tipografi, radius, border, shadow, ikon, ilustrasi, dan aset.
3. Catat hubungan antar layar dan interaksi setiap tombol, input, tab, filter, kartu, serta navigasi.
4. Jika file Figma tidak dapat diakses, berhenti pada tahap audit dan minta pemilik memberikan akses Viewer atau ekspor/screenshot frame. Jangan menebak isi desain, jangan membuat UI alternatif, dan jangan mengklaim hasil sudah sesuai Figma.

## Audit repository sebelum mengubah kode

Repository saat ini memiliki:
- `frontend/`: React Native 0.88.1, Expo ~58.0.22, React 19.3, TypeScript, dan React Native `StyleSheet`.
- `backend/`: Node.js, Express 5, ES Modules, JWT, Zod, Helmet, CORS, dotenv, serta verifikasi token Google dan Apple.
- Frontend awal berada di `frontend/App.tsx`.
- Endpoint backend yang sudah tersedia: `GET /api/health`, `POST /api/auth/google`, dan `POST /api/auth/apple`.

Pertahankan arsitektur, package manager, versi dependency, konfigurasi Expo, identitas aplikasi, dan endpoint yang sudah ada kecuali perubahan memang diperlukan dan dijelaskan. Jangan mengganti React Native menjadi React web. Jangan menggunakan CSS web untuk komponen native; gunakan `StyleSheet`.

## Implementasi UI

1. Implementasikan setiap layar yang benar-benar ada di Figma.
2. Buat komponen reusable untuk elemen yang berulang, dengan struktur folder yang konsisten.
3. Terapkan token desain dari Figma: warna, typography, spacing, radius, elevation, dan ukuran komponen.
4. Gunakan aset asli yang tersedia di Figma atau repository. Jangan mengganti logo, foto, ilustrasi, atau ikon dengan aset acak.
5. Terapkan safe area, status bar, keyboard handling, scroll behavior, dan layout responsif untuk ukuran layar iOS dan Android.
6. Implementasikan state loading, disabled, validation, error, empty, dan success sesuai kebutuhan interaksi.
7. Pastikan semua tombol dan kontrol mempunyai aksi nyata. Jangan membuat tombol dekoratif yang seolah berfungsi.
8. Gunakan navigasi yang sesuai dengan alur Figma. Tambahkan dependency hanya bila diperlukan dan kompatibel dengan Expo SDK yang digunakan.
9. Jaga aksesibilitas: kontras teks, label aksesibel, ukuran target sentuh, dan urutan fokus yang wajar.

## Integrasi backend dan autentikasi

- Pelajari implementasi backend yang sudah ada sebelum mengubahnya.
- Jangan mengirim placeholder token seperti `native-provider-token`. Integrasikan alur autentikasi Google/Apple yang benar-benar menghasilkan ID token provider, lalu kirim token tersebut ke endpoint backend yang sesuai.
- Jangan pernah menaruh private key, client secret, JWT secret, atau credential server di frontend.
- Simpan sesi secara aman sesuai kemampuan platform dan dependency yang kompatibel; jangan menyimpan token sensitif dalam plaintext storage biasa.
- Tampilkan error jaringan/server secara jelas dan jangan menganggap login berhasil sebelum backend mengonfirmasi.
- Jangan merusak kontrak response endpoint yang sudah ada tanpa memperbarui seluruh pemanggil dan dokumentasi.

## Batasan data dan fitur

- Jangan mengarang restoran, menu, harga, rating, ulasan, lokasi, pengguna, statistik, transaksi, maupun pesanan.
- Gunakan data dari API/database yang benar-benar tersedia.
- Jika desain memerlukan fitur yang backend-nya belum tersedia (misalnya katalog, pencarian, keranjang, checkout, pesanan, profil, atau favorit), buat daftar endpoint dan kebutuhan database yang diperlukan. Jangan menampilkan data palsu sebagai data nyata.
- Jika API belum tersedia, gunakan empty state atau status belum tersedia yang sesuai desain. Mock data hanya boleh dipakai untuk pengembangan lokal, harus diberi label jelas, dipisahkan dari production, dan tidak boleh dianggap data riil.
- Jangan menambah database atau layanan eksternal tanpa menjelaskan rancangan, skema, konfigurasi, dan kebutuhan environment terlebih dahulu.

## Kualitas kode dan pengujian

- Gunakan TypeScript dengan tipe yang jelas; hindari `any` tanpa alasan.
- Pisahkan komponen, screen, hooks, services, types, dan theme bila sesuai.
- Tangani loading, error, retry, dan kondisi offline.
- Periksa import, dependency, konfigurasi Expo, dan kompatibilitas Android/iOS.
- Jalankan setidaknya:
  - Frontend: `npx tsc --noEmit`
  - Backend: `node --check src/app.js`, `node --check src/server.js`, dan pemeriksaan file service terkait.
  - Jalankan aplikasi dengan `npx expo start` dan backend dengan script yang tersedia.
- Jangan mengklaim test, build, atau alur autentikasi berhasil jika belum benar-benar dijalankan.
- Jangan menghapus fitur/berkas lama yang masih digunakan.

## Dokumentasi dan hasil akhir

Perbarui README agar mencakup struktur aktual, instalasi, konfigurasi environment, cara menjalankan frontend/backend, konfigurasi API URL untuk perangkat fisik, endpoint yang tersedia, fitur yang sudah selesai, fitur yang belum tersedia, dan langkah pengujian.

Di akhir pekerjaan, berikan:
1. Daftar layar Figma yang berhasil diimplementasikan.
2. Daftar file yang dibuat/diubah.
3. Penjelasan integrasi frontend-backend.
4. Dependency baru beserta alasannya.
5. Hasil perintah test/build yang benar-benar dijalankan.
6. Fitur yang belum dapat dikerjakan dan alasannya.
7. Langkah menjalankan aplikasi di iOS dan Android.

Kerjakan perubahan pada branch `feat/figma-ejakmakan`. Jangan push langsung ke `main`, jangan merge, dan jangan memasukkan secret ke repository. Buat Pull Request untuk ditinjau setelah implementasi dan pemeriksaan selesai.

## Integrasi WhatsApp Business API

Tambahkan integrasi WhatsApp sebagai fitur pendukung Ejakmakan. Gunakan **WhatsApp Business Platform Cloud API resmi dari Meta** melalui backend Node.js. Jangan menggunakan library tidak resmi, WhatsApp Web automation, scraping, atau metode yang berisiko membuat nomor diblokir.

### Kebutuhan fitur
- Sediakan tombol **Hubungi melalui WhatsApp** pada lokasi yang sesuai dengan desain, misalnya halaman profil/bantuan atau detail restoran jika memang ada pada desain.
- Tombol dapat membuka percakapan WhatsApp dengan nomor bisnis yang sudah dikonfigurasi menggunakan deep link `https://wa.me/<nomor>`. Nomor harus berasal dari konfigurasi resmi bisnis, bukan nomor rekaan.
- Jika kebutuhan bisnis mencakup notifikasi, siapkan layanan backend untuk mengirim pesan transaksional melalui WhatsApp Cloud API, misalnya konfirmasi registrasi, pembaruan status pesanan, atau informasi layanan. Aktifkan hanya untuk alur yang benar-benar didukung aplikasi dan backend.
- Jika diperlukan OTP melalui WhatsApp, perlakukan sebagai fitur terpisah: gunakan template autentikasi yang disetujui Meta dan mekanisme verifikasi yang aman. Jangan menganggap WhatsApp OTP sudah tersedia hanya karena Cloud API terhubung.
- Tampilkan status pengiriman yang akurat: queued/sent/delivered/read/failed hanya jika status tersebut benar-benar diterima dari API atau webhook. Jangan menampilkan pesan sukses sebelum API mengonfirmasi penerimaan.

### Implementasi backend
- Buat service terpisah, misalnya `backend/src/services/whatsappService.js`, untuk mengelola request ke WhatsApp Cloud API.
- Tambahkan endpoint backend sesuai kebutuhan, misalnya endpoint internal untuk memicu notifikasi dan endpoint webhook untuk menerima status pesan.
- Verifikasi webhook Meta menggunakan mekanisme challenge dan signature sesuai dokumentasi resmi.
- Validasi nomor tujuan, isi pesan, template, dan konteks pengiriman di backend.
- Gunakan template message yang telah disetujui Meta ketika diwajibkan oleh aturan WhatsApp, khususnya untuk pesan yang dimulai oleh bisnis di luar customer service window.
- Hormati persetujuan/opt-in pengguna, preferensi notifikasi, permintaan berhenti, serta kebijakan WhatsApp Business. Jangan mengirim pesan promosi massal atau pesan yang tidak diminta.
- Terapkan rate limiting, logging tanpa membocorkan isi sensitif, penanganan retry yang aman, dan idempotency agar webhook atau retry tidak mengirim duplikat.
- Jangan menaruh token akses, App Secret, Verify Token, atau credential Meta di frontend maupun repository.

### Environment variables
Tambahkan contoh variabel berikut ke `.env.example` backend jika diperlukan:
- `WHATSAPP_ACCESS_TOKEN=`
- `WHATSAPP_PHONE_NUMBER_ID=`
- `WHATSAPP_BUSINESS_ACCOUNT_ID=`
- `WHATSAPP_VERIFY_TOKEN=`
- `WHATSAPP_APP_SECRET=`
- `WHATSAPP_API_VERSION=`

Gunakan versi Graph API yang masih didukung dan dokumentasikan cara memperoleh serta mengatur kredensial melalui Meta. Jangan mengisi nilai rahasia dengan data contoh yang tampak seperti credential sungguhan.

### Frontend
- Tambahkan tombol WhatsApp hanya pada layar dan alur yang sesuai dengan desain Figma.
- Untuk tombol chat langsung, gunakan deep link WhatsApp dan tampilkan fallback jika WhatsApp tidak terpasang atau link tidak dapat dibuka.
- Untuk notifikasi otomatis, frontend hanya memanggil backend aplikasi; jangan memanggil Meta Cloud API langsung dari aplikasi mobile.
- Jangan meminta atau menyimpan nomor WhatsApp pengguna jika tidak diperlukan. Jika nomor diperlukan, jelaskan tujuan dan minta persetujuan pengguna.

### Pengujian dan dokumentasi
- Dokumentasikan setup Meta Developer App, WhatsApp Business Account, nomor bisnis, webhook, template message, dan environment variables.
- Uji webhook verification, signature validation, pesan sukses, pesan gagal, retry, idempotency, opt-in, serta fallback deep link.
- Sediakan mode development/mock yang jelas terpisah dari production; jangan mengirim pesan nyata selama pengujian tanpa persetujuan dan nomor uji yang sesuai.
- Catat biaya, batas penggunaan, dan prasyarat akun WhatsApp Business berdasarkan dokumentasi resmi Meta yang berlaku.

