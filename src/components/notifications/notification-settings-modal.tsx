"use client";

import { useEffect, useState } from "react";
import { NotificationSettings } from "@/types/notification";
import {
  getNotificationSettings,
  saveNotificationSettings,
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  emitInAppToast,
  triggerBrowserNotification,
} from "@/lib/notification-service";
import { playReminderChime } from "@/lib/audio-chime";

type NotificationSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function NotificationSettingsContent({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState<NotificationSettings>(() => getNotificationSettings());
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() =>
    getBrowserNotificationPermission()
  );
  const [testSent, setTestSent] = useState(false);

  const handleToggleAgenda = (val: boolean) => {
    const next = { ...settings, agendaRemindersEnabled: val };
    setSettings(next);
    saveNotificationSettings(next);
  };

  const handleToggleTimer = (val: boolean) => {
    const next = { ...settings, focusTimerAlertEnabled: val };
    setSettings(next);
    saveNotificationSettings(next);
  };

  const handleToggleSound = (val: boolean) => {
    const next = { ...settings, soundEnabled: val };
    setSettings(next);
    saveNotificationSettings(next);
  };

  const handleRequestPermission = async () => {
    const res = await requestBrowserNotificationPermission();
    setPermission(res);
  };

  const handleSendTestNotification = () => {
    if (settings.soundEnabled) {
      playReminderChime();
    }

    triggerBrowserNotification("Uji Coba Notifikasi Berhasil! 🔔", {
      body: "Notifikasi browser untuk Digital Solutions for Student Life sudah aktif dan berfungsi.",
      tag: "dsl-test-notification",
    });

    emitInAppToast({
      title: "Uji Coba Notifikasi Berhasil! 🔔",
      message: "Pengaturan notifikasi dan audio pengingat Anda aktif.",
      type: "info",
    });

    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div
      className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/70">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
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
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              Pengaturan Notifikasi
            </h3>
            <p className="text-xs text-muted">
              Atur pengingat agenda dan alarm selesai sesi fokus
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="rounded-lg p-1.5 text-muted hover:text-foreground transition"
        >
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Browser Permission Status Banner */}
      <div className="mt-4 rounded-2xl border border-border/80 bg-background/60 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-foreground block">
              Izin Notifikasi Browser
            </span>
            <p className="text-xs text-muted mt-0.5">
              {permission === "granted"
                ? "Browser telah mengizinkan notifikasi saat tab tidak aktif."
                : permission === "denied"
                ? "Notifikasi diblokir oleh browser. Ubah di pengaturan situs browser Anda."
                : "Izinkan browser agar notifikasi tetap muncul saat membuka tab lain."}
            </p>
          </div>

          <div className="shrink-0">
            {permission === "granted" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                Aktif
              </span>
            ) : permission === "denied" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 dark:bg-rose-950/60 px-2.5 py-1 text-[11px] font-semibold text-rose-800 dark:text-rose-300">
                Diblokir
              </span>
            ) : (
              <button
                type="button"
                onClick={handleRequestPermission}
                className="rounded-xl bg-accent px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90 shadow-xs"
              >
                Izinkan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toggles Options */}
      <div className="mt-4 space-y-3.5">
        {/* Toggle Agenda Reminders */}
        <label className="flex items-start justify-between gap-3 cursor-pointer select-none rounded-xl p-2 hover:bg-background/40 transition">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-foreground block">
              Pengingat Agenda Kuliah & Tugas
            </span>
            <span className="text-xs text-muted block leading-relaxed">
              Tampilkan pengingat otomatis sebelum acara atau tenggat tugas dimulai.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.agendaRemindersEnabled}
            onChange={(e) => handleToggleAgenda(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-md border-border text-accent focus:ring-accent"
          />
        </label>

        {/* Toggle Timer Finish Notification */}
        <label className="flex items-start justify-between gap-3 cursor-pointer select-none rounded-xl p-2 hover:bg-background/40 transition">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-foreground block">
              Notifikasi Timer Mode Fokus Selesai
            </span>
            <span className="text-xs text-muted block leading-relaxed">
              Beri tahu saat sesi Pomodoro, Deep Work, atau istirahat selesai.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.focusTimerAlertEnabled}
            onChange={(e) => handleToggleTimer(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-md border-border text-accent focus:ring-accent"
          />
        </label>

        {/* Toggle Audio Sound */}
        <label className="flex items-start justify-between gap-3 cursor-pointer select-none rounded-xl p-2 hover:bg-background/40 transition">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-foreground block">
              Efek Suara Nada Dering (Chime)
            </span>
            <span className="text-xs text-muted block leading-relaxed">
              Bunyikan nada lembut saat pengingat aktif atau sesi fokus berakhir.
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => handleToggleSound(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-md border-border text-accent focus:ring-accent"
          />
        </label>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-border/70 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleSendTestNotification}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
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
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {testSent ? "Terkirim!" : "Uji Coba Notifikasi"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-accent px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 shadow-xs"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}

export function NotificationSettingsModal({
  isOpen,
  onClose,
}: NotificationSettingsModalProps) {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
    >
      <NotificationSettingsContent onClose={onClose} />
    </div>
  );
}
