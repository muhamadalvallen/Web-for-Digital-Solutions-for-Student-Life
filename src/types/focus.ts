export type FocusPresetId = "pomodoro" | "deep-work";

export type FocusMode = "focus" | "break";

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export type FocusPreset = {
  id: FocusPresetId;
  name: string;
  description: string;
  focusMinutes: number;
  breakMinutes: number;
};

export const FOCUS_PRESETS: Record<FocusPresetId, FocusPreset> = {
  pomodoro: {
    id: "pomodoro",
    name: "Pomodoro",
    description: "25 menit fokus, 5 menit istirahat. Cocok untuk tugas rutin dan menjaga konsentrasi berkelanjutan.",
    focusMinutes: 25,
    breakMinutes: 5,
  },
  "deep-work": {
    id: "deep-work",
    name: "Deep Work",
    description: "50 menit fokus, 10 menit istirahat. Ideal untuk materi rumit, coding, atau penulisan intensif.",
    focusMinutes: 50,
    breakMinutes: 10,
  },
};

