import { PageHeader } from "@/components/layout/page-header";

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="Kalender akademik"
        description="Kelola kelas, tugas, ujian, dan agenda pribadi. Daftar akan diurutkan berdasarkan tanggal dan waktu."
      />
      <section className="rounded-xl border border-dashed border-border bg-surface p-6">
        <h2 className="text-base font-semibold">Belum ada agenda</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Formulir tambah, ubah, hapus, dan filter agenda disiapkan pada langkah
          berikutnya. Data akan tersimpan di browser ini.
        </p>
      </section>
    </>
  );
}
