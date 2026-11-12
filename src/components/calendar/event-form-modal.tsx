"use client";

import { useEffect, useState, useId } from "react";
import {
  CalendarEvent,
  CalendarEventType,
  EVENT_TYPE_LABELS,
} from "@/types/calendar";
import { CreateEventInput } from "@/hooks/use-calendar-events";
import { getTodayDateString } from "@/lib/date-utils";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventInput) => void;
  initialEvent?: CalendarEvent | null;
  defaultDate?: string;
};

const EVENT_TYPES: CalendarEventType[] = [
  "class",
  "assignment",
  "exam",
  "personal",
];

function EventFormContent({
  initialEvent,
  defaultDate,
  onClose,
  onSubmit,
}: {
  initialEvent?: CalendarEvent | null;
  defaultDate?: string;
  onClose: () => void;
  onSubmit: (data: CreateEventInput) => void;
}) {
  const isEditing = Boolean(initialEvent);
  const titleId = useId();

  const [title, setTitle] = useState(initialEvent?.title ?? "");
  const [type, setType] = useState<CalendarEventType>(
    initialEvent?.type ?? "class"
  );
  const [date, setDate] = useState(
    initialEvent?.date ?? defaultDate ?? getTodayDateString()
  );
  const [startTime, setStartTime] = useState(initialEvent?.startTime ?? "");
  const [endTime, setEndTime] = useState(initialEvent?.endTime ?? "");
  const [notes, setNotes] = useState(initialEvent?.notes ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Judul agenda wajib diisi.";
    }

    if (!date) {
      newErrors.date = "Tanggal wajib ditentukan.";
    }

    if (startTime && endTime && startTime > endTime) {
      newErrors.endTime = "Jam selesai tidak boleh lebih awal dari jam mulai.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      type,
      date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-border/70 pb-4">
        <h2 id={titleId} className="text-lg font-semibold text-foreground">
          {isEditing ? "Ubah Agenda" : "Tambah Agenda Baru"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup form"
          className="rounded-lg p-1.5 text-muted transition hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
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

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Judul */}
        <div>
          <label
            htmlFor="event-title"
            className="block text-xs font-semibold text-foreground"
          >
            Judul Agenda <span className="text-red-500">*</span>
          </label>
          <input
            id="event-title"
            type="text"
            required
            autoFocus
            placeholder="Contoh: Kuliah Algoritma & Pemrograman"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
            }}
            className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition focus-visible:outline-2 focus-visible:outline-accent ${
              errors.title ? "border-red-500" : "border-border"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-semibold text-foreground">
            Kategori Agenda
          </label>
          <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {EVENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-xl border py-2 px-3 text-xs font-medium transition text-center ${
                  type === t
                    ? "border-accent bg-accent-soft text-accent font-semibold"
                    : "border-border bg-background text-muted hover:text-foreground"
                }`}
              >
                {EVENT_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Tanggal */}
        <div>
          <label
            htmlFor="event-date"
            className="block text-xs font-semibold text-foreground"
          >
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            id="event-date"
            type="date"
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
            }}
            className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground transition focus-visible:outline-2 focus-visible:outline-accent ${
              errors.date ? "border-red-500" : "border-border"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-600">{errors.date}</p>
          )}
        </div>

        {/* Jam Mulai & Jam Selesai */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="event-start-time"
              className="block text-xs font-semibold text-foreground"
            >
              Jam Mulai <span className="text-xs text-muted">(opsional)</span>
            </label>
            <input
              id="event-start-time"
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                if (errors.endTime)
                  setErrors((prev) => ({ ...prev, endTime: "" }));
              }}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground transition focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div>
            <label
              htmlFor="event-end-time"
              className="block text-xs font-semibold text-foreground"
            >
              Jam Selesai <span className="text-xs text-muted">(opsional)</span>
            </label>
            <input
              id="event-end-time"
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                if (errors.endTime)
                  setErrors((prev) => ({ ...prev, endTime: "" }));
              }}
              className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2 text-sm text-foreground transition focus-visible:outline-2 focus-visible:outline-accent ${
                errors.endTime ? "border-red-500" : "border-border"
              }`}
            />
            {errors.endTime && (
              <p className="mt-1 text-xs text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label
            htmlFor="event-notes"
            className="block text-xs font-semibold text-foreground"
          >
            Catatan Tambahan{" "}
            <span className="text-xs text-muted">(opsional)</span>
          </label>
          <textarea
            id="event-notes"
            rows={3}
            placeholder="Ruang kuliah, tautan Zoom, materi yang dibahas, atau catatan tugas..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition focus-visible:outline-2 focus-visible:outline-accent resize-none"
          />
        </div>

        {/* Tombol aksi */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isEditing ? "Simpan Perubahan" : "Tambah Agenda"}
          </button>
        </div>
      </form>
    </>
  );
}

export function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialEvent,
  defaultDate,
}: FormModalProps) {
  // Handle ESC key press
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
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <EventFormContent
          key={initialEvent?.id ?? defaultDate ?? "new-event"}
          initialEvent={initialEvent}
          defaultDate={defaultDate}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
