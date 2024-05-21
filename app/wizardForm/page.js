'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
	item: z.string().min(1, 'Please enter an item here')
});

const WizardForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError
	} = useForm({
		resolver: zodResolver(formSchema)
	});

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

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='h-screen flex flex-col items-center justify-center'
		>
			<input
				{...register('item')}
				type='text'
				placholder='What do you want to buy?'
				className='px-4 py-2 rounded border-2'
			/>
			{/* maybe make a ternary here see Fred linked in */}
			{errors.item && <p className='text-red-500'>{errors.item.message}</p>}
			<button
				type='submit'
				disabled={isSubmitting}
				className='px-4 py-2 rounded'
			>
				submit
			</button>
		</form>
	);
};

export default WizardForm;
