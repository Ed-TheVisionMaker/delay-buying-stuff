import { useFormContext } from 'react-hook-form';
const SmileyRating = ({ name }) => {
	const { setValue, getValues } = useFormContext();
	const smileys = [
		{ emoji: '😞', label: 'Very Dissatisfied', rating: 1 },
		{ emoji: '😟', label: 'Dissatisfied', rating: 2 },
		{ emoji: '😐', label: 'Neutral', rating: 3 },
		{ emoji: '🙂', label: 'Satisfied', rating: 4 },
		{ emoji: '😊', label: 'Very Satisfied', rating: 5 }
	];

	const ratingSelected = getValues(name);

	return (
		<div className='flex justify-center mt-4'>
			{smileys.map((smiley, index) => {
				const { rating, label, emoji } = smiley;
				return (
					<button
						key={index}
						onClick={() => setValue(name, rating)}
						aria-label={label}
						className={`text-4xl ${rating === ratingSelected ? 'scale-125' : ''} mx-2 hover:scale-125`}
					>
						{emoji}
					</button>
				);
			})}
		</div>
	);
};

export default SmileyRating;
