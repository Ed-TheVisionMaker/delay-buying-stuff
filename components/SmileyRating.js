import { useFormContext } from 'react-hook-form';

const SmileyError = ({ name }) => {
	const {
		formState: { errors }
	} = useFormContext();

	console.log(errors, ' name SMileyError');
	return <p className='text-red-500'>{errors[name]?.message}</p>;
};
const SmileyRating = ({ name }) => {
	const {
		setValue,
		getValues,
		formState: { errors, isSubmitting }
	} = useFormContext();
	const smileys = [
		{ emoji: '😞', label: 'Very Dissatisfied', rating: 1 },
		{ emoji: '😟', label: 'Dissatisfied', rating: 2 },
		{ emoji: '😐', label: 'Neutral', rating: 3 },
		{ emoji: '🙂', label: 'Satisfied', rating: 4 },
		{ emoji: '😊', label: 'Very Satisfied', rating: 5 }
	];

	const ratingSelected = getValues(name) || null;

	const ratingIsSelected = ratingSelected !== null;
	// console.log(ratingIsSelected, "rating is sledcted")

	return (
		<div className='w-full flex justify-evenly mt-4'>
			{smileys.map((smiley, index) => {
				const { rating, label, emoji } = smiley;
				return (
					<>
						<button
							key={index}
							onClick={() => setValue(name, rating)}
							aria-label={label}
							className={`text-4xl mx-2 mb-6 ${rating === ratingSelected ? 'scale-150' : 'scale-125'} hover:scale-150`}
							disabled={isSubmitting}
						>
							{emoji}
						</button>
					</>
				);
			})}
			{ratingIsSelected ? null : <SmileyError name={name} />}
		</div>
	);
};

export default SmileyRating;
