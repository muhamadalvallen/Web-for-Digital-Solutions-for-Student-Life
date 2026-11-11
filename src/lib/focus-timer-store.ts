import {
  FocusMode,
  FocusPresetId,
  TimerStatus,
  FOCUS_PRESETS,
} from "@/types/focus";
import { playSessionEndChime } from "@/lib/audio-chime";

export const FOCUS_STORAGE_KEY = "dsl:focus-timer-state";

export type FocusTimerStoreState = {
  presetId: FocusPresetId;
  mode: FocusMode;
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
  targetDeadlineMs: number | null;
  completedFocusCount: number;
};

const DEFAULT_PRESET_ID: FocusPresetId = "pomodoro";
const DEFAULT_TOTAL_SECONDS = FOCUS_PRESETS[DEFAULT_PRESET_ID].focusMinutes * 60;

const DEFAULT_STATE: FocusTimerStoreState = {
  presetId: DEFAULT_PRESET_ID,
  mode: "focus",
  status: "idle",
  remainingSeconds: DEFAULT_TOTAL_SECONDS,
  totalSeconds: DEFAULT_TOTAL_SECONDS,
  targetDeadlineMs: null,
  completedFocusCount: 0,
};

let storeState: FocusTimerStoreState = { ...DEFAULT_STATE };
let isInitialized = false;
let activeInterval: NodeJS.Timeout | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error("Error in timer listener:", e);
    }
  });
}

function updateDocumentTitle(state: FocusTimerStoreState) {
  if (typeof document === "undefined") return;

  if (state.status === "running" || state.status === "paused") {
    const minutes = Math.floor(state.remainingSeconds / 60);
    const seconds = state.remainingSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    const modeLabel = state.mode === "focus" ? "Fokus" : "Istirahat";
    const statusIcon = state.status === "paused" ? "⏸" : "⏳";
    document.title = `${statusIcon} (${formattedTime}) ${modeLabel} | Digital Solutions`;
  } else {
    document.title = "Digital Solutions for Student Life";
  }
}

function persistState() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(storeState));
  } catch (err) {
    console.error("Gagal menyimpan state timer ke localStorage:", err);
  }
}

function stopCountdownInterval() {
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
}

function startCountdownInterval() {
  stopCountdownInterval();

  activeInterval = setInterval(() => {
    if (storeState.status !== "running" || !storeState.targetDeadlineMs) {
      stopCountdownInterval();
      return;
    }

    const diffMs = storeState.targetDeadlineMs - Date.now();
    const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));

    if (secondsLeft <= 0) {
      stopCountdownInterval();
      const nextCount =
        storeState.mode === "focus"
          ? storeState.completedFocusCount + 1
          : storeState.completedFocusCount;

      storeState = {
        ...storeState,
        status: "completed",
        remainingSeconds: 0,
        targetDeadlineMs: null,
        completedFocusCount: nextCount,
      };

      persistState();
      updateDocumentTitle(storeState);
      playSessionEndChime();
      notifyListeners();
    } else if (secondsLeft !== storeState.remainingSeconds) {
      storeState = {
        ...storeState,
        remainingSeconds: secondsLeft,
      };
      updateDocumentTitle(storeState);
      notifyListeners();
    }
  }, 250);
}

export function initTimerStore(): void {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  try {
    const raw = window.localStorage.getItem(FOCUS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FocusTimerStoreState>;
      const presetId = parsed.presetId && FOCUS_PRESETS[parsed.presetId] ? parsed.presetId : DEFAULT_PRESET_ID;
      const mode = parsed.mode === "break" ? "break" : "focus";
      const preset = FOCUS_PRESETS[presetId];
      const totalSeconds = (mode === "focus" ? preset.focusMinutes : preset.breakMinutes) * 60;
      const completedFocusCount = typeof parsed.completedFocusCount === "number" ? parsed.completedFocusCount : 0;

      if (parsed.status === "running" && parsed.targetDeadlineMs) {
        const diffMs = parsed.targetDeadlineMs - Date.now();
        const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));

        if (secondsLeft > 0) {
          storeState = {
            presetId,
            mode,
            status: "running",
            remainingSeconds: secondsLeft,
            totalSeconds,
            targetDeadlineMs: parsed.targetDeadlineMs,
            completedFocusCount,
          };
          startCountdownInterval();
        } else {
          storeState = {
            presetId,
            mode,
            status: "completed",
            remainingSeconds: 0,
            totalSeconds,
            targetDeadlineMs: null,
            completedFocusCount: mode === "focus" ? completedFocusCount + 1 : completedFocusCount,
          };
        }
      } else if (parsed.status === "paused") {
        const remaining = typeof parsed.remainingSeconds === "number" ? Math.min(parsed.remainingSeconds, totalSeconds) : totalSeconds;
        storeState = {
          presetId,
          mode,
          status: "paused",
          remainingSeconds: remaining,
          totalSeconds,
          targetDeadlineMs: null,
          completedFocusCount,
        };
      } else if (parsed.status === "completed") {
        storeState = {
          presetId,
          mode,
          status: "completed",
          remainingSeconds: 0,
          totalSeconds,
          targetDeadlineMs: null,
          completedFocusCount,
        };
      } else {
        storeState = {
          presetId,
          mode,
          status: "idle",
          remainingSeconds: totalSeconds,
          totalSeconds,
          targetDeadlineMs: null,
          completedFocusCount,
        };
      }
    }
  } catch (e) {
    console.error("Gagal menginisialisasi timer dari localStorage:", e);
    storeState = { ...DEFAULT_STATE };
  }

  updateDocumentTitle(storeState);
}

export function getTimerSnapshot(): FocusTimerStoreState {
  if (typeof window !== "undefined" && !isInitialized) {
    initTimerStore();
  }
  return storeState;
}

export function getServerTimerSnapshot(): FocusTimerStoreState {
  return DEFAULT_STATE;
}

export function subscribeTimerStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function startTimerAction(): void {
  if (typeof window !== "undefined" && !isInitialized) initTimerStore();

  const deadline = Date.now() + storeState.remainingSeconds * 1000;
  storeState = {
    ...storeState,
    status: "running",
    targetDeadlineMs: deadline,
  };
  persistState();
  updateDocumentTitle(storeState);
  startCountdownInterval();
  notifyListeners();
}

export function pauseTimerAction(): void {
  stopCountdownInterval();
  let remaining = storeState.remainingSeconds;
  if (storeState.targetDeadlineMs) {
    const diffMs = storeState.targetDeadlineMs - Date.now();
    remaining = Math.max(0, Math.ceil(diffMs / 1000));
  }

  storeState = {
    ...storeState,
    status: "paused",
    remainingSeconds: remaining,
    targetDeadlineMs: null,
  };
  persistState();
  updateDocumentTitle(storeState);
  notifyListeners();
}

export function resumeTimerAction(): void {
  startTimerAction();
}

export function resetTimerAction(): void {
  stopCountdownInterval();
  storeState = {
    ...storeState,
    status: "idle",
    remainingSeconds: storeState.totalSeconds,
    targetDeadlineMs: null,
  };
  persistState();
  updateDocumentTitle(storeState);
  notifyListeners();
}

export function switchModeAction(nextMode?: FocusMode): void {
  stopCountdownInterval();
  const target = nextMode ?? (storeState.mode === "focus" ? "break" : "focus");
  const preset = FOCUS_PRESETS[storeState.presetId];
  const totalSeconds = (target === "focus" ? preset.focusMinutes : preset.breakMinutes) * 60;

  storeState = {
    ...storeState,
    mode: target,
    status: "idle",
    remainingSeconds: totalSeconds,
    totalSeconds,
    targetDeadlineMs: null,
  };
  persistState();
  updateDocumentTitle(storeState);
  notifyListeners();
}

export function selectPresetAction(newPresetId: FocusPresetId): void {
  if (newPresetId === storeState.presetId) return;
  stopCountdownInterval();
  const preset = FOCUS_PRESETS[newPresetId];
  const totalSeconds = (storeState.mode === "focus" ? preset.focusMinutes : preset.breakMinutes) * 60;

  storeState = {
    ...storeState,
    presetId: newPresetId,
    status: "idle",
    remainingSeconds: totalSeconds,
    totalSeconds,
    targetDeadlineMs: null,
  };
  persistState();
  updateDocumentTitle(storeState);
  notifyListeners();
}

