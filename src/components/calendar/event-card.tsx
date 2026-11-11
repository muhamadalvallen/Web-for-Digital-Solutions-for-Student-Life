"use client";

import { useState } from "react";
import { CalendarEvent } from "@/types/calendar";
import { EventBadge } from "./event-badge";
import {
  formatIndonesianDate,
  formatTimeRange,
  getDateRelativeLabel,
} from "@/lib/date-utils";

export function EventCard({
  event,
  onEdit,
  onDelete,
}: {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const relativeLabel = getDateRelativeLabel(event.date);
  const formattedDate = formatIndonesianDate(event.date);
  const timeRange = formatTimeRange(event.startTime, event.endTime);

  const handleDelete = () => {
    onDelete(event.id);
    setIsConfirmingDelete(false);
  };

  return (
    <article className="group relative rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <EventBadge type={event.type} />
            {relativeLabel && (
              <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                {relativeLabel}
              </span>
            )}
            <span className="text-xs text-muted font-medium">
              {formattedDate}
            </span>
          </div>

          <h3 className="mt-2 text-base font-semibold text-foreground break-words">
            {event.title}
          </h3>

          {timeRange && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted font-medium">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{timeRange}</span>
            </div>
          )}

          {event.notes && (
            <p className="mt-2.5 whitespace-pre-wrap text-sm leading-6 text-muted border-t border-border/60 pt-2">
              {event.notes}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t border-border/50 sm:border-t-0 justify-end">
          {isConfirmingDelete ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/40 p-1.5 border border-red-200 dark:border-red-900/60">
              <span className="text-xs text-red-700 dark:text-red-300 font-medium px-1">
                Hapus?
              </span>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Ya
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="rounded-lg border border-red-200 dark:border-red-800 bg-surface px-2.5 py-1 text-xs font-semibold text-muted hover:text-foreground"
              >
                Batal
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onEdit(event)}
                aria-label={`Ubah agenda ${event.title}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              >
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Ubah
              </button>

              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                aria-label={`Hapus agenda ${event.title}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-red-400 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500"
              >
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
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

