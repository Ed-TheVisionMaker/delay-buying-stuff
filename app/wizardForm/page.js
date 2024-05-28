'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ViewFormStep from '@/components/WizardForm/ViewFormStep';

// the null values are causing problems.
// the zod needs to throw an error if the value of null is stil present
// at the moment it is throwing errors from the start.

export const formSchema = z.object({
    step: z.number(),
    item: z.string().min(1, 'Please enter an item here'),
    regretBuying: z.string().min(1, 'Please enter an item here'),
    withoutItem: z.union([
        z.number().min(1, 'Please select a rating').max(5, 'Invalid rating'),
        z.null(),
    ]),
    lifeChange: z.union([
        z.number().min(1, 'Please select a rating').max(5, 'Invalid rating'),
        z.null(),
    ]),
    reallyChangeLife: z.union([
        z.number().min(1, 'Please select a rating').max(5, 'Invalid rating'),
        z.null(),
    ]),
    neverOwned: z.union([
        z.number().min(1, 'Please select a rating').max(5, 'Invalid rating'),
        z.null(),
    ]),
});

const WizardForm = () => {
	const methods = useForm({
		// resolver: zodResolver(formSchema),
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
		trigger,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = methods;

		const onSubmit = async () => {
			const step = getValues('step');
			let valid = false;
			console.log(valid, 'valid')
			if(valid) setValue
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
