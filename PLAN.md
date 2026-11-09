# Digital Solutions for Student Life
## Product & Implementation Plan

**Status:** Scope MVP disepakati  
**Fokus:** Aplikasi pendamping produktivitas akademik yang sederhana, fungsional, dan realistis diselesaikan oleh tim dengan waktu serta biaya terbatas.

---

## 1. Visi Produk

Digital Solutions for Student Life adalah aplikasi web yang membantu mahasiswa mengatur aktivitas akademik dan menjaga fokus belajar dalam satu tempat.

Prinsip utama produk:

- **Simple first:** utamakan fitur yang benar-benar dibutuhkan dan dapat digunakan.
- **Working software first:** fungsi harus berjalan sebelum animasi atau dekorasi tambahan.
- **Local-first:** data MVP disimpan di browser; belum membutuhkan akun atau database cloud.
- **No AI dependency:** seluruh fitur MVP harus berjalan tanpa layanan AI atau API berbayar.
- **Incremental delivery:** selesaikan dan uji satu fitur sebelum beralih ke fitur berikutnya.
- **Keep the stack small:** jangan menambahkan library atau layanan tanpa kebutuhan yang jelas.

## 2. Batasan MVP

MVP adalah versi pertama yang dapat digunakan dan didemonstrasikan. Scope sengaja dibatasi agar tim dapat menyelesaikannya dengan sumber daya yang tersedia.

### Termasuk dalam MVP

1. **Dashboard**
   - Ringkasan agenda hari ini dan agenda terdekat.
   - Pintasan ke Academic Calendar dan Focus Mode.
   - Tampilan empty state ketika pengguna belum memiliki agenda.

2. **Academic Calendar**
   - Menambah, mengubah, dan menghapus agenda.
   - Jenis agenda: kelas, tugas, ujian, dan personal.
   - Menampilkan agenda berdasarkan tanggal.
   - Mengurutkan agenda berdasarkan tanggal dan waktu.
   - Filter berdasarkan jenis agenda.

3. **Focus Mode**
   - Timer Pomodoro: 25 menit fokus dan 5 menit istirahat.
   - Timer Deep Work: 50 menit fokus dan 10 menit istirahat.
   - Mulai, jeda, lanjutkan, reset, serta perpindahan sesi.
   - Penanda yang jelas untuk sesi fokus dan istirahat.

4. **Penyimpanan lokal**
   - Data agenda disimpan menggunakan `localStorage`.
   - Data tetap tersedia setelah halaman dimuat ulang pada browser yang sama.

5. **Tampilan responsif**
   - Layout dapat digunakan pada desktop dan ponsel.
   - Navigasi dan kontrol utama tetap mudah digunakan pada layar kecil.

### Tidak termasuk dalam MVP

- Study Buddy atau fitur chat AI.
- Integrasi Gemini, Groq, atau provider AI lainnya.
- Dream Tracker, target, dan milestone.
- Login, registrasi, dan manajemen akun.
- Database cloud atau sinkronisasi antarperangkat.
- Integrasi Google Calendar atau sistem akademik kampus.
- Penjadwalan otomatis.
- Notifikasi push.
- Riwayat dan analitik sesi fokus yang kompleks.
- Karakter 3D, virtual study room, audio streaming, dan animasi kompleks.

Fitur-fitur tersebut dapat dipertimbangkan setelah MVP selesai dan dievaluasi. Jangan membuat halaman placeholder untuk fitur yang belum termasuk MVP.

## 3. Prioritas Fitur

| Prioritas | Modul | Kriteria selesai |
|---|---|---|
| P0 | Dashboard | Ringkasan agenda berasal dari data yang tersimpan dan pintasan bekerja |
| P0 | Academic Calendar | Agenda dapat ditambah, diedit, dihapus, difilter, dan tetap ada setelah refresh |
| P0 | Focus Mode | Kedua preset timer berjalan serta kontrol mulai, jeda, lanjut, dan reset berfungsi |
| P0 | Navigasi | Semua halaman MVP dapat dibuka melalui navigasi |
| P0 | Responsivitas | Halaman utama nyaman digunakan pada desktop dan ponsel |
| P0 | Kualitas dasar | Tidak ada error build yang belum ditangani atau tombol utama yang tidak berfungsi |

## 4. Struktur Halaman dan User Flow

### Route MVP

| Route | Halaman | Isi |
|---|---|---|
| `/` | Dashboard | Agenda hari ini, agenda terdekat, dan pintasan |
| `/calendar` | Academic Calendar | Daftar agenda, filter, serta formulir tambah/edit |
| `/focus` | Focus Mode | Timer Pomodoro dan Deep Work |

Gunakan layout aplikasi yang konsisten. Navigasi desktop dapat menggunakan sidebar, sedangkan ponsel menggunakan navigasi yang lebih ringkas.

### Alur pengguna utama

1. Pengguna membuka Dashboard untuk melihat agenda hari ini dan agenda terdekat.
2. Pengguna membuka Academic Calendar untuk menambahkan atau mengelola jadwal, tugas, dan ujian.
3. Pengguna membuka Focus Mode untuk menjalankan sesi belajar.
4. Pengguna kembali ke Dashboard untuk melihat ringkasan agenda yang sudah diperbarui.

## 5. Teknologi dan Keputusan Teknis

| Bagian | Pilihan |
|---|---|
| Framework | Next.js App Router |
| Bahasa | TypeScript |
| UI | React |
| Styling | Tailwind CSS 4 |
| State | React state/hooks |
| Penyimpanan agenda | `localStorage` |
| Version control | Git dan GitHub |
| Deployment | Vercel |

### Batasan teknis

- Ikuti versi dependency yang sudah terpasang di repository.
- Untuk Next.js, baca dokumentasi lokal yang relevan di `node_modules/next/dist/docs/` sebelum mengubah implementasi.
- Gunakan React hooks dan komponen yang sudah tersedia sebelum menambahkan abstraksi baru.
- Jangan menambahkan AI SDK, API route AI, atau environment variable AI.
- Jangan menambahkan database, sistem autentikasi, atau library kalender kompleks untuk MVP.
- Tambahkan dependency baru hanya jika ada kebutuhan yang jelas dan manfaatnya sepadan dengan biaya pemeliharaan.
- Jangan melakukan rewrite struktur proyek tanpa alasan yang kuat.

## 6. Data dan Penyimpanan

Data utama MVP adalah agenda akademik.

Contoh tipe data:

```ts
type CalendarEvent = {
  id: string;
  title: string;
  type: "class" | "assignment" | "exam" | "personal";
  date: string;        // YYYY-MM-DD
  startTime?: string;  // HH:mm
  endTime?: string;    // HH:mm
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

Gunakan key penyimpanan yang jelas, misalnya `dsl:calendar-events`.

Aturan penyimpanan:

- Akses `localStorage` hanya di sisi browser.
- Tangani data JSON yang rusak agar tidak membuat seluruh aplikasi gagal dibuka.
- Berikan empty state ketika belum ada agenda.
- Jangan menyimpan password, API key, atau informasi rahasia di `localStorage`.
- Jelaskan bahwa data MVP tersimpan di browser/perangkat yang digunakan.
- Jangan menjanjikan sinkronisasi antarperangkat.

Timer Focus Mode tidak memerlukan database atau backend. Gunakan perhitungan berbasis timestamp/deadline agar timer tidak mudah meleset ketika tab browser tidak aktif.

## 7. Panduan UI/UX

- Gunakan tampilan modern, sederhana, tenang, dan mudah dipahami.
- Pertahankan konsistensi warna, tipografi, spacing, radius, dan gaya tombol.
- Utamakan keterbacaan dan hierarki informasi daripada dekorasi.
- Hindari dashboard yang terlalu padat.
- Form harus memiliki label, validasi, dan pesan kesalahan yang jelas.
- Sediakan empty state yang membantu pengguna memahami tindakan berikutnya.
- Semua tombol harus memiliki aksi nyata.
- Perhatikan focus state keyboard dan kontras teks.
- Hindari animasi yang mengganggu atau memperlambat aplikasi.
- Pastikan tidak ada horizontal overflow pada layar ponsel.

## 8. Urutan Implementasi

Kerjakan secara berurutan. Jangan membuka banyak fitur setengah jadi sekaligus.

### Milestone 0 — Persiapan proyek

- Pastikan proyek dapat dijalankan secara lokal.
- Periksa struktur folder dan dependency yang sudah tersedia.
- Pastikan Git dan repository GitHub siap digunakan.

**Selesai jika:** aplikasi dapat dijalankan dan struktur proyek dipahami oleh anggota tim.

### Milestone 1 — App shell dan navigasi

- Buat layout utama.
- Buat navigasi desktop dan ponsel.
- Siapkan route Dashboard, Academic Calendar, dan Focus Mode.

**Selesai jika:** seluruh route MVP dapat dibuka dan navigasi berfungsi.

### Milestone 2 — Academic Calendar

- Buat tipe data agenda dan penyimpanan lokal.
- Implementasikan tambah, edit, hapus, dan filter agenda.
- Tampilkan agenda secara terurut.
- Tambahkan validasi dan empty state.

**Selesai jika:** seluruh operasi agenda berfungsi dan data tetap tersedia setelah refresh.

### Milestone 3 — Focus Mode

- Implementasikan preset Pomodoro dan Deep Work.
- Implementasikan mulai, jeda, lanjut, reset, dan perpindahan sesi.
- Pastikan timer menggunakan timestamp/deadline agar tidak mudah meleset saat tab tidak aktif.

**Selesai jika:** kedua preset dan seluruh kontrol timer berjalan dengan benar.

### Milestone 4 — Dashboard dan integrasi

- Tampilkan agenda hari ini dan agenda terdekat dari data kalender.
- Tambahkan pintasan ke Calendar dan Focus Mode.
- Pastikan Dashboard berubah ketika data agenda diperbarui.

**Selesai jika:** alur utama pengguna dapat dilakukan dari Dashboard tanpa kebingungan.

### Milestone 5 — Pengujian dan deployment

- Jalankan lint dan production build.
- Uji CRUD agenda dan seluruh kontrol timer.
- Uji penyimpanan setelah refresh.
- Uji tampilan desktop dan ponsel.
- Periksa Console dan Network untuk error.
- Pastikan tidak ada secret atau file lokal yang ikut masuk Git.
- Deploy ke Vercel dan uji URL production.

**Selesai jika:** fitur P0 berfungsi, build berhasil, dan aplikasi dapat digunakan melalui URL deployment.

## 9. Checklist Penerimaan MVP

- [ ] Dashboard dapat dibuka.
- [ ] Dashboard menampilkan agenda dari data pengguna.
- [ ] Agenda dapat ditambah, diedit, dan dihapus.
- [ ] Agenda dapat difilter berdasarkan jenisnya.
- [ ] Agenda ditampilkan dalam urutan tanggal/waktu yang benar.
- [ ] Data agenda tetap ada setelah browser di-refresh.
- [ ] Timer Pomodoro berfungsi.
- [ ] Timer Deep Work berfungsi.
- [ ] Mulai, jeda, lanjut, dan reset bekerja sesuai status timer.
- [ ] Timer tidak melompat secara keliru ketika tab tidak aktif.
- [ ] Navigasi desktop dan ponsel berfungsi.
- [ ] Tidak ada horizontal overflow pada layar ponsel.
- [ ] Semua tombol utama memiliki aksi nyata.
- [ ] Tidak ada error TypeScript/ESLint atau build yang belum ditangani.
- [ ] Deployment dapat dibuka dan diuji.

## 10. Kolaborasi dan Git Workflow

Proyek menggunakan prinsip kepemilikan dan kontribusi yang setara. Pembagian tugas bertujuan untuk koordinasi, bukan membentuk hierarki.

- Semua anggota dapat mengusulkan ide, mengembangkan fitur, dan meninjau perubahan.
- Keputusan implementasi rutin dapat dibuat mandiri selama sesuai scope dan pola proyek.
- Perubahan arsitektur besar, dependency bersama, atau perubahan lintas-modul dibahas bersama.
- Jangan menimpa atau membatalkan perubahan anggota lain tanpa koordinasi.
- Periksa `git status` dan diff sebelum commit.
- Gunakan branch pekerjaan, misalnya `feat/calendar-crud` atau `fix/focus-timer`.
- Ajukan Pull Request dengan `main` sebagai base branch.
- Pastikan PR hanya berisi perubahan yang berkaitan dengan pekerjaan tersebut.
- Review digunakan untuk menjaga kualitas dan berbagi pemahaman, bukan sebagai persetujuan dari satu orang tertentu.

## 11. Pengembangan Setelah MVP

Fitur berikut **bukan bagian MVP** dan hanya dipertimbangkan setelah MVP selesai, diuji, serta dievaluasi bersama.

| Fitur | Status |
|---|---|
| Dream Tracker: tujuan dan milestone | Ditunda |
| Study Buddy berbasis AI | Ditunda; memerlukan evaluasi waktu, biaya API, dan keamanan |
| Sinkronisasi kalender eksternal | Ditunda |
| Login dan database cloud | Ditunda |
| Notifikasi dan analitik lanjutan | Ditunda |

Jangan mulai mengerjakan fitur-fitur ini hanya karena implementasinya menarik. Prioritaskan penyelesaian dan kualitas MVP.

## 12. Aturan Pemeliharaan Dokumen

Dokumen ini adalah acuan scope dan keputusan tingkat proyek, bukan catatan setiap perubahan kode.

**PLAN.md cukup diperbarui ketika ada perubahan penting**, misalnya:

- Scope MVP berubah.
- Fitur wajib ditambah atau dihapus.
- Stack atau arsitektur utama berubah.
- Kriteria penerimaan berubah.
- Tim menyepakati keputusan produk baru yang berdampak luas.

Tidak perlu memperbarui dokumen untuk setiap bug fix, perubahan styling kecil, nama variabel, atau tugas harian. Catat perubahan rutin melalui commit dan Pull Request.

`AGENTS.md` berisi aturan kerja AI dan kolaborasi. `PLAN.md` berisi arah produk, scope, dan kriteria keberhasilan. Keduanya tidak perlu disalin berulang-ulang.

---

## Definisi Keberhasilan MVP

Seorang mahasiswa dapat melihat agenda akademik melalui Dashboard, mengelola kelas/tugas/ujian di Academic Calendar, dan menjalankan sesi belajar melalui Focus Mode. Data agenda tetap tersedia setelah refresh pada browser yang sama. Aplikasi nyaman digunakan pada desktop dan ponsel, seluruh fungsi utama berjalan, dan aplikasi dapat diakses melalui deployment.
