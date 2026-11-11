import Link from "next/link";
import { CalendarEvent } from "@/types/calendar";
import { EventBadge } from "@/components/calendar/event-badge";
import {
  formatIndonesianDate,
  formatTimeRange,
  getDateRelativeLabel,
} from "@/lib/date-utils";

export function DashboardAgendaItem({
  event,
  showDate = false,
}: {
  event: CalendarEvent;
  showDate?: boolean;
}) {
  const relativeLabel = getDateRelativeLabel(event.date);
  const formattedDate = formatIndonesianDate(event.date);
  const timeRange = formatTimeRange(event.startTime, event.endTime);

  return (
    <Link
      href="/calendar"
      className="group block rounded-xl border border-border/80 bg-background/50 p-3.5 transition-all hover:border-accent hover:bg-background"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <EventBadge type={event.type} />
            {showDate && (
              <span className="text-xs font-medium text-muted">
                {formattedDate}
              </span>
            )}
            {relativeLabel && showDate && (
              <span className="rounded-md bg-accent-soft px-1.5 py-0.2 text-[11px] font-semibold text-accent">
                {relativeLabel}
              </span>
            )}
          </div>

          <h4 className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors break-words">
            {event.title}
          </h4>

          {timeRange && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
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
            </p>
          )}

          {event.notes && (
            <p className="mt-1.5 text-xs text-muted line-clamp-1">
              {event.notes}
            </p>
          )}
        </div>

        <span className="text-muted group-hover:text-accent transition-colors pt-0.5">
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

