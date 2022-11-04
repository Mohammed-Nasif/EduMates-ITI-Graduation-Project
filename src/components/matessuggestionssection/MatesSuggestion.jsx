import './matessuggestion.scss';
import photo from '../../pp.jpg';
import { useState } from 'react';
import { Suggestedmate } from './Suggestedmate';

export const MatesSuggestion = () => {
	let suggestions = [
		{ name: 'Salwa Kamel', discription: '4 mutual friends', image: photo },
		{
			name: 'Salwa Kamel',
			discription: '4 mutual friends',
			image: photo,
		},
		{
			name: 'Salwa Kamel',
			discription: '4 mutual friends',
			image: photo,
		},
		{
			name: 'Salwa Kamel',
			discriotion: '4 mutual friends',
			image: photo,
		},
	];
	const [slicedSuggestions, setSlicedSuggestions] = useState(suggestions.slice(0, 2));
	// console.log(slicedSuggestions);
	const [seeMore, setSeeMore] = useState(false);
	const expandMatesSuggestions = function () {
		if (seeMore === true) {
			setSeeMore(false);
			setSlicedSuggestions(suggestions.slice(0, 2));
		} else {
			setSeeMore(true);
			setSlicedSuggestions(suggestions);
		}
	};

	return (
		<div className="component-layout mb-4">
			<h4 className="fw-bold ps-4 pt-3">People you may Know:</h4>
			{slicedSuggestions.map((person, i) => {
				return <Suggestedmate key={i} name={person.name} friends={person.discription} image={person.image}></Suggestedmate>;
			})}
			<div className="show-more-section">
				<p className="link text-center pt-2" onClick={expandMatesSuggestions}>
					{seeMore ? 'show less' : 'show more'}
				</p>
			</div>
		</div>
	);
};
