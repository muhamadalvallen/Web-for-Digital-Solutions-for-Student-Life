"use client";

import { useState, useMemo, useCallback, useSyncExternalStore } from "react";
import {
  CalendarEvent,
  CalendarEventType,
  CalendarFilterType,
} from "@/types/calendar";
import {
  getStoredCalendarEvents,
  saveStoredCalendarEvents,
  subscribeCalendarEvents,
} from "@/lib/calendar-storage";

export type CreateEventInput = {
  title: string;
  type: CalendarEventType;
  date: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
  reminderMinutes?: number;
};

export type UpdateEventInput = Partial<CreateEventInput>;

function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

const EMPTY_EVENTS: CalendarEvent[] = [];

function getServerSnapshot(): CalendarEvent[] {
  return EMPTY_EVENTS;
}

export function useCalendarEvents() {
  const events = useSyncExternalStore(
    subscribeCalendarEvents,
    getStoredCalendarEvents,
    getServerSnapshot
  );

  const [filter, setFilter] = useState<CalendarFilterType>("all");

  const addEvent = useCallback((input: CreateEventInput): CalendarEvent => {
    const now = new Date().toISOString();
    const newEvent: CalendarEvent = {
      id: generateEventId(),
      title: input.title.trim(),
      type: input.type,
      date: input.date,
      startTime: input.startTime?.trim() || undefined,
      endTime: input.endTime?.trim() || undefined,
      notes: input.notes?.trim() || undefined,
      reminderMinutes:
        typeof input.reminderMinutes === "number" && input.reminderMinutes >= 0
          ? input.reminderMinutes
          : undefined,
      createdAt: now,
      updatedAt: now,
    };

    const current = getStoredCalendarEvents();
    saveStoredCalendarEvents([...current, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback(
    (id: string, updates: UpdateEventInput): boolean => {
      let updated = false;
      const now = new Date().toISOString();
      const current = getStoredCalendarEvents();

      const next = current.map((event) => {
        if (event.id !== id) return event;
        updated = true;
        return {
          ...event,
          ...(updates.title !== undefined && { title: updates.title.trim() }),
          ...(updates.type !== undefined && { type: updates.type }),
          ...(updates.date !== undefined && { date: updates.date }),
          ...(updates.startTime !== undefined && {
            startTime: updates.startTime.trim() || undefined,
          }),
          ...(updates.endTime !== undefined && {
            endTime: updates.endTime.trim() || undefined,
          }),
          ...(updates.notes !== undefined && {
            notes: updates.notes.trim() || undefined,
          }),
          ...(updates.reminderMinutes !== undefined && {
            reminderMinutes:
              updates.reminderMinutes >= 0 ? updates.reminderMinutes : undefined,
          }),
          updatedAt: now,
        };
      });

      if (updated) {
        saveStoredCalendarEvents(next);
      }
      return updated;
    },
    []
  );

  const deleteEvent = useCallback((id: string): boolean => {
    let deleted = false;
    const current = getStoredCalendarEvents();
    const next = current.filter((event) => {
      if (event.id === id) {
        deleted = true;
        return false;
      }
      return true;
    });

    if (deleted) {
      saveStoredCalendarEvents(next);
    }
    return deleted;
  }, []);

  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.type === filter);
  }, [events, filter]);

  // Counts per type for filter badges
  const counts = useMemo(() => {
    const res: Record<CalendarFilterType, number> = {
      all: events.length,
      class: 0,
      assignment: 0,
      exam: 0,
      personal: 0,
    };
    for (const evt of events) {
      if (res[evt.type] !== undefined) {
        res[evt.type]++;
      }
    }
    return res;
  }, [events]);

  return {
    events,
    filteredEvents,
    counts,
    filter,
    setFilter,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}
