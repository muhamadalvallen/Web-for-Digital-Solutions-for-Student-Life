"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { CalendarEvent } from "@/types/calendar";
import { useCalendarEvents, CreateEventInput } from "@/hooks/use-calendar-events";
import { EventFilter } from "@/components/calendar/event-filter";
import { EventCard } from "@/components/calendar/event-card";
import { EventEmptyState } from "@/components/calendar/event-empty-state";
import { EventFormModal } from "@/components/calendar/event-form-modal";

export default function CalendarPage() {
  const {
    filteredEvents,
    counts,
    filter,
    setFilter,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarEvents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmitForm = (data: CreateEventInput) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Kalender Akademik"
          description="Kelola jadwal kelas, tugas kuliah, jadwal ujian, dan agenda pribadi kamu dalam satu tempat."
        />
        <div className="shrink-0 pt-0 sm:pt-1">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-xs transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Agenda
          </button>
        </div>
      </div>

      {/* Filter and stats */}
      <section className="mt-4 flex flex-col gap-4">
        <EventFilter
          selectedFilter={filter}
          counts={counts}
          onSelectFilter={setFilter}
        />

        {/* Content Area */}
        {filteredEvents.length === 0 ? (
          <EventEmptyState
            filter={filter}
            onResetFilter={() => setFilter("all")}
            onAddEvent={handleOpenAddModal}
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {filter === "all"
                  ? `Semua Agenda (${filteredEvents.length})`
                  : `Agenda ${filter} (${filteredEvents.length})`}
              </span>
              <span className="text-xs text-muted">
                Diurutkan berdasarkan tanggal & jam
              </span>
            </div>

            <div className="grid gap-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleOpenEditModal}
                  onDelete={deleteEvent}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Persistence info banner */}
      <footer className="mt-8 border-t border-border/70 pt-4 text-xs text-muted">
        <p className="flex items-center gap-1.5">
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
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Data agenda tersimpan otomatis di penyimpanan lokal (localStorage) browser ini.
        </p>
      </footer>

      {/* Modal Tambah / Edit */}
      <EventFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
        initialEvent={editingEvent}
      />
    </>
  );
}
