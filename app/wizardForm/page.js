'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

const WizardForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm();

	const onSubmit = (data) => {};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='h-screen flex flex-col items-center justify-center'
		>
			<input
				{...register('purchase', { required: 'Please enter an item here' })}
				type='text'
				placholder='What do you want to buy?'
				className='px-4 py-2 rounded border-2'
			/>
			{/* maybe make a ternary here see Fred linked in */}
			{errors.purchase && (
				<p className='text-red-500'>{errors.purchase.message}</p>
			)}
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
