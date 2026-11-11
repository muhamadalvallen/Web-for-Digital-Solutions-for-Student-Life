import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

const shortcuts = [
  {
    href: "/calendar",
    title: "Kelola agenda",
    description: "Tambahkan kelas, tugas, ujian, atau agenda pribadi.",
  },
  {
    href: "/focus",
    title: "Mulai sesi fokus",
    description: "Jalankan timer Pomodoro atau Deep Work.",
  },
] as const;

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Lihat agenda hari ini dan agenda terdekat, lalu lanjut ke kalender atau sesi belajar."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-base font-semibold">Agenda hari ini</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Belum ada agenda untuk hari ini. Tambahkan jadwal di Kalender agar
            ringkasan ini terisi dari data yang tersimpan.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-base font-semibold">Agenda terdekat</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Agenda yang akan datang muncul di sini setelah kamu menyimpannya.
          </p>
        </article>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-semibold">Pintasan</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="block font-medium text-accent">
                {shortcut.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted">
                {shortcut.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-6 text-xs leading-5 text-muted">
        Data agenda disimpan di browser ini dan tidak tersinkron ke perangkat
        lain.
      </p>
    </>
  );
}
