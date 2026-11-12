"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navigationItems } from "./navigation";
import { initTimerStore } from "@/lib/focus-timer-store";
import { useFocusTimer } from "@/hooks/use-focus-timer";
import { NotificationSettingsModal } from "@/components/notifications/notification-settings-modal";

const linkClassName =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function AppNav() {
  const pathname = usePathname();
  const { status, formattedMinutes, formattedSeconds, mode } = useFocusTimer();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    initTimerStore();
  }, []);

  const isTimerActive = status === "running" || status === "paused";

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
        <div className="border-b border-border px-5 py-6">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Student Life
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            Pendamping akademik
          </p>
        </div>
        <nav aria-label="Utama" className="flex flex-1 flex-col gap-1 p-3">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const isFocusItem = item.href === "/focus";

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`${linkClassName} ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-accent-soft/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="block">{item.label}</span>
                  {isFocusItem && isTimerActive && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-mono font-semibold ${
                        status === "running"
                          ? "bg-accent text-white"
                          : "bg-black/10 dark:bg-white/10 text-muted"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          mode === "focus" ? "bg-emerald-300" : "bg-amber-300"
                        } ${status === "running" ? "animate-ping" : ""}`}
                      />
                      {formattedMinutes}:{formattedSeconds}
                    </span>
                  )}
                </div>
                <span className="mt-0.5 block text-xs font-normal text-muted">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop notification settings button */}
        <div className="border-t border-border p-3 mt-auto">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted hover:bg-background hover:text-foreground transition focus-visible:outline-2 focus-visible:outline-accent"
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>Pengaturan Notifikasi</span>
          </button>
        </div>
      </aside>

      <nav
        aria-label="Utama"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface md:hidden"
      >
        <ul className="grid grid-cols-4">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const isFocusItem = item.href === "/focus";

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center px-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                    active ? "text-accent font-semibold" : "text-muted"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isFocusItem && isTimerActive && (
                    <span className="mt-0.5 font-mono text-[9px] text-accent font-semibold">
                      {status === "paused" ? "⏸ " : "⏳ "}
                      {formattedMinutes}:{formattedSeconds}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}

          {/* Mobile notification settings trigger */}
          <li>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Pengaturan Notifikasi"
              className="flex min-h-14 w-full flex-col items-center justify-center px-1 text-xs font-medium text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
              <span className="mt-0.5 text-[10px]">Notifikasi</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
