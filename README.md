# Chapter 20 — The Birthday Experience

## 1. Struktur & membuat file (Windows + VS Code)
1. Buat folder `birthday-gift`, buka dengan VS Code (File → Open Folder).
2. Pastikan isinya: `index.html`, `style.css`, `script.js`, `README.md`, dan `assets/images`, `assets/music`, `assets/icons/favicon.svg`.

## 2. Mengganti isi
Semua yang perlu diedit ada di bagian `CONFIG` paling atas `script.js`:
- `name` → nama penerima
- `photos` → caption dan alt text tiap foto
- `gifts` → isi tiga hadiah
- `song` → judul dan nama penyanyi
Teks surat ada di `index.html`, di dalam `<div class="panel">` pada Scene 6.

## 3. Foto
Salin foto ke `assets/images/` dengan nama persis: `hero.jpg`, `photo-01.jpg` … `photo-07.jpg`.
Kecilkan dulu (lebar sekitar 1200 px, di bawah 400 KB per foto). Foto yang belum ada otomatis diganti placeholder.

## 4. Lagu
Taruh file `birthday-song.mp3` di `assets/music/`. Pakai lagu milik sendiri atau yang ada izinnya. Jangan unggah lagu berhak cipta ke repository Public. Tanpa file ini, Scene 5 menampilkan pesan ramah dan tetap bisa dilanjutkan.

## 5. Tes lokal
Di VS Code pasang ekstensi **Live Server**, klik kanan `index.html` → *Open with Live Server*. Untuk tes di HP (satu Wi-Fi), buka `http://IP-LAPTOP:5500` dari Chrome Android.

## 6. Memperbaiki path salah
Foto/lagu tidak muncul? Cek huruf besar-kecil nama file (GitHub Pages membedakannya), ekstensi (`.jpg`, bukan `.jpeg`), dan lokasinya sesuai struktur di atas. Buka DevTools (F12) → tab Network untuk melihat file yang 404.

## 7. Tes semua tombol di Android
Lewati ketujuh scene hanya dengan mengetuk. Cek: amplop terbuka, ketiga hadiah (urutan bebas, Continue baru aktif setelah 3), play/pause lagu lalu pindah scene (lagu tidak mulai ulang), surat 4 panel, Replay, Back to the Beginning, Share, tombol Back dan Escape pada modal.

## 8. GitHub Pages
1. Buat repository **Public** bernama `birthday-gift` (source code dan aset bisa dilihat orang lain).
2. Upload seluruh isi folder termasuk `assets` (Add file → Upload files).
3. Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
4. Tunggu 1–3 menit. URL: `https://USERNAME.github.io/birthday-gift/`.
5. Buka URL itu di Android dengan data seluler, pastikan foto dan musik muncul.

## 9. QR code
Tempel URL publik ke generator QR gratis (mis. qr-code-generator.com), unduh PNG, lalu pindai dari HP lain untuk menguji.

## 10. Memperbarui
Ganti file di repository (Add file → Upload files, timpa nama yang sama) → Commit. Tunggu deployment, lalu refresh (atau buka tab incognito bila masih versi lama).

## Tambahan: landing page 3 · 2 · 1
- Browser Android memblokir suara otomatis, jadi halaman pembuka meminta satu ketukan ("Mulai"). Ketukan itu yang mengaktifkan hitung mundur, fanfare, dan musik latar.
- Musik latar bawaan dibuat langsung oleh browser (tanpa file, bebas hak cipta). Mau pakai file sendiri? Taruh di `assets/music/` lalu isi `bgmFile` di `CONFIG` pada `script.js`.
- Tombol 🔊 di pojok kanan atas mematikan atau menyalakan musik latar. Saat lagu di Scene 5 diputar, musik latar berhenti otomatis.
- Foto di landing page memakai `assets/images/hero.jpg`.

## Alur versi terbaru
- Landing 3-2-1 → amplop → kue 20 lilin (ketuk sampai padam) → lagu + kalender 17 Oktober 2026 → galeri 7 foto + kuis → hadiah → surat → finale kue dan buket.
- Siapkan 7 foto: `photo-01.jpg` sampai `photo-07.jpg` (plus `hero.jpg` untuk landing page dan finale).
- Pertanyaan kuis dan jawaban lucu saat menekan "Tidak" ada di `CONFIG.photos[].q` dan `CONFIG.wrong`. Tanggal ulang tahun ada di `CONFIG.birthday`.
- Lagu di Scene 3 harus diputar dulu sebelum lanjut, lalu terus berjalan di semua scene sampai selesai. Tombol 🔊 di pojok kanan atas untuk jeda/putar.
