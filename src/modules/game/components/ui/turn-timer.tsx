// modules/game/components/ui/turn-timer.tsx
"use client";

type TurnTimerProps = {
  totalSeconds: number;
  remainingSeconds: number;
};

const TurnTimer = ({ totalSeconds, remainingSeconds }: TurnTimerProps) => {
  if (totalSeconds <= 0) return null;

  const safeRemaining = Math.max(0, remainingSeconds);
  const ratio = safeRemaining / totalSeconds;
  const percent = Math.round(ratio * 100);

  const isLow = ratio <= 0.25; // last 25% = "danger" zone

  return (
    <div className="mb-6">
      {/* Numeric display */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xs uppercase tracking-widest text-surface-500">
          Time left
        </span>
        <span
          className={`text-2xl font-semibold tabular-nums ${
            isLow ? "text-error-500" : "text-primary-600"
          }`}
        >
          {safeRemaining}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLow ? "bg-error-500" : "bg-primary-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Subtle hint text */}
      <p className="mt-1 text-[11px] text-center text-surface-400">
        Answer before the bar runs out.
      </p>
    </div>
  );
};

export default TurnTimer;
