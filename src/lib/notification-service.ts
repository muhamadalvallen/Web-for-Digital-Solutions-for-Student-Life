import { CalendarEvent, EVENT_TYPE_LABELS } from "@/types/calendar";
import { InAppToast, NotificationSettings } from "@/types/notification";
import { playReminderChime, playSessionEndChime } from "@/lib/audio-chime";

export const NOTIFICATION_SETTINGS_KEY = "dsl:notification-settings";
export const ALERTED_REMINDERS_KEY = "dsl:alerted-reminders";
export const NOTIFICATION_SETTINGS_EVENT = "dsl:notification-settings-updated";

const DEFAULT_SETTINGS: NotificationSettings = {
  agendaRemindersEnabled: true,
  focusTimerAlertEnabled: true,
  soundEnabled: true,
};

let activeToasts: InAppToast[] = [];
const toastListeners = new Set<(toasts: InAppToast[]) => void>();
const settingsListeners = new Set<() => void>();

export function getNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const raw = window.localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      agendaRemindersEnabled:
        typeof parsed.agendaRemindersEnabled === "boolean"
          ? parsed.agendaRemindersEnabled
          : DEFAULT_SETTINGS.agendaRemindersEnabled,
      focusTimerAlertEnabled:
        typeof parsed.focusTimerAlertEnabled === "boolean"
          ? parsed.focusTimerAlertEnabled
          : DEFAULT_SETTINGS.focusTimerAlertEnabled,
      soundEnabled:
        typeof parsed.soundEnabled === "boolean"
          ? parsed.soundEnabled
          : DEFAULT_SETTINGS.soundEnabled,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      NOTIFICATION_SETTINGS_KEY,
      JSON.stringify(settings)
    );
    window.dispatchEvent(new Event(NOTIFICATION_SETTINGS_EVENT));
    settingsListeners.forEach((fn) => fn());
  } catch (e) {
    console.error("Gagal menyimpan pengaturan notifikasi:", e);
  }
}

export function subscribeNotificationSettings(callback: () => void): () => void {
  settingsListeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener(NOTIFICATION_SETTINGS_EVENT, callback);
    window.addEventListener("storage", callback);
  }
  return () => {
    settingsListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener(NOTIFICATION_SETTINGS_EVENT, callback);
      window.removeEventListener("storage", callback);
    }
  };
}

export function getBrowserNotificationPermission(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
}

export async function requestBrowserNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.error("Gagal meminta izin notifikasi:", e);
    return Notification.permission;
  }
}

export function emitInAppToast(toastData: Omit<InAppToast, "id" | "timestamp">): InAppToast {
  const toast: InAppToast = {
    ...toastData,
    id: `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
  };

  activeToasts = [toast, ...activeToasts].slice(0, 4);
  toastListeners.forEach((fn) => fn([...activeToasts]));

  // Auto dismiss after 6 seconds
  setTimeout(() => {
    removeInAppToast(toast.id);
  }, 6000);

  return toast;
}

export function removeInAppToast(id: string): void {
  activeToasts = activeToasts.filter((t) => t.id !== id);
  toastListeners.forEach((fn) => fn([...activeToasts]));
}

export function subscribeInAppToasts(callback: (toasts: InAppToast[]) => void): () => void {
  toastListeners.add(callback);
  callback([...activeToasts]);
  return () => {
    toastListeners.delete(callback);
  };
}

export function triggerBrowserNotification(title: string, options?: { body: string; tag?: string }): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission === "granted") {
    try {
      new Notification(title, {
        body: options?.body,
        tag: options?.tag,
        icon: "/favicon.ico",
      });
    } catch (e) {
      console.debug("Browser notification invocation failed:", e);
    }
  }
}

/**
 * Triggered when a Focus Mode session finishes
 */
export function notifyFocusTimerFinished(mode: "focus" | "break"): void {
  const settings = getNotificationSettings();

  if (settings.soundEnabled) {
    playSessionEndChime();
  }

  if (!settings.focusTimerAlertEnabled) {
    return;
  }

  const isFocus = mode === "focus";
  const title = isFocus ? "Sesi Fokus Selesai! 🎉" : "Sesi Istirahat Selesai! ⚡";
  const message = isFocus
    ? "Kerja bagus! Waktunya beristirahat sejenak untuk memulihkan energi."
    : "Waktu istirahat selesai. Siap melanjutkan sesi fokus berikutnya?";

  // 1. Native browser notification
  triggerBrowserNotification(title, {
    body: message,
    tag: "dsl-focus-timer",
  });

  // 2. In-app toast banner
  emitInAppToast({
    title,
    message,
    type: "timer",
  });
}

/**
 * Reads alerted event keys from localStorage
 */
function getAlertedReminders(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(ALERTED_REMINDERS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveAlertedReminder(key: string): void {
  if (typeof window === "undefined") return;
  try {
    const set = getAlertedReminders();
    set.add(key);
    // Keep set to a reasonable max size (last 200 items)
    const arr = Array.from(set).slice(-200);
    window.localStorage.setItem(ALERTED_REMINDERS_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error("Gagal menyimpan riwayat pengingat:", e);
  }
}

/**
 * Periodically called to check upcoming agenda events with reminder settings
 */
export function checkAgendaReminders(events: CalendarEvent[]): void {
  const settings = getNotificationSettings();
  if (!settings.agendaRemindersEnabled) return;

  const now = Date.now();
  const alertedSet = getAlertedReminders();

  for (const event of events) {
    if (typeof event.reminderMinutes !== "number" || event.reminderMinutes < 0) {
      continue;
    }

    // Determine target event start time
    const timeString = event.startTime || "08:00";
    const eventDateTimeStr = `${event.date}T${timeString}:00`;
    const eventTimeMs = new Date(eventDateTimeStr).getTime();

    if (isNaN(eventTimeMs)) continue;

    // Reminder fires at: eventTimeMs - (reminderMinutes * 60 * 1000)
    const reminderTriggerMs = eventTimeMs - event.reminderMinutes * 60 * 1000;
    const alertKey = `${event.id}_${event.reminderMinutes}_${event.date}`;

    // If current time is within [reminderTriggerMs, reminderTriggerMs + 10 minutes window]
    const windowMs = 10 * 60 * 1000;
    if (now >= reminderTriggerMs && now <= reminderTriggerMs + windowMs) {
      if (!alertedSet.has(alertKey)) {
        saveAlertedReminder(alertKey);

        const typeLabel = EVENT_TYPE_LABELS[event.type] || "Agenda";
        const reminderDesc =
          event.reminderMinutes === 0
            ? "sedang dimulai sekarang"
            : `akan dimulai dalam ${event.reminderMinutes} menit (${timeString} WIB)`;

        const title = `Pengingat: ${event.title}`;
        const message = `${typeLabel} ${reminderDesc}.`;

        if (settings.soundEnabled) {
          playReminderChime();
        }

        triggerBrowserNotification(title, {
          body: message,
          tag: `dsl-reminder-${event.id}`,
        });

        emitInAppToast({
          title,
          message,
          type: "reminder",
        });
      }
    }
  }
}

