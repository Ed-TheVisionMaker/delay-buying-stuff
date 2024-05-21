import { useForm } from 'react-hook-form';

const SmileyRating = ({ name }) => {
	const { setValue, value } = useForm();
	const smileys = [
		{ emoji: '😞', label: 'Very Dissatisfied', rating: 1 },
		{ emoji: '😟', label: 'Dissatisfied', rating: 2 },
		{ emoji: '😐', label: 'Neutral', rating: 3 },
		{ emoji: '🙂', label: 'Satisfied', rating: 4 },
		{ emoji: '😊', label: 'Very Satisfied', rating: 5 }
	];

	return (
		<div className='flex justify-center mt-4'>
			{smileys.map((smiley, index) => (
				<button
					key={index}
					onClick={() => setValue(name, smiley.value)}
					aria-label={smiley.label}
					className={'text-4xl mx-2'}
				>
					{smiley.emoji}
				</button>
			))}
		</div>
	);
};

export default SmileyRating;
