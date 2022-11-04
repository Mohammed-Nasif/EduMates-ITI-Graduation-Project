import './suggestedmate.scss';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const Suggestedmate = ({ sugUser }) => {
	const { currentUser } = useContext(AuthContext);

	const addToMatesList = async () => {
		console.log(sugUser.uid);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayUnion(sugUser.uid),
		});
	};
	
	return (
		<div className='visible-section px-4 '>
			<div className='row py-2 g-3 d-flex align-items-center align-items-center '>
				<div className='col-9'>
					<div className='row g-2'>
						<div className='col-3 p-1 '>
							<img src={sugUser.photoURL} className='w-100' alt='profile pic' />
						</div>
						<div className='col-9 mt-0 py-2 '>
							<p className='fw-bold w-13'>{sugUser.displayName}</p>
							<p className='w-10'>{sugUser.discription}</p>
						</div>
					</div>
				</div>
				<div className='col-3 p-0 mb-2'>
					<button className='btn btn-outline-info follow rounded-1' onClick={addToMatesList}>
						Follow
					</button>
				</div>
			</div>
		</div>
	);
};
