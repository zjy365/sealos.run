import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import React from 'react';

type AppBoxState = 'idle' | 'active';

interface AppBoxSvgProps {
	height: number;
	boxBgGradient: { from: string; to: string };
	boxFrameGradient: { from: string; to: string };
	boxStroke: string;
	defaultBgColor: string;
	defaultStrokeColor: string;
	defaultFrameGradient: { from: string; to: string };
	idleIcon?: React.ReactNode;
	activeIcon?: React.ReactNode;
	className?: string;
	title: string;
	state: AppBoxState;
}

export const AppBoxSvg: React.FC<AppBoxSvgProps> = ({
	height,
	boxBgGradient,
	boxFrameGradient,
	boxStroke,
	defaultBgColor,
	defaultStrokeColor,
	defaultFrameGradient,
	idleIcon,
	activeIcon,
	className,
	title,
	state,
}) => {
	const id = React.useId();
	const maskId = `${id}-mask`;
	const paintBoxBgId = `${id}-paint_box_bg`;
	const paintBoxFrameForeId = `${id}-paint_box_frame_fore`;

	const activeProgress = useMotionValue(state === 'active' ? 1 : 0);

	// Icon opacity for fade transition
	const idleIconOpacity = useTransform(activeProgress, [0, 1], [1, 0]);
	const activeIconOpacity = useTransform(activeProgress, [0, 1], [0, 1]);

	React.useEffect(() => {
		animate(activeProgress, state === 'active' ? 1 : 0, { duration: 0.3, ease: 'easeOut' });
	}, [state, activeProgress]);

	const bgFromColor = useTransform(activeProgress, [0, 1], [defaultBgColor, boxBgGradient.from]);
	const bgToColor = useTransform(activeProgress, [0, 1], [defaultBgColor, boxBgGradient.to]);
	const strokeColor = useTransform(activeProgress, [0, 1], [defaultStrokeColor, boxStroke]);
	const frameFromColor = useTransform(activeProgress, [0, 1], [defaultFrameGradient.from, boxFrameGradient.from]);
	const frameToColor = useTransform(activeProgress, [0, 1], [defaultFrameGradient.to, boxFrameGradient.to]);

	// Drop shadow opacity transforms
	const activeShadowOpacity = useTransform(activeProgress, [0, 1], [0, 1]);
	const inactiveShadowOpacity = useTransform(activeProgress, [0, 1], [1, 0]);

	return (
		<motion.svg
			viewBox='0 0 152 160'
			width='152'
			height='160'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<title>{title}</title>
			<defs>
				<mask
					id={maskId}
					maskUnits='userSpaceOnUse'
					maskContentUnits='userSpaceOnUse'
				>
					<rect
						x='0'
						y='0'
						width='152'
						height='205'
						fill='white'
					/>
					<path
						d='M 75.6081 131.6828 L 28.1755 104.0239 V 206.6238 H 123.062 V 104.03 Z'
						fill='black'
						stroke='black'
					/>
				</mask>

				<linearGradient
					id={paintBoxBgId}
					x1='73.718'
					y1='136.47'
					x2='76.0007'
					y2='50'
					gradientUnits='userSpaceOnUse'
				>
					<motion.stop stopColor={bgFromColor} />
					<motion.stop
						offset='1'
						stopColor={bgToColor}
					/>
				</linearGradient>

				<linearGradient
					id={paintBoxFrameForeId}
					x1='64.1282'
					y1='68.979'
					x2='40.1748'
					y2='110.467'
					gradientUnits='userSpaceOnUse'
				>
					<motion.stop
						offset='0.134615'
						stopColor={frameFromColor}
					/>
					<motion.stop
						offset='0.903846'
						stopColor={frameToColor}
						stopOpacity='0'
					/>
				</linearGradient>
			</defs>

			{/* Drop Shadow - Inactive */}
			<motion.g
				style={{
					opacity: inactiveShadowOpacity,
				}}
			>
				<path
					fill='#f4f4f5'
					d='m51.13 59.1 50.4-29.39L50.81 0 0 29.58z'
					transform='translate(24.48, 76.379)'
				/>
			</motion.g>

			{/* Drop Shadow - Active */}
			<motion.g
				style={{
					opacity: activeShadowOpacity,
				}}
			>
				<path
					fill='#f4f4f5'
					fillOpacity='0.37'
					stroke='#ccdaff'
					strokeWidth='0.5'
					d='m64.82 74.64 63.4-36.97L64.43.29.5 37.5z'
					transform='translate(10.79, 69.379)'
				/>
			</motion.g>

			<g mask={`url(#${maskId})`}>
				<motion.g
					id='box'
					animate={{
						transform: `translateY(calc(3.42rem + calc(-3.42rem * ${height})))`,
					}}
					transition={{
						duration: 0.3,
						ease: 'easeOut',
					}}
				>
					<motion.path
						id='box_bg'
						d='M75.6081 130.379L28.1755 102.994L28.1755 48.2224L75.6091 20.8366L123.042 48.2218L123.043 102.994L75.6081 130.379Z'
						fill={`url(#${paintBoxBgId})`}
						stroke={strokeColor}
					/>

					<path
						id='box_frame'
						d='M75.8227 131.049L75.8227 75.7307M75.8227 75.7307L28.4804 48.3976M75.8227 75.7307L123.165 48.3976'
						stroke={`url(#${paintBoxFrameForeId})`}
						strokeOpacity='0.3'
						strokeDasharray='2 2'
					/>

					<g id='app_icon'>
						{idleIcon && (
							<motion.g
								style={{
									opacity: idleIconOpacity,
								}}
							>
								<foreignObject
									x='36'
									y='25'
									width='81'
									height='46'
								>
									{idleIcon}
								</foreignObject>
							</motion.g>
						)}
						{activeIcon && (
							<motion.g
								style={{
									opacity: activeIconOpacity,
								}}
							>
								<foreignObject
									x='36'
									y='25'
									width='81'
									height='46'
								>
									{activeIcon}
								</foreignObject>
							</motion.g>
						)}
					</g>
				</motion.g>

				<motion.path
					id='bottom_frame'
					d='M75.6081 130.379 28.1755 102.994M123.043 102.994 75.6081 130.379Z'
					stroke={strokeColor}
				/>
			</g>
		</motion.svg>
	);
};

export default AppBoxSvg;
