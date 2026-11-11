import { CalendarFilterType, EVENT_TYPE_LABELS } from "@/types/calendar";

const FILTER_OPTIONS: { id: CalendarFilterType; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "class", label: EVENT_TYPE_LABELS.class },
  { id: "assignment", label: EVENT_TYPE_LABELS.assignment },
  { id: "exam", label: EVENT_TYPE_LABELS.exam },
  { id: "personal", label: EVENT_TYPE_LABELS.personal },
];

export function EventFilter({
  selectedFilter,
  counts,
  onSelectFilter,
}: {
  selectedFilter: CalendarFilterType;
  counts: Record<CalendarFilterType, number>;
  onSelectFilter: (filter: CalendarFilterType) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter kategori agenda"
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface p-1.5"
    >
      {FILTER_OPTIONS.map((opt) => {
        const isSelected = selectedFilter === opt.id;
        const count = counts[opt.id] ?? 0;

        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectFilter(opt.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              isSelected
                ? "bg-accent text-white shadow-xs"
                : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <span>{opt.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] font-semibold tabular-nums ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-black/5 dark:bg-white/10 text-muted"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
