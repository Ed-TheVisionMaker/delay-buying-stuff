import SmileyRating from './SmileyRating';
import config from '@/config';

import React from 'react';

const ViewFormStep = () => {
	return (
		<>
			{config.steps.map((step) => (
				<div key={step.stateProperty}>
					{step.questionElement}

					<SmileyRating name={step.stateProperty} />
				</div>
			))}
		</>
	);
};

export default ViewFormStep;
