"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { CalendarEvent } from "@/types/calendar";
import { useCalendarEvents, CreateEventInput } from "@/hooks/use-calendar-events";
import { EventFilter } from "@/components/calendar/event-filter";
import { EventCard } from "@/components/calendar/event-card";
import { EventEmptyState } from "@/components/calendar/event-empty-state";
import { EventFormModal } from "@/components/calendar/event-form-modal";
import { CalendarMonthView } from "@/components/calendar/calendar-month-view";
import { SelectedDateAgenda } from "@/components/calendar/selected-date-agenda";
import { NotificationSettingsModal } from "@/components/notifications/notification-settings-modal";
import { getTodayDateString } from "@/lib/date-utils";

type CalendarViewTab = "calendar" | "list";

export default function CalendarPage() {
  const {
    events,
    filteredEvents,
    counts,
    filter,
    setFilter,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarEvents();

  const todayStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const initialDateObj = new Date();
  const [viewYear, setViewYear] = useState<number>(initialDateObj.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDateObj.getMonth());

  const [activeTab, setActiveTab] = useState<CalendarViewTab>("calendar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [modalDefaultDate, setModalDefaultDate] = useState<string>(todayStr);

  const handleOpenAddModal = (dateToUse?: string) => {
    setEditingEvent(null);
    setModalDefaultDate(dateToUse || selectedDate || todayStr);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalDefaultDate(event.date);
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
      // Select the newly added date to immediately reveal the new agenda
      setSelectedDate(data.date);
      const [year, month] = data.date.split("-").map(Number);
      if (year && month) {
        setViewYear(year);
        setViewMonth(month - 1);
      }
    }
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setSelectedDate(todayStr);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  };

  return (
    <>
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Kalender Akademik"
          description="Kelola jadwal kelas, tugas kuliah, jadwal ujian, dan agenda pribadi kamu dalam satu tempat."
        />
        <div className="flex items-center gap-2 shrink-0 pt-0 sm:pt-1">
          <button
            type="button"
            onClick={() => setIsNotificationModalOpen(true)}
            title="Pengaturan Notifikasi Pengingat"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent shadow-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="hidden sm:inline">Pengingat</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAddModal(selectedDate)}
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

      {/* View Switcher Controls */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-surface p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("calendar")}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "calendar"
                ? "bg-foreground text-surface shadow-xs"
                : "text-muted hover:text-foreground"
            }`}
          >
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Tampilan Kalender
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "list"
                ? "bg-foreground text-surface shadow-xs"
                : "text-muted hover:text-foreground"
            }`}
          >
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Semua Agenda ({counts.all})
          </button>
        </div>

        {activeTab === "calendar" && (
          <span className="text-xs text-muted">
            Klik salah satu tanggal pada kalender untuk melihat atau menambah agenda.
          </span>
        )}
      </div>

      {/* Main Section Content based on active tab */}
      {activeTab === "calendar" ? (
        <section className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Month Calendar Grid */}
          <div className="lg:col-span-5 xl:col-span-5">
            <CalendarMonthView
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              events={events}
              viewYear={viewYear}
              viewMonth={viewMonth}
              onChangeMonth={(y, m) => {
                setViewYear(y);
                setViewMonth(m);
              }}
              onJumpToToday={handleJumpToToday}
            />
          </div>

          {/* Right Column: Selected Date Agenda Details */}
          <div className="lg:col-span-7 xl:col-span-7">
            <SelectedDateAgenda
              selectedDate={selectedDate}
              events={events}
              onAddEvent={(dt) => handleOpenAddModal(dt)}
              onEditEvent={handleOpenEditModal}
              onDeleteEvent={deleteEvent}
            />
          </div>
        </section>
      ) : (
        <section className="mt-4 flex flex-col gap-4">
          <EventFilter
            selectedFilter={filter}
            counts={counts}
            onSelectFilter={setFilter}
          />

          {filteredEvents.length === 0 ? (
            <EventEmptyState
              filter={filter}
              onResetFilter={() => setFilter("all")}
              onAddEvent={() => handleOpenAddModal(selectedDate)}
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
      )}

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
        defaultDate={modalDefaultDate}
      />

      {/* Modal Pengaturan Notifikasi */}
      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
}
