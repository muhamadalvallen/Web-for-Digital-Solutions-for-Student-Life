"use client";

import { useSyncExternalStore } from "react";
import { FOCUS_PRESETS } from "@/types/focus";
import {
  getTimerSnapshot,
  getServerTimerSnapshot,
  subscribeTimerStore,
  startTimerAction,
  pauseTimerAction,
  resumeTimerAction,
  resetTimerAction,
  switchModeAction,
  selectPresetAction,
} from "@/lib/focus-timer-store";

export function useFocusTimer() {
  const state = useSyncExternalStore(
    subscribeTimerStore,
    getTimerSnapshot,
    getServerTimerSnapshot
  );

  const preset = FOCUS_PRESETS[state.presetId];
  const minutes = Math.floor(state.remainingSeconds / 60);
  const seconds = state.remainingSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const progressRatio =
    state.totalSeconds > 0
      ? (state.totalSeconds - state.remainingSeconds) / state.totalSeconds
      : 0;

  return {
    preset,
    presetId: state.presetId,
    mode: state.mode,
    status: state.status,
    remainingSeconds: state.remainingSeconds,
    totalSeconds: state.totalSeconds,
    formattedMinutes,
    formattedSeconds,
    progressRatio,
    completedFocusCount: state.completedFocusCount,
    startTimer: startTimerAction,
    pauseTimer: pauseTimerAction,
    resumeTimer: resumeTimerAction,
    resetTimer: resetTimerAction,
    switchMode: switchModeAction,
    selectPreset: selectPresetAction,
  };
}
