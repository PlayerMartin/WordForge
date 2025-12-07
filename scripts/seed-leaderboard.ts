import { db, users, leaderboardEntries } from '../src/lib/db';

const FAKE_NAMES = [
	'WordMaster99',
	'LexiconLord',
	'VocabViking',
	'SpellingBee',
	'GrammarGuru',
	'SyntaxSam',
	'PhrasePhenom',
	'DictionaryDan',
	'AlphabetAce',
	'WordSmith42',
	'LetterLegend',
	'VowelViper',
	'ConsonantKing',
	'SyllableStar',
	'PrefixPro',
	'SuffixSage',
	'RootRider',
	'EtymologyEd',
	'ThesaurusTom',
	'AnagramAnnie'
];

const MODES = ['solo_length', 'solo_tempo', 'solo_hidden'] as const;
const LANGUAGES = ['en'] as const;

async function seed() {
	console.log('Creating fake users...');

	const userIds: string[] = [];

	for (const name of FAKE_NAMES) {
		const existing = await db
			.select({ id: users.id })
			.from(users)
			.where((await import('drizzle-orm')).eq(users.name, name))
			.limit(1);

		if (existing.length > 0) {
			userIds.push(existing[0].id);
			console.log(`User ${name} already exists`);
		} else {
			const result = await db
				.insert(users)
				.values({
					name,
					email: `${name.toLowerCase()}@fake.test`
				})
				.returning({ id: users.id });

			userIds.push(result[0].id);
			console.log(`Created user ${name}`);
		}
	}

	console.log('\nSeeding leaderboard entries...');

	for (const mode of MODES) {
		for (const language of LANGUAGES) {
			for (let i = 0; i < userIds.length; i++) {
				const userId = userIds[i];
				const score = Math.floor(Math.random() * 500) + 50;
				const wordCount = Math.floor(Math.random() * 20) + 5;

				const existing = await db
					.select({ id: leaderboardEntries.id })
					.from(leaderboardEntries)
					.where(
						(await import('drizzle-orm')).and(
							(await import('drizzle-orm')).eq(leaderboardEntries.userId, userId),
							(await import('drizzle-orm')).eq(leaderboardEntries.mode, mode),
							(await import('drizzle-orm')).eq(leaderboardEntries.language, language)
						)
					)
					.limit(1);

				if (existing.length > 0) {
					console.log(`Entry for user ${i + 1} in ${mode}/${language} already exists`);
					continue;
				}

				await db.insert(leaderboardEntries).values({
					userId,
					mode,
					language,
					score,
					wordCount,
					longestWord: 'extraordinary'
				});

				console.log(`Created entry for user ${i + 1} in ${mode}/${language}: ${score} points`);
			}
		}
	}

	console.log('\nDone!');
	process.exit(0);
}

seed().catch(err => {
	console.error('Seed failed:', err);
	process.exit(1);
});
