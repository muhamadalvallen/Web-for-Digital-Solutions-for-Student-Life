"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useFocusTimer } from "@/hooks/use-focus-timer";
import { PresetSelector } from "@/components/focus/preset-selector";
import { TimerDisplay } from "@/components/focus/timer-display";
import { TimerControls } from "@/components/focus/timer-controls";
import { NotificationSettingsModal } from "@/components/notifications/notification-settings-modal";

export default function FocusPage() {
  const {
    presetId,
    mode,
    status,
    formattedMinutes,
    formattedSeconds,
    progressRatio,
    completedFocusCount,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    switchMode,
    selectPreset,
  } = useFocusTimer();

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const isTimerActive = status === "running" || status === "paused";

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Mode Fokus"
          description="Gunakan timer Pomodoro atau Deep Work untuk membantu konsentrasi belajar dan menjaga ritme istirahat."
        />
        <div className="shrink-0 pt-0 sm:pt-1">
          <button
            type="button"
            onClick={() => setIsNotificationModalOpen(true)}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent shadow-xs"
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Pengaturan Notifikasi
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Preset Selector */}
        <section aria-label="Pilihan preset timer">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Pilihan Preset
            </h2>
            {isTimerActive && (
              <span className="text-xs text-muted">
                Reset timer untuk mengganti preset
              </span>
            )}
          </div>
          <PresetSelector
            selectedPresetId={presetId}
            isDisabled={isTimerActive}
            onSelectPreset={selectPreset}
          />
        </section>

        {/* Timer Display & Controls */}
        <section aria-label="Tampilan timer fokus" className="space-y-6">
          <TimerDisplay
            mode={mode}
            status={status}
            formattedMinutes={formattedMinutes}
            formattedSeconds={formattedSeconds}
            progressRatio={progressRatio}
            completedFocusCount={completedFocusCount}
          />

          <TimerControls
            mode={mode}
            status={status}
            onStart={startTimer}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onReset={resetTimer}
            onSwitchMode={() => switchMode()}
          />
        </section>

        {/* Helpful Tips / Info Section */}
        <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
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
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Panduan Ritme Belajar
          </h3>
          <div className="mt-3 grid gap-4 text-xs leading-5 text-muted sm:grid-cols-2">
            <div>
              <strong className="text-foreground font-medium block">
                Teknik Pomodoro (25m / 5m)
              </strong>
              Sangat cocok untuk belajar materi baru, membaca bab buku, atau menyelesaikan kumpulan soal pendek secara bertahap tanpa cepat lelah.
            </div>
            <div>
              <strong className="text-foreground font-medium block">
                Deep Work (50m / 10m)
              </strong>
              Sangat cocok untuk tugas besar yang membutuhkan pemikiran mendalam, coding proyek, atau menyusun laporan/makalah akademis.
            </div>
          </div>
        </section>
      </div>

      {/* Accuracy & Local Notice */}
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
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Timer menggunakan perhitungan berbasis waktu selesai (timestamp deadline) sehingga tidak meleset saat tab diminimalkan.
        </p>
      </footer>

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
}
