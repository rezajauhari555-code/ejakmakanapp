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
