import SmileyRating from './SmileyRating';
import { useFormContext } from 'react-hook-form';

import React, { useEffect } from 'react';

const StepProgressBar = ({ totalSteps }) => {
	const { getValues } = useFormContext();
	const currentStep = getValues('step');
	const progressBarWidth = Math.floor((currentStep / totalSteps) * 100);
	return (
		<div className='w-full h-6 flex justify-start mt-24 border-2 border-skyBlue rounded-xl bg-skyBlue/40'>
			<div
				className={`rounded-xl bg-primary`}
				style={{ width: progressBarWidth + '%' }}
			></div>
		</div>
	);
};

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
				type='submit'
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

const SubmitButton = ({ nextStep, smileyRatingUsed }) => {
	const {
		formState: { errors }
	} = useFormContext();

	const handleStepChange = () => {
		console.log(errors, 'errors in handlestepchange');
		if (!errors) {
			nextStep();
		}
	};
	return (
		<div className=''>
			<button
				type='submit'
				className='btn btn-wide btn-primary mb-6 text-xl'
				onClick={() => handleStepChange()}
			>
				{smileyRatingUsed ? 'Continue' : 'Submit'}
			</button>
		</div>
	);
};

const ViewFormStep = () => {
	const {
		getValues,
		setValue,
		register,
		formState: { errors, isSubmitting }
	} = useFormContext();

	const currentStep = getValues('step');

	const nextStep = () => {
		if (currentStep < stepsConfig.length) {
			setValue('step', currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setValue('step', currentStep - 1);
		}
	};

	useEffect(() => {
		const step = getValues('step');
	}, []);

	const stepsConfig = [
		{
			questionElement: (
				<div className='w-full flex flex-col items-center justify-center'>
					<p className='mb-6 text-4xl'>What do you want to buy&#63;</p>
					<input
						{...register('item')}
						type='text'
						placeholder='Type your answer here...'
						className='w-full mb-6 px-4 py-6 text-2xl rounded border-2'
					/>
					{errors.item ? (
						<p className='text-red-500'>{errors.item.message}</p>
					) : null}
				</div>
			),
			stateProperty: 'item',
			smileyRatingUsed: false
		},

		{
			questionElement: (
				<p className='mb-6 text-4xl'>How is your life without this item&#63;</p>
			),
			stateProperty: 'withoutItem',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					In{' '}
					<span className='bg-neutral text-neutral-content'>6 months time</span>{' '}
					how will this item change your life&#63;
				</p>
			),
			stateProperty: 'lifeChange',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					How will it really change your life&#63;
				</p>
			),
			stateProperty: 'reallyChangeLife',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<div className='w-full flex flex-col'>
					<h3 className='mb-6 text-4xl'>
						What is the last thing you regretted buying&#63;
					</h3>
					<input
						{...register('regretBuying')}
						type='text'
						placeholder='Type your last regret here...'
						className='w-full mb-6 px-4 py-6 text-2xl rounded border-2'
					/>
					{errors.regretBuying ? (
						<p className='text-red-500'>{errors.regretBuying.message}</p>
					) : null}
				</div>
			),
			stateProperty: 'regretBuying',
			smileyRatingUsed: false
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					If you <span className='bg-neutral text-neutral-content'>never</span>{' '}
					owned this item, what would happen to your life&#63;
				</p>
			),
			stateProperty: 'neverOwned',
			smileyRatingUsed: true
		}
	];

	const totalSteps = stepsConfig.length;

	return (
		<>
			<div className='h-full w-3/5 px-8 pt-12 rounded-xl mb-12 bg-skyBlue/40 border-2 border-skyBlue shadow-xl shadow-skyBlue text-center'>
				<div
					key={stepsConfig[currentStep - 1].stateProperty}
					className='h-full w-full flex flex-col items-center text-xl'
				>
					{stepsConfig[currentStep - 1].questionElement}
					{stepsConfig[currentStep - 1].smileyRatingUsed === true ? (
						<SmileyRating
							nextStep={nextStep}
							name={stepsConfig[currentStep - 1].stateProperty}
						/>
					) : null}
					<SubmitButton
						nextStep={nextStep}
						smileyRatingUsed={stepsConfig[currentStep - 1].smileyRatingUsed}
					/>
					<div className='w-full'>
						<StepProgressBar totalSteps={totalSteps} />
						<div className={`w-full flex justify-start mb-4`}>
							{currentStep > 1 ? <StepButton stepFunction={prevStep} /> : null}
						</div>
					</div>
					{/* <pre>{JSON.stringify(getValues(), null, 2)}</pre> */}
				</div>
			</div>
		</>
	);
};

export default ViewFormStep;
