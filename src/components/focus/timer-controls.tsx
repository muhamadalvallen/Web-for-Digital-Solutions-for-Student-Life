"use client";

import { useState, useEffect } from "react";
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
  const [confirmAction, setConfirmAction] = useState<"reset" | "skip" | null>(null);

  // Close confirmation on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && confirmAction) {
        setConfirmAction(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmAction]);

  const handleResetClick = () => {
    if (status === "running" || status === "paused") {
      setConfirmAction("reset");
    } else {
      onReset();
    }
  };

  const handleSkipClick = () => {
    if (status === "running" || status === "paused") {
      setConfirmAction("skip");
    } else {
      onSwitchMode();
    }
  };

  const handleConfirm = () => {
    if (confirmAction === "reset") {
      onReset();
    } else if (confirmAction === "skip") {
      onSwitchMode();
    }
    setConfirmAction(null);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {status === "idle" && (
          <>
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
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
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
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
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
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
              onClick={handleResetClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-red-300 hover:text-red-600 focus-visible:outline-2 cursor-pointer"
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
              onClick={handleSkipClick}
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
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
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
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
              onClick={handleResetClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-red-300 hover:text-red-600 focus-visible:outline-2 cursor-pointer"
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
              onClick={handleSkipClick}
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
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
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
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
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Ulangi Sesi Ini
            </button>
          </>
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {confirmAction && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setConfirmAction(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h3 className="mt-4 text-base font-semibold text-foreground">
              {confirmAction === "reset" ? "Reset Sesi Ini?" : "Lewati Sesi Ini?"}
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted">
              {confirmAction === "reset"
                ? "Sesi yang sedang berjalan akan dibatalkan dan waktu akan dikembalikan ke durasi awal."
                : `Sesi ${isFocus ? "fokus" : "istirahat"} ini akan dihentikan dan timer langsung berpindah ke sesi ${isFocus ? "istirahat" : "fokus"}.`}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700 shadow-xs cursor-pointer"
              >
                {confirmAction === "reset" ? "Ya, Reset Timer" : "Ya, Lewati Sesi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
