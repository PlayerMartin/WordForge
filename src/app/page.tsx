import { MainTopTextSection, LanguageSection } from '@/modules/home/components';
import { GameStartSection } from '@/modules/home/components/game-start-section';

const Home = () => {
	return (
		<>
			<div className="mx-auto mb-4 max-w-5xl text-center">
				<MainTopTextSection />
				<GameStartSection />
			</div>

			<LanguageSection />
		</>
	);
};

export default Home;
