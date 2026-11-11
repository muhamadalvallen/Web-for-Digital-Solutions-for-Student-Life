import { FocusMode, TimerStatus } from "@/types/focus";

export function TimerControls({
  mode,
  status,
  onStart,
  onPause,
  onResume,
  onReset,
  onSwitchMode,
}: {
  mode: FocusMode;
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSwitchMode: () => void;
}) {
  const isFocus = mode === "focus";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {status === "idle" && (
        <>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {isFocus ? "Mulai Sesi Fokus" : "Mulai Istirahat"}
          </button>

          <button
            type="button"
            onClick={onSwitchMode}
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            {isFocus ? "Beralih ke Istirahat" : "Beralih ke Fokus"}
          </button>
        </>
      )}

      {status === "running" && (
        <>
          <button
            type="button"
            onClick={onPause}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            Jeda
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-red-300 hover:text-red-600 focus-visible:outline-2"
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>

          <button
            type="button"
            onClick={onSwitchMode}
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Lewati Sesi
          </button>
        </>
      )}

      {status === "paused" && (
        <>
          <button
            type="button"
            onClick={onResume}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Lanjutkan
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-red-300 hover:text-red-600 focus-visible:outline-2"
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>

          <button
            type="button"
            onClick={onSwitchMode}
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Lewati Sesi
          </button>
        </>
      )}

      {status === "completed" && (
        <>
          <button
            type="button"
            onClick={onSwitchMode}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isFocus ? "Mulai Sesi Istirahat" : "Mulai Sesi Fokus Berikutnya"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Ulangi Sesi Ini
          </button>
        </>
      )}
    </div>
  );
}
