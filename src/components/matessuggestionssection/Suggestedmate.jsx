import './suggestedmate.scss';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { BsPersonPlus } from 'react-icons/bs';
import { NotifiesContext } from '../../context/NotifiesContext';
import SystemProfile from '../../assets/profileicons/SystemBadge.png';
import WebOwner from '../../assets/profileicons/webOwner.png';
import Verified from '../../assets/profileicons/verified.png';

export const Suggestedmate = ({ sugUser }) => {
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(NotifiesContext);

	const addToMatesList = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayUnion(sugUser.uid),
		});
		dispatch({
			type: 'FOLLOW_USER',
			payload: {
				userId: sugUser.uid,
				actionUser: { actionUserId: currentUser.uid, actionUserName: currentUser.displayName, actionUserPhoto: currentUser.photoURL },
			},
		});
	};

	return (
		<>
			{!currentUser?.matesList?.includes(sugUser.uid) && (
				<div className='visible-section px-md-2 px-xlg-3 '>
					<div className='row py-2 g-3 d-flex align-items-center align-items-center '>
						<div className='col-8 col-lg-9 col-xxl-9 '>
							<div className='row g-2'>
								<div className='col-5 col-lg-5 col-xl-4 p-1'>
									<div className='user-photo'>
										<img src={sugUser.photoURL} className='' alt='profile pic' />
									</div>
								</div>
								<div className='col-7 col-lg-7 col-xl-8 mt-0 py-2 '>
									<Link
										to={`/eduMates/profile/${sugUser.displayName}/${sugUser.uid}`}
										className='d-flex justify-content-start align-items-center gap-2'>
										<p className='fw-bold w-13 text-capitalize text-truncate lh-1'>{sugUser.displayName}</p>
										<div className='m-0 p-0 mb-1'>
											{sugUser?.specialFlags?.isOwner && <img className='special_badge' src={Verified} alt='Website Owners' title='Website Owners' />}
											{sugUser?.specialFlags?.isVerified && (
												<img className='special_badge' src={Verified} alt='Verified Member' title='Verified Member' />
											)}
										</div>
									</Link>

									<p className='w-10 text-truncate lh-base '>{sugUser.description || 'No description yet'}</p>
								</div>
							</div>
						</div>

						<div className='col-4 col-lg-3 col-xxl-3 p-0 mb-2 '>
							<div className='follow text-center ' onClick={addToMatesList}>
								<BsPersonPlus />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
