"use client";

import { CalendarEvent } from "@/types/calendar";
import {
  formatFullIndonesianDate,
  getDateRelativeLabel,
} from "@/lib/date-utils";
import { EventCard } from "@/components/calendar/event-card";

type SelectedDateAgendaProps = {
  selectedDate: string;
  events: CalendarEvent[];
  onAddEvent: (date: string) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
};

export function SelectedDateAgenda({
  selectedDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: SelectedDateAgendaProps) {
  const formattedDate = formatFullIndonesianDate(selectedDate);
  const relativeLabel = getDateRelativeLabel(selectedDate);
  const dateEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6 shadow-xs flex flex-col h-full">
      {/* Header with date and add button */}
      <div className="flex flex-col gap-2 pb-4 border-b border-border/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Detail Agenda
            </span>
            {relativeLabel && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                {relativeLabel}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight mt-0.5">
            {formattedDate}
          </h3>
          <p className="text-xs text-muted">
            {dateEvents.length === 0
              ? "Tidak ada agenda terjadwal"
              : `${dateEvents.length} agenda terjadwal untuk hari ini`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAddEvent(selectedDate)}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-medium text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Agenda
        </button>
      </div>

      {/* Events List or Empty State */}
      <div className="mt-4 flex-1">
        {dateEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-background/50 p-8 text-center my-auto min-h-[200px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-border text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h4 className="mt-3 text-sm font-medium text-foreground">
              Belum ada agenda di tanggal ini
            </h4>
            <p className="mt-1 text-xs text-muted max-w-xs">
              Kamu bebas jadwal atau belum menambahkan kelas, tugas, maupun agenda pribadi.
            </p>
            <button
              type="button"
              onClick={() => onAddEvent(selectedDate)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              + Buat agenda untuk tanggal ini
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {dateEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

