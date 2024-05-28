import { useFormContext } from 'react-hook-form';

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

export default StepProgressBar