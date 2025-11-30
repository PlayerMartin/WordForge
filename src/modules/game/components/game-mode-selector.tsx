// modules/game/components/game-mode-selector.tsx
"use client";

import { Card } from "@/components/ui";
import { GAME_MODES, GameModeId } from "@/modules/game/config/modes";

type Props = {
  selectedModeId: GameModeId;
  onChange: (modeId: GameModeId) => void;
};

const GameModeSelector = ({ selectedModeId, onChange }: Props) => {
  return (
    <div
      className="flex flex-col gap-4"
      role="radiogroup"
      aria-label="Game modes"
    >
      {GAME_MODES.map((mode) => {
        const isSelected = selectedModeId === mode.id;

        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onChange(mode.id)}
            role="radio"
            aria-checked={isSelected}
            className="text-left"
          >
            <Card
              hover
              className={[
                "border-l-4 bg-surface-900 transition-all",
                mode.borderColor,
                isSelected
                  ? "ring-2 ring-primary-400 border-primary-500 scale-[1.01]"
                  : "border-transparent hover:border-surface-700",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {mode.title}
                  </h3>
                  <p className="text-surface-300 text-sm">
                    {mode.description}
                  </p>
                </div>

                {/* Selection indicator */}
                <span
                  className={[
                    "flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold",
                    isSelected
                      ? "bg-primary-500 border-primary-500 text-white"
                      : "border-surface-500 text-surface-500",
                  ].join(" ")}
                >
                  {isSelected ? "✓" : ""}
                </span>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};

export default GameModeSelector;
