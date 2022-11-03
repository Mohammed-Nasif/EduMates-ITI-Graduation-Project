import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';
export const Postcomment = ({ comment }) => {
	const [commentOwner, setCommentOwner] = useState({});

	useEffect(() => {
		const unsubCommentOwner = onSnapshot(doc(db, 'users', comment.commentBy), (doc) => {
			setCommentOwner(doc.data());
		});

		return () => {
			unsubCommentOwner();
		};
	}, [comment]);

	return (
		<div className='d-flex' key={comment.commentId}>
			<div className='user-photo rounded-circle'>
				<img src={commentOwner.photoURL} alt='' />
			</div>
			<div className='comment-body'>
				<div className='user-name fw-bold mb-1'>{commentOwner.displayName}</div>
				<p className='comment-txt lh-sm'>{comment.commentContent}</p>
			</div>
		</div>
	);
};
