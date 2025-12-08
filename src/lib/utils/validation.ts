import { LanguageCodeSchema } from '@/modules/game/config/constants';
import { GameModeIdSchema } from '@/modules/game/config/modes';
import { GameProgressSchema, userSchema } from '@/types';
import { IdSchema, NumberSchema, StringSchema } from '@/types/shared';

export const ValidateUser = (user: unknown) =>
	userSchema.safeParse(user).success;

export const ValidateId = (id: unknown) => IdSchema.safeParse(id).success;

export const ValidateGameModeId = (id: unknown) =>
	GameModeIdSchema.safeParse(id).success;

export const ValidateLanguageCode = (lang: unknown) =>
	LanguageCodeSchema.safeParse(lang).success;

export const ValidateNumber = (n: unknown) => NumberSchema.safeParse(n).success;

export const ValidateString = (s: unknown) => StringSchema.safeParse(s).success;

export const ValidateGameProgress = (data: unknown) =>
	GameProgressSchema.safeParse(data).success;
