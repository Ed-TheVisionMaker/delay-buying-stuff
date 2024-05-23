import { useFormContext } from 'react-hook-form';
const SmileyRating = ({ name, nextStep }) => {
	const { setValue } = useFormContext();
	const smileys = [
		{ emoji: '😞', label: 'Very Dissatisfied', rating: 1 },
		{ emoji: '😟', label: 'Dissatisfied', rating: 2 },
		{ emoji: '😐', label: 'Neutral', rating: 3 },
		{ emoji: '🙂', label: 'Satisfied', rating: 4 },
		{ emoji: '😊', label: 'Very Satisfied', rating: 5 }
	];

	const handleSmileyClick = (rating) => {
		nextStep();
		setValue(name, rating);
	};

	return (
		<div className='flex justify-center mt-4'>
			{smileys.map((smiley, index) => {
				const { rating, label, emoji } = smiley;
				return (
					<button
						key={index}
						onClick={() => handleSmileyClick(rating)}
						aria-label={label}
						className={'text-4xl mx-2 hover:scale-125'}
					>
						{emoji}
					</button>
				);
			})}
		</div>
	);
};

export default SmileyRating;
