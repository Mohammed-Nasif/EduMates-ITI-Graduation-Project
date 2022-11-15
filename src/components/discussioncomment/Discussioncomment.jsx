import './discussioncomment.scss';
import Instructor from '../../assets/profileicons/instructor.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import { onSnapshot, doc } from 'firebase/firestore';

export const Discussioncomment = (props) => {
	const [commentOwner, setcommentOwner] = useState({});
	useEffect(() => {
		const getOwnerData = onSnapshot(doc(db, 'users', props.comment.createdBy), (doc) => {
			// console.log(doc.data());
			setcommentOwner(doc.data());
		});
		return () => {
			getOwnerData();
		};
	}, [props.comment]);
	return (
		<div className='discussion-comment mb-1 pt-1 pb-3 mx-auto ps-0'>
			<div className='row p-2 comment d-flex align-items-start gx-0'>
				<div className='col-2 text-center pe-0 mt-1'>
					<img src={commentOwner.photoURL} alt='' />
				</div>
				<div className='col-10'>
					<div className='d-flex align-items-center '>
						<p className='mb-0 me-2 fw-bold user-name text-capitalize'>{commentOwner.displayName}</p>
						{commentOwner?.specialFlags?.isInstructor && <img className='inst-badge' src={Instructor} alt='Instructor' title='Instructor' />}
					</div>
					<p className='text-muted m-0 description'>{commentOwner.description || 'No description yet'}</p>
				</div>
			</div>
			<p className='w-100 mb-0 ps-5 ms-4 comment-content'>{props.comment.commentContent}</p>
		</div>
	);
};
