import { FocusMode, TimerStatus } from "@/types/focus";

export function TimerDisplay({
  mode,
  status,
  formattedMinutes,
  formattedSeconds,
  progressRatio,
  completedFocusCount,
}: {
  mode: FocusMode;
  status: TimerStatus;
  formattedMinutes: string;
  formattedSeconds: string;
  progressRatio: number;
  completedFocusCount: number;
}) {
  const isFocus = mode === "focus";
  const percentage = Math.round(progressRatio * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12 text-center shadow-xs">
      {/* Background status accent aura */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-all ${
          isFocus ? "bg-accent" : "bg-amber-500"
        }`}
      />

      {/* Mode Badge & Session Status */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold ${
            isFocus
              ? "bg-accent-soft text-accent border border-accent/20"
              : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isFocus ? "bg-accent" : "bg-amber-500"
            } ${status === "running" ? "animate-pulse" : ""}`}
          />
          {isFocus ? "🎯 Sesi Fokus Belajar" : "☕ Sesi Istirahat Santai"}
        </span>

        {status === "paused" && (
          <span className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-xs font-medium text-muted">
            Dijeda
          </span>
        )}

        {status === "completed" && (
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Sesi Selesai! 🎉
          </span>
        )}
      </div>

      {/* Main Digital Clock */}
      <div className="mt-8 select-none">
        <div className="font-mono text-7xl font-bold tracking-tight text-foreground sm:text-8xl tabular-nums">
          <span>{formattedMinutes}</span>
          <span className={status === "running" ? "opacity-60" : "opacity-100"}>
            :
          </span>
          <span>{formattedSeconds}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 mx-auto max-w-md">
        <div className="flex items-center justify-between text-xs font-medium text-muted mb-2">
          <span>
            {status === "idle"
              ? "Siap dimulai"
              : status === "completed"
              ? "100% selesai"
              : `${percentage}% selesai`}
          </span>
          {completedFocusCount > 0 && (
            <span>{completedFocusCount} sesi fokus selesai hari ini</span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isFocus ? "bg-accent" : "bg-amber-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

