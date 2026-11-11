import { PageHeader } from "@/components/layout/page-header";

const presets = [
  { name: "Pomodoro", detail: "25 menit fokus, 5 menit istirahat" },
  { name: "Deep Work", detail: "50 menit fokus, 10 menit istirahat" },
] as const;

export default function FocusPage() {
  return (
    <>
      <PageHeader
        title="Mode fokus"
        description="Pilih preset, lalu mulai, jeda, lanjutkan, atau reset sesi belajar."
      />
      <section className="grid gap-4 sm:grid-cols-2">
        {presets.map((preset) => (
          <article
            key={preset.name}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <h2 className="text-base font-semibold">{preset.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{preset.detail}</p>
          </article>
        ))}
      </section>
      <p className="mt-4 text-sm leading-6 text-muted">
        Kontrol timer belum aktif. Preset ini akan bisa dijalankan pada langkah
        berikutnya, dengan hitungan berdasarkan waktu selesai agar tidak
        meleset saat tab tidak aktif.
      </p>
    </>
  );
}
