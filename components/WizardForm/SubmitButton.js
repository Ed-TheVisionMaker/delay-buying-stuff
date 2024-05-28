const SubmitButton = ({ smileyRatingUsed }) => {

	return (
		<div className=''>
			<button
				type='submit'
				className='btn btn-wide btn-primary mb-6 text-xl'
			>
				{smileyRatingUsed ? 'Continue' : 'Submit'}
			</button>
		</div>
	);
};

export default SubmitButton