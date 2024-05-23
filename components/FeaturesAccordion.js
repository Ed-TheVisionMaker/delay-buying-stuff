'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
	{
		title: 'Beat The Impulse',
		description: `Follow science backed methods to prevent that purchase you don't want.`,
		type: 'image',
		path: '/online-payment-merhanhaval22-by-Merhan Saeed.png',
		svg: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className='w-6 h-6'
			>
				<circle cx={12} cy={12} r={10} />
				<path d='M10 15L10 9' />
				<path d='M14 15L14 9' />
			</svg>
		)
	},
	{
		title: 'Track Your Savings',
		description:
			"Easily see how much you've saved over time, and how much you can save in the future",
		svg: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className='w-6 h-6'
			>
				<path d='M3 3v18h18M13 17V9M18 17V5M8 17v-3' />
			</svg>
		)
	},
	{
		title: 'Celebrate Your Wins',
		description:
			'Get to know how you can celebrate your wins with a personalized email',
		svg: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className='w-6 h-6'
			>
				<path d='M5.8 11.3L2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24.75a2.9 2.9 0 00-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10M22 13l-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17M11 2l.33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7' />
				<path d='M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z' />
			</svg>
		)
	}
];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ feature, isOpen, setFeatureSelected }) => {
	const accordion = useRef(null);
	const { title, description, svg } = feature;

	return (
		<li>
			<button
				className='relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg'
				onClick={(e) => {
					e.preventDefault();
					setFeatureSelected();
				}}
				aria-expanded={isOpen}
			>
				<span className={`duration-100 ${isOpen ? 'text-primary' : ''}`}>
					{svg}
				</span>
				<span
					className={`flex-1 text-base-content ${
						isOpen ? 'text-primary font-semibold' : ''
					}`}
				>
					<h3 className='inline'>{title}</h3>
				</span>
			</button>

			<div
				ref={accordion}
				className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
				style={
					isOpen
						? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
						: { maxHeight: 0, opacity: 0 }
				}
			>
				<div className='pb-5 leading-relaxed'>{description}</div>
			</div>
		</li>
	);
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
	const { type, path, format, alt } = feature;
	const style = 'rounded-2xl object-contain w-full sm:w-[26rem]';
	const size = {
		width: 500,
		height: 500
	};

	if (type === 'video') {
		return (
			<video
				className={style}
				autoPlay
				muted
				loop
				playsInline
				controls
				width={size.width}
				height={size.height}
			>
				<source src={path} type={format} />
			</video>
		);
	} else if (type === 'image') {
		return (
			<Image
				src={path}
				alt={alt}
				className={`${style} object-cover object-center`}
				width={size.width}
				height={size.height}
			/>
		);
	} else {
		return <div className={`${style} !border-none`}></div>;
	}
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
	const [featureSelected, setFeatureSelected] = useState(0);

	return (
		<section
			className='py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 '
			id='features'
		>
			<div className='px-8'>
				<h2 className='font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24'>
					All you need to plug that leak
					<span className='bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap'>
						and save more every month
					</span>
				</h2>
				<div className=' flex flex-col md:flex-row gap-12 md:gap-24'>
					<div className='grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20'>
						<ul className='w-full'>
							{features.map((feature, i) => (
								<Item
									key={feature.title}
									index={i}
									feature={feature}
									isOpen={featureSelected === i}
									setFeatureSelected={() => setFeatureSelected(i)}
								/>
							))}
						</ul>

						<Media feature={features[featureSelected]} key={featureSelected} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturesAccordion;
