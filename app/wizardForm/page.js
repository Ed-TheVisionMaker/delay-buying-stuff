'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ViewFormStep from '@/components/WizardForm/ViewFormStep';

const WizardForm = () => {
	const methods = useForm({
		defaultValues: {
			step: 1,
			item: '',
			regretBuying: '',
			withoutItem: null,
			lifeChange: null,
			reallyChangeLife: null,
			neverOwned: null
		}
	});


	const {
		getValues,
		setValue,
		handleSubmit,
	} = methods;

		const onSubmit = async () => {
			const step = getValues('step');
			setValue('step', step + 1)
			
		};

	return (
		<div className='w-screen h-screen'>
			<h1 className='ml-12 pt-6 pb-24 font-bold text-2xl '>Impulse Buy SOS</h1>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full flex flex-col items-center'
				>
					<ViewFormStep />
				</form>
			</FormProvider>
		</div>
	);
};

export default WizardForm;
