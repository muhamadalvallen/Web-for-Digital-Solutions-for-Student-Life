export type CalendarEventType = "class" | "assignment" | "exam" | "personal";

export type CalendarEvent = {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  notes?: string;
  reminderMinutes?: number; // Menit sebelum acara: 0 (tepat waktu), 5, 10, 15, 30, 60, 1440, atau undefined (tidak ada)
  createdAt: string;
  updatedAt: string;
};

export const REMINDER_OPTIONS = [
  { value: -1, label: "Tanpa pengingat" },
  { value: 0, label: "Tepat waktu acara" },
  { value: 5, label: "5 menit sebelumnya" },
  { value: 10, label: "10 menit sebelumnya" },
  { value: 15, label: "15 menit sebelumnya" },
  { value: 30, label: "30 menit sebelumnya" },
  { value: 60, label: "1 jam sebelumnya" },
  { value: 1440, label: "1 hari sebelumnya" },
] as const;

export type CalendarFilterType = "all" | CalendarEventType;

export const EVENT_TYPE_LABELS: Record<CalendarEventType, string> = {
  class: "Kelas",
  assignment: "Tugas",
  exam: "Ujian",
  personal: "Pribadi",
};

export const EVENT_TYPE_COLORS: Record<
  CalendarEventType,
  { bg: string; text: string; border: string; dot: string }
> = {
  class: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-500",
  },
  assignment: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  exam: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    dot: "bg-rose-500",
  },
  personal: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
};

