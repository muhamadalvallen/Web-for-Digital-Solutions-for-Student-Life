import { CalendarFilterType, EVENT_TYPE_LABELS } from "@/types/calendar";

export function EventEmptyState({
  filter,
  onResetFilter,
  onAddEvent,
}: {
  filter: CalendarFilterType;
  onResetFilter: () => void;
  onAddEvent: () => void;
}) {
  const isFiltered = filter !== "all";

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">
        {isFiltered
          ? `Tidak ada agenda kategori "${EVENT_TYPE_LABELS[filter]}"`
          : "Belum ada agenda akademik"}
      </h3>

      <p className="mt-1.5 max-w-md text-sm leading-6 text-muted">
        {isFiltered
          ? "Kamu belum memiliki agenda untuk kategori ini. Coba pilih kategori lain atau tambahkan agenda baru."
          : "Catat jadwal kuliah, batas pengumpulan tugas, jadwal ujian, atau agenda pribadimu di sini agar aktivitas belajarmu lebih teratur."}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onAddEvent}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
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
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Tambah Agenda
        </button>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilter}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Tampilkan Semua Kategori
          </button>
        )}
      </div>
    </div>
  );
}
