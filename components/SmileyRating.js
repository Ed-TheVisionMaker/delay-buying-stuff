import { useForm } from 'react-hook-form';

const SmileyRating = ({ name }) => {
	const { setValue } = useForm();
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
					onClick={() => setValue(smileyRating[name], smiley.value)}
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
