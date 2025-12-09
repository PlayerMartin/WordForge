'use client';

import { type DbGame } from '@/types/game';
import ScoreDisplay from '@/modules/game/components/ui/score-display';
import CurrentLetterCard from '@/modules/game/components/ui/current-letter-card';
import WordInputForm from '@/modules/game/components/forms/word-input-form';
import WordsUsedCard from '@/modules/game/components/ui/words-used-card';
import GameInfoNote from '@/modules/game/components/ui/game-info-note';
import Timer from '@/modules/game/components/ui/timer';
import { GAME_TIMERS } from '@/modules/game/config/constants';
import { Button } from '@/components/ui';

import { usePlayAgain } from '../hooks/use-play-again';
import { useWordGame } from '../hooks/use-word-game';

import HeartsDisplay from './ui/hearts-display';

type Props = {
	game: DbGame;
};

const GameClient = ({ game }: Props) => {
	const {
		snapshot,
		wordInput,
		setWordInput,
		feedback,
		isSubmitting,
		turnTimeLeft,
		gameTimeLeft,
		hasGameTimer,
		bottomNote,
		heartsLeft,
		isGameOver,
		handleSubmitWord
	} = useWordGame(game);
	const { isStarting, handlePlayAgain } = usePlayAgain(game);

	const wordCount = snapshot.wordsUsed.length;

	if (isGameOver) {
		return (
			<div className="mx-auto max-w-2xl text-center">
				<ScoreDisplay score={snapshot.score} />
				<WordsUsedCard words={snapshot.wordsUsed} />
				<GameInfoNote>
					Time&apos;s up! Final score:{' '}
					<strong>{snapshot.score}</strong> points,{' '}
					<strong>{wordCount}</strong>{' '}
					{wordCount === 1 ? 'word' : 'words'}.
				</GameInfoNote>

				<div className="mt-10 flex justify-center">
					<Button
						type="button"
						variant="primary"
						className="px-8 py-3 text-lg"
						onClick={isStarting ? undefined : handlePlayAgain}
						disabled={isStarting}
					>
						{isStarting ? 'Starting...' : 'Play Again'}
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl">
			{game.mode === 'solo_hidden' && heartsLeft !== null && (
				<HeartsDisplay heartsLeft={heartsLeft} />
			)}

			{hasGameTimer && gameTimeLeft !== null && (
				<Timer
					totalSeconds={GAME_TIMERS.DEFAULT_GAME_TIME}
					remainingSeconds={gameTimeLeft}
				/>
			)}

			<ScoreDisplay score={snapshot.score} />
			<CurrentLetterCard
				letter={snapshot.currentLetter}
				challengePart={snapshot.challengePart}
			/>

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

			{game.mode !== 'solo_hidden' && (
				<WordsUsedCard words={snapshot.wordsUsed} />
			)}

			<GameInfoNote>{bottomNote}</GameInfoNote>
		</div>
	);
};

export default GameClient;
