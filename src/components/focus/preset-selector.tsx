import { FocusPresetId, FOCUS_PRESETS } from "@/types/focus";

export function PresetSelector({
  selectedPresetId,
  isDisabled,
  onSelectPreset,
}: {
  selectedPresetId: FocusPresetId;
  isDisabled: boolean;
  onSelectPreset: (presetId: FocusPresetId) => void;
}) {
  const presets = Object.values(FOCUS_PRESETS);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {presets.map((preset) => {
        const isSelected = selectedPresetId === preset.id;

        return (
          <button
            key={preset.id}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectPreset(preset.id)}
            className={`group flex flex-col text-left rounded-2xl border p-5 transition-all ${
              isSelected
                ? "border-accent bg-surface shadow-xs ring-2 ring-accent/20"
                : "border-border bg-surface/70 hover:border-border hover:bg-surface"
            } ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-base font-semibold text-foreground flex items-center gap-2">
                {preset.name}
                {isSelected && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                    Aktif
                  </span>
                )}
              </span>
              <span className="text-xs font-medium text-muted">
                {preset.focusMinutes}m fokus / {preset.breakMinutes}m istirahat
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted">
              {preset.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

