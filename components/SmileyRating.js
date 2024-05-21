import { useState } from 'react';

const SmileyRating = ({ formData, setFormData }) => {
	const [selectedRating, setSelectedRating] = useState(formData.rating || 0);

	const handleRatingClick = (rating) => {
		setSelectedRating(rating);
		setFormData({
			...formData,
			rating
		});
	};

	const smileys = [
		{ emoji: '😞', label: 'Very Dissatisfied' },
		{ emoji: '😟', label: 'Dissatisfied' },
		{ emoji: '😐', label: 'Neutral' },
		{ emoji: '🙂', label: 'Satisfied' },
		{ emoji: '😊', label: 'Very Satisfied' }
	];

	return (
		<div className='flex justify-center mt-4'>
			{smileys.map((smiley, index) => (
				<button
					key={index}
					onClick={() => handleRatingClick(index + 1)}
					aria-label={smiley.label}
					className={`text-4xl mx-2 ${selectedRating === index + 1 ? 'scale-125' : ''}`}
				>
					{smiley.emoji}
				</button>
			))}
		</div>
	);
};

export default SmileyRating;
