/**
 * Plays a gentle, pleasant two-tone chime using Web Audio API
 * No external audio files or dependencies required.
 */
export function playSessionEndChime(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Two pleasant sine notes: C5 (523Hz) then E5 (659Hz)
    const playTone = (freq: number, startDelay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

      // Smooth attack and decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime + startDelay);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + startDelay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startDelay);
      osc.stop(ctx.currentTime + startDelay + duration);
    };

    playTone(523.25, 0, 0.4); // C5
    playTone(659.25, 0.25, 0.6); // E5
  } catch (error) {
    // Audio might be blocked if no user interaction yet, silently ignore
    console.debug("Audio notification could not play:", error);
  }
}

