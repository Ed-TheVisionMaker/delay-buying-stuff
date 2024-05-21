'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ViewFormStep from '@/components/ViewFormStep';

export const formSchema = z.object({
	step: z.number(),
	// item: z.string().min(1, 'Please enter an item here'),
	regretBuying: z.string().min(1, 'Please enter an item here'),
	withoutItem: z
		.number()
		.min(1, 'Please select a rating')
		.max(5, 'Invalid rating'),
	lifeChange: z.string().min(1, 'Please enter an item here'),
	reallyChangeLife: z
		.number()
		.min(1, 'Please select a rating')
		.max(5, 'Invalid rating'),
	neverOwned: z
		.number()
		.min(1, 'Please select a rating')
		.max(5, 'Invalid rating')
});

// setup a viewer that accepts an array of components

const WizardForm = () => {
	const methods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			step: 1,
			item: '',
			regretBuying: '',
			withOutItem: 0,
			lifeChange: 0,
			reallyChangeLife: 0,
			neverOwned: 0
		}
	});

	const {
		getValues,
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = methods;

	const onSubmit = (data) => {
		console.log('form data', data);
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='h-screen flex flex-col items-center justify-center'
			>
				<ViewFormStep />
			</form>
		</FormProvider>
	);
};

export default WizardForm;

// setting up server side validation

// const onSubmit = async (data) => {
// 	// remember to setup the api client when the login is setup: https://shipfa.st/docs/tutorials/api-call
// 	const response = await fetch('/api/submitForm', {
// 		method: 'POST',
// 		body: JSON.stringify(data),
// 		headers: {
// 			'Content-Type': 'application/json'

// 		}
// 	});
// 	const responseData = await response.json();
// 	if (!response.ok) {
// 		alert('Submitting Form Failed!');
// 		return;
// 	}

// 	if (responseData.errors) {
// 		if (errors.item) {
// 			setError('item', {
// 				type: 'server',
// 				message: errors.item
// 			});
// 		}
// 	}
// 	reset();
// };
