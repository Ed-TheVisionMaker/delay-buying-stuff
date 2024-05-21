'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SmileyRating from '@/components/SmileyRating';

export const formSchema = z.object({
	item: z.string().min(1, 'Please enter an item here'),
	rating: z.number().min(1, 'Please select a rating'),
	regretItem: z.string().min(1, 'Please enter item here')
});

// setup a viewer that accepts an array of components
// sdtup a global form
// each step is a form ( doesn't have to be a div??, just has it's own formData state.)

const WizardForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue
		// reset,
		// setError
	} = useForm({
		resolver: zodResolver(formSchema)
		// defaultValues: {
		// 	item: '',
		// 	rating: 0
		// }
	});

	const [formData, setFormData] = useState({
		item: '',
		rating: 0,
		regretItem: ''
	});

	const [step, setStep] = useState(1);
	const nextStep = () => setStep((prev) => prev + 1);
	const prevStep = () => setStep((prev) => prev - 1);

	const onSubmit = (data) => {
		console.log('form data', data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='h-screen flex flex-col items-center justify-center'
		>
			<div className='flex flex-col items-center justify-center border-2 border-neutral p-8'>
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
				>
					submit
				</button>
			</div>
			<div className='flex flex-col items-center border-2 border-neutral p-8'>
				<p>How is your life without this item?</p>
				<SmileyRating formData={formData} setFormData={setFormData} />
			</div>
			<div className='flex flex-col items-center border-2 border-neutral p-8'>
				<p className=''>
					In{' '}
					<span className='bg-neutral text-neutral-content'>6 months time</span>{' '}
					how will this item change your life?
				</p>
				<SmileyRating formData={formData} setFormData={setFormData} />
			</div>
			<div className='flex flex-col items-center border-2 border-neutral p-8'>
				<p className=''>How will it really change your life?</p>
				<SmileyRating formData={formData} setFormData={setFormData} />
			</div>
			<div className='flex flex-col border-2 border-neutral p-8'>
				What is the last thing you regretted buying?
				<input
					{...register('regretItem')}
					type='text'
					placeholder='The last regret...'
					className='px-4 py-2 rounded border-2'
				/>
			</div>
			<div className='flex flex-col items-center border-2 border-neutral p-8'>
				<p className=''>
					If you <span className='bg-neutral text-neutral-content'>never</span>{' '}
					owned this item, what would happen to your life?
				</p>
				<SmileyRating formData={formData} setFormData={setFormData} />
			</div>
			{/* <Viewer /> */}
		</form>
	);
};

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
