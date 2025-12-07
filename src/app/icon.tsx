import { ImageResponse } from 'next/og';

export const size = {
	width: 32,
	height: 32
};
export const contentType = 'image/png';

const Icon = () =>
	new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
				boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
			}}
		>
			<span
				style={{
					color: '#ffffff',
					fontWeight: 900,
					fontSize: 18,
					letterSpacing: '-0.05em',
					textShadow: '0 1px 2px rgba(0,0,0,0.4)'
				}}
			>
				WF
			</span>
		</div>,
		{ ...size }
	);

export default Icon;
