'use client';

import { type DbGame } from '@/types/game';

import ScoreDisplay from '../ui/score-display';
import WordsUsedCard from '../ui/words-used-card';
import GameInfoNote from '../ui/game-info-note';
import CurrentLetterCard from '../ui/current-letter-card';
import { GAME_TIMERS } from '../../config/constants';
import WordInputForm from '../forms/word-input-form';
import { useTempoModeGame } from '../../hooks/use-tempo-mode-game';
import Timer from '../ui/timer';

type TempoModeClientProps = {
	game: DbGame;
};

const TempoModeClient = ({ game }: TempoModeClientProps) => {
	const {
		snapshot,
		wordInput,
		setWordInput,
		feedback,
		isSubmitting,
		turnTimeLeft,
		gameTimeLeft,
		isGameOver,
		handleSubmitWord
	} = useTempoModeGame(game);

	const wordCount = snapshot.wordsUsed.length;

	if (isGameOver) {
		return (
			<div className="mx-auto max-w-2xl">
				<ScoreDisplay score={snapshot.score} />
				<WordsUsedCard words={snapshot.wordsUsed} />
				<GameInfoNote>
					Time&apos;s up! Final score:{' '}
					<strong>{snapshot.score}</strong> points,{' '}
					<strong>{wordCount}</strong>{' '}
					{wordCount === 1 ? 'word' : 'words'}.
				</GameInfoNote>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl">
			<Timer
				totalSeconds={GAME_TIMERS.DEFAULT_GAME_TIME}
				remainingSeconds={gameTimeLeft}
			/>

			<ScoreDisplay score={snapshot.score} />
			<CurrentLetterCard letter={snapshot.currentLetter} />

			<Timer
				totalSeconds={GAME_TIMERS.DEFAULT_TURN_TIME}
				remainingSeconds={turnTimeLeft}
			/>

			<WordInputForm
				currentLetter={snapshot.currentLetter}
				wordInput={wordInput}
				onWordChange={setWordInput}
				onSubmit={handleSubmitWord}
				isSubmitting={isSubmitting}
				feedback={feedback}
			/>
			<WordsUsedCard words={snapshot.wordsUsed} />
			<GameInfoNote>The faster answer, the more points!</GameInfoNote>
		</div>
	);
};

export default TempoModeClient;
