import { CalendarEvent } from "@/types/calendar";

export const STORAGE_KEY = "dsl:calendar-events";
export const STORAGE_EVENT_NAME = "dsl:calendar-events-updated";

/**
 * Validates if an unknown object conforms to CalendarEvent
 */
export function isValidCalendarEvent(obj: unknown): obj is CalendarEvent {
  if (!obj || typeof obj !== "object") return false;
  const event = obj as Partial<CalendarEvent>;
  return (
    typeof event.id === "string" &&
    typeof event.title === "string" &&
    (event.type === "class" ||
      event.type === "assignment" ||
      event.type === "exam" ||
      event.type === "personal") &&
    typeof event.date === "string"
  );
}

/**
 * Sorts calendar events chronologically by date, then startTime, then title
 */
export function sortCalendarEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    // 1. Sort by date YYYY-MM-DD
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;

    // 2. Sort by startTime (events with startTime come before events without)
    if (a.startTime && b.startTime) {
      const timeComp = a.startTime.localeCompare(b.startTime);
      if (timeComp !== 0) return timeComp;
    } else if (a.startTime && !b.startTime) {
      return -1;
    } else if (!a.startTime && b.startTime) {
      return 1;
    }

    // 3. Fallback to title
    return a.title.localeCompare(b.title);
  });
}

// In-memory cache for useSyncExternalStore reference stability
let cachedRawString: string | null = null;
let cachedParsedEvents: CalendarEvent[] = [];

/**
 * Reads calendar events from localStorage safely with cache for reference stability
 */
export function getStoredCalendarEvents(): CalendarEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRawString) {
      return cachedParsedEvents;
    }

    cachedRawString = raw;
    if (!raw) {
      cachedParsedEvents = [];
      return cachedParsedEvents;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cachedParsedEvents = [];
      return cachedParsedEvents;
    }

    const validEvents = parsed.filter(isValidCalendarEvent);
    cachedParsedEvents = sortCalendarEvents(validEvents);
    return cachedParsedEvents;
  } catch (error) {
    console.error("Gagal membaca data agenda dari localStorage:", error);
    cachedParsedEvents = [];
    return cachedParsedEvents;
  }
}

/**
 * Saves calendar events to localStorage and notifies other listeners
 */
export function saveStoredCalendarEvents(events: CalendarEvent[]): void {
  if (typeof window === "undefined") return;

  try {
    const sorted = sortCalendarEvents(events);
    const serialized = JSON.stringify(sorted);
    cachedRawString = serialized;
    cachedParsedEvents = sorted;
    window.localStorage.setItem(STORAGE_KEY, serialized);
    window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
  } catch (error) {
    console.error("Gagal menyimpan data agenda ke localStorage:", error);
  }
}

export function subscribeCalendarEvents(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(STORAGE_EVENT_NAME, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(STORAGE_EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}
