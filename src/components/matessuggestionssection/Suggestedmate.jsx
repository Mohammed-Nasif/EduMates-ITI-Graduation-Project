import './suggestedmate.scss';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export const Suggestedmate = ({ sugUser }) => {
	const { currentUser } = useContext(AuthContext);
	const addToMatesList = async () => {
		console.log(sugUser.uid);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayUnion(sugUser.uid),
		});
	};

	return (
		<>
			{!currentUser.matesList.includes(sugUser.uid) && (
				<div className="visible-section px-4 ">
					<div className="row py-2 g-3 d-flex align-items-center align-items-center ">
						<div className="col-9">
							<div className="row g-2">
								<div className="col-3 p-1">
									<div className="user-photo">
										<img src={sugUser.photoURL} className="" alt="profile pic" />
									</div>
								</div>
								<div className="col-9 mt-0 py-2 ">
									<Link to={`/eduMates/profile/${sugUser.displayName}/${sugUser.uid}`}>
										<p className="fw-bold w-13">{sugUser.displayName}</p>
									</Link>

									<p className="w-10">{sugUser.discription}</p>
								</div>
							</div>
						</div>
						<div className="col-3 p-0 mb-2">
							<button className="btn btn-outline-info follow rounded-1" onClick={addToMatesList}>
								Follow
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
