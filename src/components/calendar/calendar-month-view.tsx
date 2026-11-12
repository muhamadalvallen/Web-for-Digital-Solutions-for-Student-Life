"use client";

import { useMemo } from "react";
import {
  CalendarEvent,
  CalendarEventType,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from "@/types/calendar";
import {
  CalendarDayCell,
  getMonthMatrix,
  formatMonthYear,
  getTodayDateString,
} from "@/lib/date-utils";

type CalendarMonthViewProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  events: CalendarEvent[];
  viewYear: number;
  viewMonth: number; // 0-indexed (0 = Jan, 11 = Dec)
  onChangeMonth: (year: number, month: number) => void;
  onJumpToToday: () => void;
};

const WEEKDAY_NAMES = [
  { short: "Min", letter: "M" },
  { short: "Sen", letter: "S" },
  { short: "Sel", letter: "S" },
  { short: "Rab", letter: "R" },
  { short: "Kam", letter: "K" },
  { short: "Jum", letter: "J" },
  { short: "Sab", letter: "S" },
];

export function CalendarMonthView({
  selectedDate,
  onSelectDate,
  events,
  viewYear,
  viewMonth,
  onChangeMonth,
  onJumpToToday,
}: CalendarMonthViewProps) {
  const todayStr = getTodayDateString();

  // Pre-index events by date for O(1) lookups
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const evt of events) {
      const list = map.get(evt.date) || [];
      list.push(evt);
      map.set(evt.date, list);
    }
    return map;
  }, [events]);

  const cells = useMemo(
    () => getMonthMatrix(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      onChangeMonth(viewYear - 1, 11);
    } else {
      onChangeMonth(viewYear, viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      onChangeMonth(viewYear + 1, 0);
    } else {
      onChangeMonth(viewYear, viewMonth + 1);
    }
  };

  const handleCellClick = (cell: CalendarDayCell) => {
    onSelectDate(cell.dateStr);

    // If user clicked a day from prev/next month, update the view to match
    const [cellY, cellM] = cell.dateStr.split("-").map(Number);
    if (cellY !== viewYear || cellM - 1 !== viewMonth) {
      onChangeMonth(cellY, cellM - 1);
    }
  };

  // Helper to get dominant background styling for dates with events
  const getDayEventStyle = (dayEvents?: CalendarEvent[]) => {
    if (!dayEvents || dayEvents.length === 0) return null;

    // Hierarchy of importance for soft background tint: exam > assignment > class > personal
    const types = new Set(dayEvents.map((e) => e.type));
    if (types.has("exam")) {
      return "bg-rose-100 text-rose-900 font-medium hover:bg-rose-200/90 dark:bg-rose-950/50 dark:text-rose-200";
    }
    if (types.has("assignment")) {
      return "bg-amber-100 text-amber-900 font-medium hover:bg-amber-200/90 dark:bg-amber-950/50 dark:text-amber-200";
    }
    if (types.has("class")) {
      return "bg-blue-100 text-blue-900 font-medium hover:bg-blue-200/90 dark:bg-blue-950/50 dark:text-blue-200";
    }
    return "bg-emerald-100 text-emerald-900 font-medium hover:bg-emerald-200/90 dark:bg-emerald-950/50 dark:text-emerald-200";
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6 shadow-xs">
      {/* Top Bar with Legend & Selected Date pill (Matching reference image) */}
      <div className="flex flex-col gap-3 pb-4 border-b border-border/60 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Legend */}
        <div className="flex flex-wrap items-center gap-3">
          {(["class", "assignment", "exam", "personal"] as CalendarEventType[]).map(
            (type) => {
              const label = EVENT_TYPE_LABELS[type];
              const colors = EVENT_TYPE_COLORS[type];
              return (
                <div
                  key={type}
                  className="flex items-center gap-1.5 text-xs text-muted"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                  <span className="font-medium text-[11px] sm:text-xs">
                    {label}
                  </span>
                </div>
              );
            }
          )}
        </div>

        {/* Selected date preview badge pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
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
              className="text-muted"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {selectedDate}
          </span>
          <button
            type="button"
            onClick={onJumpToToday}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent-soft transition"
          >
            Hari ini
          </button>
        </div>
      </div>

      {/* Month Navigation Header */}
      <div className="flex items-center justify-between py-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Bulan sebelumnya"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {formatMonthYear(viewYear, viewMonth)}
        </h2>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Bulan berikutnya"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Weekday Labels (S M T W T F S / Min Sen Sel Rab Kam Jum Sab) */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {WEEKDAY_NAMES.map((d, idx) => (
          <div
            key={idx}
            className="py-1 text-xs font-semibold uppercase tracking-wider text-muted"
            title={d.short}
          >
            {d.letter}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 sm:gap-x-2">
        {cells.map((cell) => {
          const isSelected = cell.dateStr === selectedDate;
          const isToday = cell.dateStr === todayStr;
          const dayEvents = eventsByDate.get(cell.dateStr);
          const hasEvents = Boolean(dayEvents && dayEvents.length > 0);
          const eventStyle = getDayEventStyle(dayEvents);

          return (
            <div key={cell.dateStr} className="flex justify-center">
              <button
                type="button"
                onClick={() => handleCellClick(cell)}
                title={`${cell.dateStr}${
                  hasEvents ? ` (${dayEvents!.length} agenda)` : ""
                }`}
                aria-label={`${cell.dayNumber} ${
                  hasEvents ? `dengan ${dayEvents!.length} agenda` : ""
                }`}
                aria-pressed={isSelected}
                className={`relative flex h-9 w-9 sm:h-10 sm:w-10 flex-col items-center justify-center rounded-full text-xs sm:text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isSelected
                    ? "bg-foreground text-surface font-bold shadow-md scale-105 z-10"
                    : isToday
                    ? "ring-2 ring-accent ring-offset-2 font-bold text-accent hover:bg-accent-soft/40"
                    : hasEvents
                    ? `${eventStyle}`
                    : cell.isCurrentMonth
                    ? "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                    : "text-muted/40 hover:text-muted/70"
                }`}
              >
                <span>{cell.dayNumber}</span>

                {/* Event Dot Indicators for multiple items or non-selected days */}
                {hasEvents && !isSelected && (
                  <span className="absolute bottom-1 flex gap-0.5">
                    {dayEvents!.slice(0, 3).map((evt, i) => (
                      <span
                        key={i}
                        className={`h-1 w-1 rounded-full ${
                          EVENT_TYPE_COLORS[evt.type].dot
                        }`}
                      />
                    ))}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

