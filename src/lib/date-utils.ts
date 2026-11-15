/**
 * Helper to get today's date in YYYY-MM-DD format (local timezone)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format date string YYYY-MM-DD to Indonesian readable format, e.g. "Rabu, 11 Nov 2026"
 */
export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Format date with full month name for headers, e.g. "Rabu, 11 November 2026"
 */
export function formatFullIndonesianDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Determines if date is today, tomorrow, or in the future
 */
export function getDateRelativeLabel(dateStr: string): string | null {
  const today = getTodayDateString();
  if (dateStr === today) return "Hari Ini";

  const [tYear, tMonth, tDay] = today.split("-").map(Number);
  const tomorrow = new Date(tYear, tMonth - 1, tDay + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

  if (dateStr === tomorrowStr) return "Besok";

  // Calculate day difference
  const [year, month, day] = dateStr.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);
  const todayDate = new Date(tYear, tMonth - 1, tDay);
  const diffTime = targetDate.getTime() - todayDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1 && diffDays <= 7) {
    return `${diffDays} hari lagi`;
  }

  return null;
}

/**
 * Format time range: "08:00 - 10:00 WIB" or "08:00 WIB"
 */
export function formatTimeRange(startTime?: string, endTime?: string): string | null {
  if (!startTime && !endTime) return null;
  if (startTime && endTime) {
    return `${startTime} – ${endTime} WIB`;
  }
  if (startTime) {
    return `Mulai ${startTime} WIB`;
  }
  return `Hingga ${endTime} WIB`;
}

/**
 * Format month and year, e.g. "Desember 2026"
 */
export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export type CalendarDayCell = {
  dateStr: string;
  dayNumber: number;
  isCurrentMonth: boolean;
};

/**
 * Returns a 35 or 42 day matrix for the specified year and month (0-indexed month)
 */
export function getMonthMatrix(year: number, month: number): CalendarDayCell[] {
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarDayCell[] = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevDate = new Date(year, month - 1, day);
    const dateStr = `${prevDate.getFullYear()}-${String(
      prevDate.getMonth() + 1
    ).padStart(2, "0")}-${String(prevDate.getDate()).padStart(2, "0")}`;
    cells.push({
      dateStr,
      dayNumber: day,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    cells.push({
      dateStr,
      dayNumber: day,
      isCurrentMonth: true,
    });
  }

  // Next month leading days to complete full weeks
  const totalCells = Math.ceil(cells.length / 7) * 7;
  const trailingCount = totalCells - cells.length;
  for (let day = 1; day <= trailingCount; day++) {
    const nextDate = new Date(year, month + 1, day);
    const dateStr = `${nextDate.getFullYear()}-${String(
      nextDate.getMonth() + 1
    ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
    cells.push({
      dateStr,
      dayNumber: day,
      isCurrentMonth: false,
    });
  }

  return cells;
}
