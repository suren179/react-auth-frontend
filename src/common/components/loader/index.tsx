import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

interface Props {
	backdrop?: boolean;
}
const Loader = ({ backdrop = true }: Props) => {
	const CustomLoaderJSX = (
		<>
			<svg width={0} height={0}>
				<defs>
					<linearGradient
						id="my_gradient"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%"
					>
						<stop offset="0%" stopColor="#e01cd5" />
						<stop offset="100%" stopColor="#1CB5E0" />
					</linearGradient>
				</defs>
			</svg>
			<CircularProgress
				sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
			/>
		</>
	);
	return (
		<>
			{backdrop ? (
				<>
					<Backdrop open={true}>{CustomLoaderJSX}</Backdrop>
				</>
			) : (
				<>{CustomLoaderJSX}</>
			)}
		</>
	);
};

export default Loader;
