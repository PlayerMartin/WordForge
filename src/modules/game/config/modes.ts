// modules/game/config/modes.ts
import { GAME_TIMERS } from "./constants";

export type GameModeId = "tempo" | "length" | "open" | "hidden";
export type ScoringMode = "tempo" | "length";
export type VisibilityMode = "open" | "hidden";

export type GameModeConfig = {
  id: GameModeId;
  title: string;
  description: string;
  borderColor: string;

  dbMode: `solo_${GameModeId}`;
  scoringMode: ScoringMode;
  visibilityMode: VisibilityMode;

  defaultTurnTimeLimit: number;
  defaultGlobalTimeLimit: number;
};

export const GAME_MODES: GameModeConfig[] = [
  {
    id: "tempo",
    title: "Tempo Mode",
    description: "Score points based on how fast you answer. Quick thinking wins!",
    borderColor: "border-l-primary-500",

    dbMode: "solo_tempo",
    scoringMode: "tempo",
    visibilityMode: "open",
    defaultTurnTimeLimit: GAME_TIMERS.DEFAULT_TURN_TIME,
    defaultGlobalTimeLimit: 180,
  },
  {
    id: "length",
    title: "Length Mode",
    description: "Longer words = more points. Think of the longest valid word!",
    borderColor: "border-l-secondary-500",

    dbMode: "solo_length",
    scoringMode: "length",
    visibilityMode: "open",
    defaultTurnTimeLimit: -1,
    defaultGlobalTimeLimit: -1,
  },
  {
    id: "open",
    title: "Open Mode",
    description: "See all your previously used words. Plan your strategy!",
    borderColor: "border-l-success-500",

    dbMode: "solo_open",
    scoringMode: "length",
    visibilityMode: "open",
    defaultTurnTimeLimit: -1,
    defaultGlobalTimeLimit: -1,
  },
  {
    id: "hidden",
    title: "Hidden Mode",
    description: "Can't see used words. 3 lives - don't repeat yourself!",
    borderColor: "border-l-warning-500",

    dbMode: "solo_hidden",
    scoringMode: "length",
    visibilityMode: "hidden",
    defaultTurnTimeLimit: -1,
    defaultGlobalTimeLimit: -1,
  },
] as const;

export const GAME_MODE_BY_ID: Record<GameModeId, GameModeConfig> =
  Object.fromEntries(GAME_MODES.map((m) => [m.id, m])) as Record<GameModeId, GameModeConfig>;

export type GameDbMode = (typeof GAME_MODES)[number]["dbMode"];
