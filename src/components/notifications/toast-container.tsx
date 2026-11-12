"use client";

import { useEffect, useState } from "react";
import { InAppToast } from "@/types/notification";
import { removeInAppToast, subscribeInAppToasts } from "@/lib/notification-service";

export function ToastContainer() {
  const [toasts, setToasts] = useState<InAppToast[]>([]);

  useEffect(() => {
    return subscribeInAppToasts((updated) => {
      setToasts(updated);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Pemberitahuan Sistem"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Icon indicator based on type */}
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              toast.type === "timer"
                ? "bg-accent-soft text-accent"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200"
            }`}
          >
            {toast.type === "timer" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            )}
          </div>

          {/* Toast Text */}
          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="text-xs font-semibold text-foreground tracking-tight">
              {toast.title}
            </h4>
            <p className="mt-0.5 text-xs text-muted leading-relaxed">
              {toast.message}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => removeInAppToast(toast.id)}
            aria-label="Tutup notifikasi"
            className="text-muted hover:text-foreground p-1 rounded-lg transition"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
