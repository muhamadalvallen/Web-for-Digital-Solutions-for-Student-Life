"use client";

import { useEffect } from "react";
import { useCalendarEvents } from "@/hooks/use-calendar-events";
import { checkAgendaReminders } from "@/lib/notification-service";
import { ToastContainer } from "./toast-container";

export function NotificationReminderWatcher() {
  const { events } = useCalendarEvents();

  useEffect(() => {
    // Initial check
    checkAgendaReminders(events);

    // Periodic check every 15 seconds
    const interval = setInterval(() => {
      checkAgendaReminders(events);
    }, 15000);

    return () => clearInterval(interval);
  }, [events]);

  return <ToastContainer />;
}
