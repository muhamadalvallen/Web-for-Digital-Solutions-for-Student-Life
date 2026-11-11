"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  FocusMode,
  FocusPresetId,
  TimerStatus,
  FOCUS_PRESETS,
} from "@/types/focus";
import { playSessionEndChime } from "@/lib/audio-chime";

export function useFocusTimer() {
  const [presetId, setPresetId] = useState<FocusPresetId>("pomodoro");
  const [mode, setMode] = useState<FocusMode>("focus");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [completedFocusCount, setCompletedFocusCount] = useState<number>(0);

  const preset = FOCUS_PRESETS[presetId];
  const targetMinutes = mode === "focus" ? preset.focusMinutes : preset.breakMinutes;
  const totalSeconds = targetMinutes * 60;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(totalSeconds);

  // Timestamp deadline in milliseconds when running
  const deadlineRef = useRef<number | null>(null);

  // Sync remainingSeconds when preset or mode changes while idle or completed
  const syncTotalSeconds = useCallback(
    (newPresetId: FocusPresetId, newMode: FocusMode) => {
      const p = FOCUS_PRESETS[newPresetId];
      const mins = newMode === "focus" ? p.focusMinutes : p.breakMinutes;
      setRemainingSeconds(mins * 60);
    },
    []
  );

  // Start timer
  const startTimer = useCallback(() => {
    deadlineRef.current = Date.now() + remainingSeconds * 1000;
    setStatus("running");
  }, [remainingSeconds]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (deadlineRef.current) {
      const diffMs = deadlineRef.current - Date.now();
      const currentRemaining = Math.max(0, Math.ceil(diffMs / 1000));
      setRemainingSeconds(currentRemaining);
    }
    deadlineRef.current = null;
    setStatus("paused");
  }, []);

  // Resume timer
  const resumeTimer = useCallback(() => {
    deadlineRef.current = Date.now() + remainingSeconds * 1000;
    setStatus("running");
  }, [remainingSeconds]);

  // Reset timer
  const resetTimer = useCallback(() => {
    deadlineRef.current = null;
    setStatus("idle");
    setRemainingSeconds(totalSeconds);
  }, [totalSeconds]);

  // Switch between Focus and Break modes
  const switchMode = useCallback(
    (nextMode?: FocusMode) => {
      const target = nextMode ?? (mode === "focus" ? "break" : "focus");
      deadlineRef.current = null;
      setMode(target);
      setStatus("idle");
      syncTotalSeconds(presetId, target);
    },
    [mode, presetId, syncTotalSeconds]
  );

  // Change preset (Pomodoro vs Deep Work)
  const selectPreset = useCallback(
    (newPresetId: FocusPresetId) => {
      if (newPresetId === presetId) return;
      deadlineRef.current = null;
      setPresetId(newPresetId);
      setStatus("idle");
      syncTotalSeconds(newPresetId, mode);
    },
    [presetId, mode, syncTotalSeconds]
  );

  // Main countdown interval based on wall-clock timestamp/deadline
  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      if (!deadlineRef.current) return;

      const diffMs = deadlineRef.current - Date.now();
      const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));

      if (secondsLeft <= 0) {
        deadlineRef.current = null;
        setRemainingSeconds(0);
        setStatus("completed");
        playSessionEndChime();

        if (mode === "focus") {
          setCompletedFocusCount((prev) => prev + 1);
        }
      } else {
        setRemainingSeconds(secondsLeft);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [status, mode]);

  // Update document title with remaining time while running or paused
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (status === "running" || status === "paused") {
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      const modeLabel = mode === "focus" ? "Fokus" : "Istirahat";
      const statusIcon = status === "paused" ? "⏸" : "⏳";
      document.title = `${statusIcon} (${formattedTime}) ${modeLabel} | Digital Solutions`;
    } else {
      document.title = "Mode Fokus | Digital Solutions for Student Life";
    }

    return () => {
      document.title = "Digital Solutions for Student Life";
    };
  }, [status, remainingSeconds, mode]);

  // Formatted display values
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const progressRatio = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;

  return {
    preset,
    presetId,
    mode,
    status,
    remainingSeconds,
    totalSeconds,
    formattedMinutes,
    formattedSeconds,
    progressRatio,
    completedFocusCount,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    switchMode,
    selectPreset,
  };
}
