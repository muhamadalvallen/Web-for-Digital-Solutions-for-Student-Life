import {
  CalendarEventType,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from "@/types/calendar";

export function EventBadge({ type }: { type: CalendarEventType }) {
  const color = EVENT_TYPE_COLORS[type];
  const label = EVENT_TYPE_LABELS[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} />
      {label}
    </span>
  );
}
