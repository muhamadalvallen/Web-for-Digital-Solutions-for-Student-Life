# Digital Solutions for Student Life
## Product & Implementation Plan (Revisi)

**Status:** Working specification untuk MVP  
**Tujuan:** Membangun aplikasi web produktivitas akademik yang bisa dipakai dan didemonstrasikan, dengan ruang pengembangan lanjutan setelah versi pertama stabil.

---

## 1. Visi Produk

Digital Solutions for Student Life adalah aplikasi pendamping produktivitas akademik untuk membantu mahasiswa:

1. memahami materi dan menentukan strategi belajar;
2. memecah tujuan akademik menjadi langkah yang lebih kecil;
3. mengatur sesi belajar dan waktu istirahat;
4. mengelola jadwal kelas, tugas, dan ujian.

Produk harus terasa ramah, suportif, sederhana, dan tidak menghakimi. Aplikasi membantu pengguna mengambil keputusan; aplikasi tidak menjanjikan hasil akademik atau menggantikan penilaian pengguna.

### Prinsip pengembangan

- **Working software first:** fungsi utama harus berjalan sebelum animasi atau detail dekoratif.
- **Local-first:** data MVP disimpan di browser agar tidak perlu membangun sistem akun dan database lebih dulu.
- **AI is one module, not a dependency:** fitur non-AI tetap harus berfungsi ketika layanan AI sedang tidak tersedia.
- **Incremental delivery:** bangun satu alur fitur sampai selesai, uji, lalu lanjut ke fitur berikutnya.
- **Keep the stack small:** jangan menambahkan library, layanan, atau abstraksi sebelum ada kebutuhan nyata.

## 2. Batasan dan Asumsi MVP

MVP pertama ditujukan sebagai prototipe/demonstrasi aplikasi untuk satu pengguna pada satu browser.

### Termasuk dalam MVP

- Dashboard ringkasan aktivitas.
- Study Buddy dengan satu penyedia AI.
- Dream Tracker dengan target dan milestone.
- Focus Mode dengan timer Pomodoro/Deep Work.
- Kalender akademik manual.
- Penyimpanan data lokal menggunakan `localStorage`.
- Tampilan responsif untuk desktop dan ponsel.
- Deployment ke Vercel.

### Tidak termasuk dalam MVP

- Registrasi, login, dan manajemen banyak akun.
- Sinkronisasi data antarperangkat atau antar pengguna.
- Integrasi otomatis dengan Google Calendar atau sistem akademik kampus.
- Penjadwalan otomatis berbasis optimasi jadwal.
- Deteksi kelelahan secara otomatis atau klaim pemantauan kesehatan.
- Karakter 3D/animasi kompleks, virtual study room, dan audio streaming.
- Upload dan analisis dokumen kuliah.
- Notifikasi push dan aplikasi mobile native.

Fitur di luar cakupan ini tidak boleh ditambahkan sebelum seluruh kriteria MVP terpenuhi.

## 3. Prioritas Fitur

### P0 — Wajib untuk rilis MVP

| Modul | Fitur | Kriteria minimum |
|---|---|---|
| Dashboard | Ringkasan target, agenda terdekat, dan pintasan | Data berasal dari data pengguna, bukan angka dummy permanen |
| Study Buddy | Chat AI, pilihan gaya belajar, indikator loading, penanganan error | Pesan terkirim ke API server dan respons tampil di chat |
| Dream Tracker | Tambah, ubah, hapus tujuan; tambah dan tandai milestone selesai | Progres dihitung dari milestone yang selesai |
| Focus Mode | Preset 25/5 dan 50/10, mulai, jeda, lanjutkan, reset | Timer berjalan akurat dan status tombol konsisten |
| Kalender | Tambah, ubah, hapus kelas/tugas/ujian; daftar agenda terurut | Agenda tersimpan dan tetap ada setelah halaman dimuat ulang |
| Data lokal | Penyimpanan dan pemuatan data dari `localStorage` | Refresh browser tidak menghapus data |
| Navigasi | Navigasi antarmodul | Semua halaman utama dapat dibuka melalui navigasi |

### P1 — Dikerjakan setelah P0 stabil

- Rekomendasi teknik belajar dari Study Buddy berdasarkan jenis mata kuliah.
- Tombol “Tanya Strategi” dari item tugas/kalender.
- Menghubungkan tugas tertentu dengan sesi Focus Mode.
- Pengingat visual untuk agenda yang mendekat.
- Perayaan sederhana ketika milestone selesai.
- Ekspor data lokal ke file JSON dan impor kembali.

### P2 — Pengembangan lanjutan

- Penjadwalan ulang otomatis oleh AI.
- Sinkronisasi kalender eksternal.
- Akun pengguna dan database cloud.
- Riwayat chat lintas sesi/perangkat.
- Audio latar, karakter pendamping, dan animasi lanjutan.
- Notifikasi browser/push dan analitik penggunaan.

---

## 4. Struktur Halaman dan User Flow

### Struktur navigasi

| Route | Halaman | Isi utama |
|---|---|---|
| `/` | Dashboard | Sapaan, ringkasan target, agenda terdekat, pintasan |
| `/study-buddy` | Study Buddy | Pilihan mode, chat, konteks mata kuliah |
| `/dream-tracker` | Dream Tracker | Daftar tujuan, detail tujuan, milestone, progres |
| `/focus` | Focus Mode | Timer, pilihan durasi, sesi fokus |
| `/calendar` | Kalender | Daftar agenda, filter tipe, formulir tambah/edit |

Gunakan satu layout aplikasi yang konsisten: sidebar pada desktop, navigasi ringkas pada ponsel, header halaman, dan area konten utama.

### Alur pengguna utama

1. Pengguna membuka Dashboard dan melihat target serta agenda terdekat.
2. Pengguna membuat tujuan di Dream Tracker dan menambahkan milestone.
3. Pengguna menambahkan kelas, tugas, atau ujian di Kalender.
4. Pengguna memilih tugas lalu memulai sesi fokus.
5. Ketika membutuhkan bantuan belajar, pengguna membuka Study Buddy dan memilih “Bimbing aku” atau “Jelaskan langsung”.
6. Dashboard memperbarui ringkasan berdasarkan data yang tersimpan.

---

## 5. Tech Stack dan Keputusan Teknis

| Bagian | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js App Router | Gunakan TypeScript |
| Styling | Tailwind CSS | Ikuti konfigurasi bawaan `create-next-app` |
| Komponen UI | shadcn/ui | Tambahkan hanya komponen yang benar-benar dipakai |
| Ikon | lucide-react | Hindari memasang beberapa library ikon |
| AI | Google Gemini API | Satu provider untuk MVP; jangan integrasikan Gemini dan Groq sekaligus |
| SDK AI | `@google/genai` | Ikuti API dan dokumentasi resmi yang terbaru saat implementasi |
| State | React state/hooks | Tidak perlu Zustand/Redux untuk skala MVP ini |
| Penyimpanan | `localStorage` | Melalui satu modul/hook penyimpanan terpusat |
| Version control | Git + GitHub | Commit per milestone; Gunakan main sebagai branch utama yang stabil, feature branch untuk pengembangan fitur, dan Pull Request sebelum merge. Untuk kerja solo, workflow dapat disederhanakan dengan persetujuan Project Owner. |
| Deployment | Vercel | Hubungkan repository GitHub |

### Aturan pemilihan teknologi

- Jangan menambahkan Supabase, Firebase, Prisma, atau database lain untuk MVP kecuali login/sinkronisasi cloud benar-benar diwajibkan.
- Jangan memasang calendar library yang kompleks. Mulai dari daftar agenda berdasarkan tanggal; tampilan kalender bulanan dapat ditambahkan setelah fungsi CRUD stabil.
- Hindari animasi/library visual yang tidak mendukung fungsi inti.
- Gunakan komponen shadcn/ui seperlunya; jangan menghasilkan puluhan komponen yang belum dipakai.

---

## 6. Arsitektur Aplikasi

### Gambaran alur

```text
Browser
  ├── Next.js pages and UI components
  ├── Local application state
  └── localStorage

Study Buddy UI
  └── POST /api/study-buddy
        └── Gemini API (server-side only)
```

### Pembagian tanggung jawab

- **UI components:** menampilkan data dan menerima input pengguna.
- **Feature logic:** mengelola aturan fitur, misalnya perhitungan progres atau timer.
- **Storage layer:** membaca/menulis data lokal; komponen tidak mengakses `localStorage` secara tersebar.
- **API route:** menerima pesan Study Buddy, memvalidasi input, memanggil Gemini, dan mengembalikan respons.

### Struktur folder yang disarankan

Struktur boleh mengikuti hasil `create-next-app`, tetapi usahakan pemisahan berikut:

```text
src/
  app/
    page.tsx
    study-buddy/page.tsx
    dream-tracker/page.tsx
    focus/page.tsx
    calendar/page.tsx
    api/study-buddy/route.ts
  components/
    layout/
    dashboard/
    study-buddy/
    dream-tracker/
    focus/
    calendar/
    ui/
  hooks/
  lib/
    storage.ts
    validation.ts
    utils.ts
  types/
    index.ts
```

Jika proyek tidak menggunakan folder `src/`, letakkan folder-folder tersebut di root. Jangan memindahkan struktur proyek yang sudah dibuat tanpa alasan.

---

## 7. Model Data MVP

Gunakan ID unik untuk setiap item dan timestamp ISO untuk tanggal pembuatan/perubahan.

### Goal

```ts
type Goal = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  targetDate?: string;
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
};

type Milestone = {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: string;
};
```

### CalendarEvent

```ts
type CalendarEvent = {
  id: string;
  title: string;
  type: "class" | "assignment" | "exam" | "personal";
  date: string;       // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;   // HH:mm
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

### FocusSession

```ts
type FocusSession = {
  id: string;
  durationMinutes: number;
  startedAt: string;
  completedAt?: string;
  relatedEventId?: string;
};
```

### ChatMessage

```ts
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
```

Simpan data berdasarkan key yang jelas, misalnya `dsl:goals`, `dsl:calendar-events`, `dsl:focus-sessions`, dan `dsl:chat-messages`. Tambahkan `storageVersion` agar perubahan struktur data di masa depan dapat ditangani dengan aman.

### Aturan localStorage

- Akses `localStorage` hanya di sisi browser, bukan ketika komponen dirender di server.
- Sediakan nilai awal dan empty state yang jelas.
- Tangani data JSON yang rusak tanpa membuat seluruh aplikasi gagal dibuka.
- Jangan menyimpan API key, password, atau data rahasia di `localStorage`.
- Jelaskan di UI bahwa data MVP tersimpan di browser/perangkat tersebut.
- Jangan menjanjikan sinkronisasi antarperangkat.

---

## 8. Spesifikasi Setiap Modul

### A. Study Buddy

**Tujuan:** menjadi pendamping belajar yang membantu pengguna memahami materi dengan cara yang sesuai kebutuhannya.

**Fitur P0:**

- Input pesan dan tombol kirim.
- Pilihan pendekatan: `Bimbing aku` dan `Jelaskan langsung`.
- Konteks opsional: nama mata kuliah/topik.
- Tampilan pesan pengguna dan AI yang berbeda.
- Loading state, empty state, error state, dan tombol coba lagi.
- Batasi panjang input dan jumlah konteks percakapan yang dikirim ke model.

**Aturan perilaku AI:**

- Gunakan Bahasa Indonesia yang jelas, santai, dan suportif secara default.
- Pada mode `Bimbing aku`, mulai dengan pertanyaan/petunjuk bertahap; jangan langsung membocorkan seluruh jawaban kecuali pengguna memintanya.
- Pada mode `Jelaskan langsung`, berikan penjelasan langsung dengan contoh sederhana.
- Sesuaikan penjelasan dengan konteks mata kuliah yang diberikan pengguna.
- Jangan mengarang sumber, fakta, atau kepastian. Nyatakan bila informasi tidak cukup.
- Hindari jawaban terlalu panjang untuk pertanyaan sederhana.

**Implementasi API:**

- Buat satu route server: `POST /api/study-buddy`.
- API key hanya dibaca di server dari environment variable `GEMINI_API_KEY`.
- Jangan gunakan prefix `NEXT_PUBLIC_` untuk API key.
- Gunakan SDK JavaScript resmi `@google/genai` dan dokumentasi Gemini API yang berlaku saat implementasi. Dokumentasi Google saat ini mengarahkan proyek baru ke Interactions API; jangan menyalin contoh legacy tanpa memeriksa statusnya.
- Validasi body request, mode, dan panjang pesan.
- Tangani kuota habis, timeout, respons provider gagal, dan input tidak valid.
- Jangan mengembalikan stack trace atau secret ke browser.
- Batasi panjang riwayat yang dikirim agar penggunaan token terkendali.

**Keamanan sebelum deployment publik:**

Endpoint AI publik dapat dipanggil orang lain meskipun UI aplikasi tidak menampilkan tombol chat. Sebelum mengaktifkan AI pada deployment publik, siapkan pembatasan penggunaan/rate limit yang sesuai. Jangan mengandalkan rate limit in-memory sederhana pada serverless sebagai proteksi yang andal. Jika pembatasan belum tersedia, nonaktifkan endpoint AI pada deployment publik atau batasi akses demonstrasi.

### B. Dream Tracker

**Fitur P0:**

- Membuat tujuan dengan judul, deskripsi opsional, dan tanggal target opsional.
- Mengubah dan menghapus tujuan.
- Menambahkan, mengubah, dan menghapus milestone.
- Menandai milestone selesai/belum selesai.
- Menampilkan progres berdasarkan milestone selesai dibagi total milestone.
- Menampilkan empty state ketika belum ada tujuan.

**Aturan:**

- Jika tujuan tidak memiliki milestone, tampilkan status “Belum ada milestone”, bukan progres 100%.
- Konfirmasi sebelum menghapus tujuan.
- Animasi kemenangan cukup sederhana dan tidak boleh menghambat interaksi.

**P1:** saran pemecahan tujuan menjadi milestone menggunakan AI. Untuk MVP, pengguna tetap membuat/mengedit milestone secara manual.

### C. Focus Mode

**Fitur P0:**

- Preset Pomodoro 25 menit fokus / 5 menit istirahat.
- Preset Deep Work 50 menit fokus / 10 menit istirahat.
- Tombol mulai, jeda, lanjutkan, reset, dan pindah sesi.
- Indikator apakah sesi sedang fokus atau istirahat.
- Catat sesi yang selesai.

**Aturan teknis:**

- Perhitungan timer menggunakan timestamp/deadline, bukan hanya mengurangi angka setiap detik, agar tidak mudah meleset ketika tab browser tidak aktif.
- Reset harus meminta konfirmasi jika sesi sedang berjalan.
- Jangan mengklaim dapat mendeteksi kelelahan. Tampilkan pengingat istirahat sederhana berdasarkan sesi/durasi.

**P1:** pilih durasi kustom dan hubungkan sesi dengan tugas kalender.

### D. Kalender Akademik

**Fitur P0:**

- Menambah, mengubah, dan menghapus agenda.
- Tipe agenda: kelas, tugas, ujian, dan personal.
- Tanggal wajib; waktu mulai/selesai dan catatan bersifat opsional.
- Tampilkan agenda mendatang dalam urutan tanggal/waktu.
- Filter berdasarkan tipe agenda.
- Tampilkan empty state dan agenda hari ini.

**Batasan:**

- Pengguna mengisi agenda secara manual.
- Tidak ada sinkronisasi eksternal atau auto-scheduling pada MVP.
- Validasi waktu selesai tidak boleh lebih awal daripada waktu mulai jika keduanya diisi.

**P1:** tombol “Tanya Strategi” untuk mengirim judul dan konteks tugas ke Study Buddy.

### E. Dashboard

**Fitur P0:**

- Menampilkan jumlah tujuan aktif dan ringkasan progres.
- Menampilkan beberapa agenda terdekat.
- Menampilkan pintasan ke Study Buddy dan Focus Mode.
- Menampilkan empty state yang mengarahkan pengguna membuat tujuan atau agenda pertama.
- Semua angka dan daftar diambil dari data tersimpan; jangan gunakan data contoh permanen seolah-olah data nyata.

---

## 9. UI/UX Guidelines

- Tampilan bersih, modern, tenang, dan suportif; hindari dashboard yang terlalu padat.
- Gunakan satu sistem warna, tipografi, radius, spacing, dan gaya tombol secara konsisten.
- Prioritaskan keterbacaan dan hierarki informasi daripada dekorasi.
- Desktop: sidebar tetap dan konten utama.
- Mobile: navigasi ringkas; tidak boleh ada horizontal overflow.
- Semua form memiliki label, validasi, dan pesan error yang jelas.
- Semua halaman memiliki loading, empty, dan error state sesuai kebutuhan.
- Tombol harus memiliki label yang jelas; jangan memakai ikon saja untuk aksi yang tidak umum.
- Perhatikan focus state keyboard dan kontras teks.
- Jangan menggunakan animasi yang mengganggu atau membuat aplikasi terasa lambat.

### Arah visual awal

- Gaya: modern academic productivity.
- Nuansa: hangat, fokus, ringan, dan profesional.
- Gunakan warna netral sebagai dasar dan satu warna aksen utama.
- Hindari penggunaan terlalu banyak gradient, glassmorphism, atau card bersarang.

Detail warna dan font boleh ditetapkan Cursor pada tahap desain awal, tetapi harus diterapkan konsisten setelah disetujui.

---

## 10. Urutan Implementasi Berbasis Milestone

Tidak ada target hari yang kaku. Lanjut ke milestone berikutnya segera setelah kriteria selesai terpenuhi. Jangan membuka banyak fitur setengah jadi sekaligus.

### Milestone 0 — Setup dan validasi risiko teknis

1. Pastikan Node.js sesuai persyaratan versi Next.js yang digunakan.
2. Buat proyek Next.js dengan TypeScript, App Router, Tailwind CSS, dan ESLint.
3. Jalankan aplikasi secara lokal.
4. Inisialisasi Git dan buat repository GitHub.
5. Uji satu request Gemini sederhana melalui route server sebelum membangun seluruh UI.

**Selesai jika:** aplikasi berjalan lokal, perubahan sudah di-commit, dan integrasi AI terbukti bisa merespons atau kegagalannya sudah diketahui dengan jelas.

Jika API AI belum bisa dipakai, lanjutkan modul non-AI. Jangan biarkan kendala API menghentikan seluruh pengembangan.

### Milestone 1 — App shell dan navigasi

1. Buat layout global, sidebar/header, dan navigasi responsif.
2. Buat route untuk Dashboard, Study Buddy, Dream Tracker, Focus Mode, dan Kalender.
3. Buat kerangka tampilan setiap halaman dengan komponen konsisten.

**Selesai jika:** semua halaman dapat dibuka, navigasi berfungsi, dan layout tidak rusak di layar ponsel.

### Milestone 2 — Data dan fitur non-AI

Urutan pengerjaan:

1. Buat tipe data dan storage layer.
2. Implementasikan Dream Tracker CRUD dan milestone.
3. Implementasikan Kalender CRUD dan filter.
4. Implementasikan Focus Timer.
5. Hubungkan ringkasan data pada Dashboard.

**Selesai jika:** tambah/ubah/hapus berjalan, data bertahan setelah refresh, dan tidak ada data dummy yang menyamar sebagai data pengguna.

### Milestone 3 — Study Buddy

1. Buat UI chat dan dua mode respons.
2. Buat route server untuk provider AI.
3. Tambahkan validasi input, loading, error, dan retry.
4. Tambahkan batas konteks agar penggunaan token terkendali.
5. Uji dengan pertanyaan sederhana, permintaan penjelasan, dan mode bimbingan.

**Selesai jika:** pengguna dapat mengirim pesan dan menerima respons; kegagalan API ditampilkan dengan jelas tanpa merusak halaman.

### Milestone 4 — Integrasi antarfitur dan penyempurnaan

1. Pastikan Dashboard membaca data aktual.
2. Tambahkan pintasan kalender ke Focus Mode.
3. Tambahkan “Tanya Strategi” jika Study Buddy sudah stabil.
4. Rapikan empty state, validasi, dan responsivitas.

**Selesai jika:** alur utama pengguna dapat dilakukan tanpa kebingungan dan seluruh aksi penting bekerja.

### Milestone 5 — Pengujian dan deployment

1. Jalankan lint dan production build.
2. Uji semua CRUD, timer, chat, dan penyimpanan setelah refresh.
3. Uji tampilan desktop dan mobile.
4. Periksa Console dan Network untuk error.
5. Pastikan `.env.local` tidak masuk Git.
6. Konfigurasikan environment variables di Vercel.
7. Pastikan pembatasan endpoint AI siap sebelum mengaktifkan AI secara publik.
8. Deploy dan uji URL production.

**Selesai jika:** deployment berhasil, halaman utama dapat dibuka, fitur P0 lolos pengujian, dan tidak ada secret yang terekspos.

---

## 11. Acceptance Criteria dan Checklist Pengujian

### Pengujian fungsional

- [ ] Semua route utama dapat dibuka.
- [ ] Navigasi desktop dan mobile berfungsi.
- [ ] Goal dapat dibuat, diedit, dihapus, dan progresnya berubah.
- [ ] Milestone dapat ditambah dan ditandai selesai.
- [ ] Agenda dapat dibuat, diedit, dihapus, dan difilter.
- [ ] Agenda terurut sesuai tanggal dan waktu.
- [ ] Timer dapat mulai, jeda, lanjut, reset, dan menyelesaikan sesi.
- [ ] Timer tidak melompat secara keliru ketika tab tidak aktif.
- [ ] Data tetap ada setelah browser di-refresh.
- [ ] Study Buddy menampilkan loading dan error dengan benar.
- [ ] API key tidak muncul di source code browser, Git, atau log.
- [ ] Dashboard menampilkan data pengguna yang sebenarnya.

### Pengujian kualitas

- [ ] Tidak ada error TypeScript/ESLint yang belum dijelaskan.
- [ ] `npm run build` berhasil.
- [ ] Tidak ada horizontal overflow pada layar ponsel.
- [ ] Form dapat digunakan dengan keyboard.
- [ ] Semua tombol memiliki aksi yang nyata.
- [ ] Tidak ada link atau tombol placeholder yang terlihat aktif tetapi tidak bekerja.
- [ ] Empty state tersedia untuk data yang belum dibuat.

---

## 12. Workflow Vibecoding dengan Cursor

### Aturan kerja

1. Baca `PLAN.md` dan `AGENTS.md` sebelum memulai pekerjaan.
2. Kerjakan satu milestone atau satu fitur kecil per prompt.
3. Untuk perubahan multi-file, minta Cursor membuat rencana singkat terlebih dahulu, lalu setujui sebelum implementasi.
4. Minta Agent memeriksa file yang relevan saja; jangan meminta seluruh aplikasi ditulis ulang.
5. Setelah perubahan, minta Agent menjelaskan file yang diubah, cara menguji, dan hal yang belum selesai.
6. Periksa diff sebelum menerima perubahan.
7. Jalankan aplikasi dan uji fitur di browser; jangan menganggap kode benar hanya karena Agent menyatakan selesai.
8. Gunakan Ask untuk bertanya atau memahami kode tanpa meminta perubahan.
9. Gunakan checkpoint/commit sebelum perubahan besar agar mudah kembali ke versi stabil.
10. Jangan menginstal dependency baru tanpa alasan dan penjelasan manfaatnya.

### Format prompt kerja harian

```text
Baca PLAN.md dan AGENTS.md terlebih dahulu.
Kerjakan hanya milestone/fitur berikut: [NAMA FITUR].

Kriteria selesai:
1. [KRITERIA 1]
2. [KRITERIA 2]
3. [KRITERIA 3]

Batasan:
- Jangan mengubah fitur lain yang sudah berjalan.
- Gunakan pola dan komponen yang sudah ada.
- Jangan menambah dependency tanpa alasan.
- Tangani loading, empty, dan error state jika relevan.

Setelah selesai:
- Jalankan pemeriksaan yang relevan.
- Laporkan file yang diubah.
- Laporkan hasil pengujian dan masalah yang masih tersisa.
- Jangan mengklaim pengujian berhasil jika belum benar-benar dijalankan.
```

### Git workflow

`main` adalah branch utama dan stabil. Setiap fitur dikembangkan di feature branch, lalu diajukan melalui Pull Request. Pull Request ditinjau sebelum di-merge ke `main`. Hindari commit langsung ke `main` untuk pengembangan fitur.

Buat commit di feature branch setiap milestone yang stabil.

Contoh pesan commit:

```text
chore: initialize Next.js project
feat: add application layout and navigation
feat: implement dream tracker
feat: implement academic calendar
feat: add focus timer
feat: integrate study buddy API
fix: handle local storage hydration
```

Untuk kerja solo, workflow ini boleh disederhanakan atas persetujuan Project Owner. Jangan membuat branching yang lebih kompleks daripada feature branch dan Pull Request.

---

## 13. Deployment dan Keamanan

### Environment variables

File `.env.local` hanya berada di komputer lokal dan harus masuk `.gitignore`.

Contoh nama variabel:

```env
GEMINI_API_KEY=isi_api_key_lokal
GEMINI_MODEL=nama_model_yang_dipilih
```

Nama model harus ditetapkan setelah memeriksa daftar model dan akses yang tersedia pada akun/proyek AI yang digunakan. Jangan menebak nama model.

Saat deployment, masukkan variabel yang sama melalui pengaturan Environment Variables di Vercel. Jangan pernah memasukkan nilai API key ke `NEXT_PUBLIC_*`.

### Deployment checklist

- [ ] Repository GitHub sudah terhubung ke Vercel.
- [ ] Environment variables sudah diatur untuk environment yang sesuai.
- [ ] Production build berhasil.
- [ ] API key tidak ada dalam repository.
- [ ] Endpoint AI memiliki pembatasan penggunaan atau dinonaktifkan untuk deployment publik.
- [ ] Semua halaman diuji dari URL production.
- [ ] Data lokal dijelaskan sebagai data per-browser/perangkat.

---

## 14. Keputusan yang Tidak Boleh Diubah Tanpa Alasan

Untuk mencegah scope melebar dan penggunaan kuota Cursor berlebihan, pertahankan keputusan berikut selama MVP:

1. Tetap menggunakan Next.js App Router + TypeScript + Tailwind.
2. Tetap menggunakan satu provider AI.
3. Tetap menggunakan localStorage; belum ada login dan database cloud.
4. Calendar bersifat manual; belum ada integrasi eksternal atau auto-scheduling.
5. Timer menggunakan preset sederhana; belum ada simulasi kehadiran virtual.
6. Prioritaskan fungsi dan stabilitas sebelum animasi/dekorasi.
7. Jangan melakukan rewrite proyek secara keseluruhan untuk memperbaiki satu fitur.

Perubahan terhadap keputusan ini harus disertai alasan, dampak terhadap waktu/kompleksitas, dan persetujuan pemilik proyek.

---

## 15. Referensi Teknis Resmi

Gunakan dokumentasi resmi berikut dan periksa kembali saat implementasi karena versi dan API dapat berubah:

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Installation: https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui untuk Next.js: https://ui.shadcn.com/docs/installation/next
- Cursor Agent: https://cursor.com/help/ai-features/agent
- Cursor Rules dan `AGENTS.md`: https://cursor.com/docs/rules
- Gemini API: https://ai.google.dev/gemini-api/docs
- Gemini API key dan keamanan: https://ai.google.dev/gemini-api/docs/api-key
- Gemini API libraries: https://ai.google.dev/gemini-api/docs/libraries
- Vercel + Next.js: https://vercel.com/docs/frameworks/full-stack/nextjs
- Vercel Git deployments: https://vercel.com/docs/git

---

**Definisi keberhasilan MVP:** seorang mahasiswa dapat membuka dashboard, mengelola tujuan dan agenda, menjalankan sesi fokus, serta meminta bantuan Study Buddy ketika API tersedia. Data dasar bertahan setelah refresh pada browser yang sama, tampilan nyaman di desktop maupun ponsel, dan aplikasi dapat diakses melalui deployment. Fitur lanjutan hanya dikerjakan setelah definisi ini terpenuhi.
