import './matessuggestion.scss';
// import photo from '../../pp.jpg';
import { useState, useContext, useEffect } from 'react';
import { Suggestedmate } from './Suggestedmate';
import { AuthContext } from './../../context/AuthContext';
import { query, collection, onSnapshot, where, limit } from 'firebase/firestore';
import { db } from '../../firebase';

export const MatesSuggestion = () => {
	const { currentUser } = useContext(AuthContext);
	const [suggestions, setSuggestions] = useState([]);
	const [slicedSuggestions, setSlicedSuggestions] = useState([]);
	const [seeMore, setSeeMore] = useState(false);

	// useEffect(() => {
	// 	if (currentUser.uid) {
	// 		const q = query(collection(db, 'users'), where('uid', 'not-in', currentUser.matesList));
	// 		const unsubscribe = onSnapshot(q, (querySnapshot) => {
	// 			const usersRes = [];
	// 			querySnapshot.forEach((doc) => {
	// 				const user = doc.data();
	// 				if (!currentUser.matesList.includes(user.uid)) {
	// 					usersRes.push(user);
	// 				}
	// 			});
	// 			setSuggestions(usersRes);
	// 			if (!seeMore) {
	// 				setSlicedSuggestions(usersRes.slice(0, 2));
	// 			}
	// 		});
	// 		return () => {
	// 			unsubscribe();
	// 		};
	// 	}
	// }, [currentUser, seeMore]);

	// const expandMatesSuggestions = function () {
	// 	if (seeMore === true) {
	// 		setSeeMore(false);
	// 		setSlicedSuggestions(suggestions.slice(0, 2));
	// 	} else {
	// 		setSeeMore(true);
	// 		setSlicedSuggestions(suggestions.slice(0, 5));
	// 	}
	// };

	return (
		<div className='component-layout mb-4'>
			<h4 className='fw-bold ps-4 pt-3'>People you may Know:</h4>
			{slicedSuggestions.map((sugUser) => {
				return <Suggestedmate key={sugUser.uid} sugUser={sugUser}></Suggestedmate>;
			})}
			<div className='show-more-section'>
				{/* <p className='link text-center pt-2' onClick={expandMatesSuggestions}>
					{seeMore ? 'show less' : 'show more'}
				</p> */}
			</div>
		</div>
	);
};
