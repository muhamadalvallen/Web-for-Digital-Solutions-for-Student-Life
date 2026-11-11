"use client";

import Link from "next/link";
import { useCalendarEvents } from "@/hooks/use-calendar-events";
import {
  getTodayDateString,
  formatFullIndonesianDate,
} from "@/lib/date-utils";
import { DashboardAgendaItem } from "@/components/dashboard/agenda-item";
import { DashboardShortcuts } from "@/components/dashboard/shortcuts-grid";

export default function DashboardPage() {
  const { events } = useCalendarEvents();

  const todayDateStr = getTodayDateString();
  const formattedToday = formatFullIndonesianDate(todayDateStr);

  // Filter today's and upcoming events
  const todayEvents = events.filter((e) => e.date === todayDateStr);
  const upcomingEvents = events
    .filter((e) => e.date > todayDateStr)
    .slice(0, 5);

  return (
    <>
      {/* Header section with date and greeting */}
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {formattedToday}
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl mt-0.5">
            Dashboard Akademik
          </h1>
          <p className="mt-1 text-sm text-muted">
            Ringkasan agenda perkuliahan dan aktivitas fokus belajarmu hari ini.
          </p>
        </div>

        {/* Quick action button */}
        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Agenda
          </Link>

          <Link
            href="/focus"
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-medium text-white shadow-xs transition hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Mulai Fokus
          </Link>
        </div>
      </header>

      {/* Stats Counter Overview */}
      <section aria-label="Statistik Cepat" className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <span className="text-xs font-medium text-muted block">
            Hari Ini
          </span>
          <span className="text-2xl font-bold tracking-tight text-accent mt-0.5 block tabular-nums">
            {todayEvents.length}
          </span>
          <span className="text-[11px] text-muted">agenda</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <span className="text-xs font-medium text-muted block">
            Mendatang
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground mt-0.5 block tabular-nums">
            {upcomingEvents.length}
          </span>
          <span className="text-[11px] text-muted">agenda terdekat</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <span className="text-xs font-medium text-muted block">
            Total Agenda
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground mt-0.5 block tabular-nums">
            {events.length}
          </span>
          <span className="text-[11px] text-muted">tersimpan</span>
        </div>
      </section>

      {/* Main Agenda Summary: Today & Upcoming */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Agenda Hari Ini */}
        <article className="rounded-2xl border border-border bg-surface p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <h2 className="text-base font-semibold text-foreground">
                  Agenda Hari Ini
                </h2>
              </div>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                {todayEvents.length}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {todayEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/80 bg-background/40 p-6 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Tidak ada agenda untuk hari ini
                  </p>
                  <p className="mt-1 text-xs text-muted max-w-xs mx-auto">
                    Manfaatkan waktu luang untuk belajar mandiri di Mode Fokus atau persiapkan materi berikutnya.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Link
                      href="/calendar"
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent hover:text-accent transition"
                    >
                      + Tambah Agenda
                    </Link>
                    <Link
                      href="/focus"
                      className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition"
                    >
                      Mulai Fokus
                    </Link>
                  </div>
                </div>
              ) : (
                todayEvents.map((evt) => (
                  <DashboardAgendaItem key={evt.id} event={evt} showDate={false} />
                ))
              )}
            </div>
          </div>

          {todayEvents.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/60 text-right">
              <Link
                href="/calendar"
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Buka di Kalender
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </article>

        {/* Agenda Terdekat (Mendatang) */}
        <article className="rounded-2xl border border-border bg-surface p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <h2 className="text-base font-semibold text-foreground">
                  Agenda Terdekat
                </h2>
              </div>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs font-medium text-muted">
                {upcomingEvents.length}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {upcomingEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/80 bg-background/40 p-6 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Belum ada agenda mendatang
                  </p>
                  <p className="mt-1 text-xs text-muted max-w-xs mx-auto">
                    Jadwal kelas, deadline tugas, dan ujian di masa depan akan tampil di sini secara otomatis.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/calendar"
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent hover:text-accent transition"
                    >
                      Buka Kalender
                    </Link>
                  </div>
                </div>
              ) : (
                upcomingEvents.map((evt) => (
                  <DashboardAgendaItem key={evt.id} event={evt} showDate={true} />
                ))
              )}
            </div>
          </div>

          {upcomingEvents.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/60 text-right">
              <Link
                href="/calendar"
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Lihat Semua di Kalender
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </article>
      </section>

      {/* Main Shortcuts */}
      <DashboardShortcuts />

      {/* Info notice */}
      <footer className="mt-8 border-t border-border/70 pt-4 text-xs text-muted">
        <p className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Data agenda disimpan secara lokal di browser ini dan tidak memerlukan koneksi cloud.
        </p>
      </footer>
    </>
  );
}
