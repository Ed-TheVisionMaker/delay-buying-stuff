import SmileyRating from './SmileyRating';
import { useFormContext } from 'react-hook-form';

import React, { useEffect } from 'react';

const StepProgressBar = ({ totalSteps }) => {
	const { getValues } = useFormContext();
	const currentStep = getValues('step');
	const progressBarWidth = Math.floor((currentStep / totalSteps) * 100);
	return (
		<div className='w-full h-2 flex justify-startmt-4 border border-black rounded-xl'>
			<div
				className={`rounded-xl bg-red-700`}
				style={{ width: progressBarWidth + '%' }}
			></div>
		</div>
	);
};

const StepButton = ({ stepFunction }) => {
	return (
		<button
			type='submit'
			className='border border-black px-4 py rounded-xl'
			onClick={() => stepFunction()}
		>
			{stepFunction.name === 'nextStep' ? 'Next' : 'Prev'}
		</button>
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
				<div className='flex flex-col items-center justify-center'>
					<input
						{...register('item')}
						type='text'
						placeholder='What do you want to buy?'
						className='px-4 py-2 rounded border-2'
					/>
					{/* maybe make a ternary here see Fred linked in */}
					{errors.item && <p className='text-red-500'>{errors.item.message}</p>}
					<button
						type='submit'
						disabled={isSubmitting}
						className='px-4 py-2 rounded'
						onClick={() => nextStep()}
					>
						next
					</button>
				</div>
			),
			stateProperty: 'item',
			smileyRatingUsed: false
		},

		{
			questionElement: <p>How is your life without this item?</p>,
			stateProperty: 'withoutItem',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<p className=''>
					In{' '}
					<span className='bg-neutral text-neutral-content'>6 months time</span>{' '}
					how will this item change your life?
				</p>
			),
			stateProperty: 'lifeChange',
			smileyRatingUsed: true
		},
		{
			questionElement: <p className=''>How will it really change your life?</p>,
			stateProperty: 'reallyChangeLife',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<div className='flex flex-col'>
					What is the last thing you regretted buying?
					<input
						{...register('regretBuying')}
						type='text'
						placeholder='The last regret...'
						className='px-4 py-2 rounded border-2'
					/>
					<button
						type='submit'
						disabled={isSubmitting}
						className='px-4 py-2 rounded'
						onClick={() => nextStep()}
					>
						next
					</button>
				</div>
			),
			stateProperty: 'regretBuying',
			smileyRatingUsed: false
		},
		{
			questionElement: (
				<p className=''>
					If you <span className='bg-neutral text-neutral-content'>never</span>{' '}
					owned this item, what would happen to your life?
				</p>
			),
			stateProperty: 'neverOwned',
			smileyRatingUsed: true
		}
	];

	const totalSteps = stepsConfig.length;

	return (
		<>
			{
				<div
					key={stepsConfig[currentStep - 1].stateProperty}
					className='flex flex-col items-center justify-center border-2 border-neutral p-8'
				>
					{stepsConfig[currentStep - 1].questionElement}
					{stepsConfig[currentStep - 1].smileyRatingUsed === true ? (
						<SmileyRating
							nextStep={nextStep}
							name={stepsConfig[currentStep - 1].stateProperty}
						/>
					) : null}
					<StepProgressBar totalSteps={totalSteps} />
					<div className='flex'>
						{currentStep < stepsConfig.length ? (
							<StepButton stepFunction={nextStep} />
						) : null}
						{currentStep > 1 ? <StepButton stepFunction={prevStep} /> : null}
					</div>
					<pre>{JSON.stringify(getValues(), null, 2)}</pre>
				</div>
			}
		</>
	);
};

export default ViewFormStep;
