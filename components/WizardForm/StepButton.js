const StepButton = ({ stepFunction }) => {
	const svgConfig = {
		moveRight: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={12}
				height={12}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className=''
			>
				<path d='M18 8l4 4-4 4M2 12h20' />
			</svg>
		),
		moveLeft: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={18}
				height={18}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className=''
			>
				<path d='M6 8l-4 4 4 4M2 12h20' />
			</svg>
		)
	};
	const nextStep = stepFunction.name === 'nextStep';

	return (
		<div className='flex'>
			<button
				type='button'
				className='mt-4 hover:font-bold'
				onClick={() => stepFunction()}
			>
				{nextStep ? (
					<p className='flex items-center text-xs'>
						Next<span className='ml'>{svgConfig.moveRight}</span>
					</p>
				) : (
					<p className='flex items-center text-sm'>
						{svgConfig.moveLeft}
						<span className='ml-1.5'>Back</span>
					</p>
				)}
			</button>
		</div>
	);
};

export default StepButton