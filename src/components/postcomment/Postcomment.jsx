import { useContext, useEffect, useState } from 'react';
import { onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { BsXCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const Postcomment = ({ comment, postId }) => {
	const [commentOwner, setCommentOwner] = useState({});
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const unsubCommentOwner = onSnapshot(doc(db, 'users', comment.commentBy), (doc) => {
			setCommentOwner(doc.data());
		});

		return () => {
			unsubCommentOwner();
		};
	}, [comment]);

	const getTimeDiff = () => {
		if (comment.commentedAt) {
			const diff = new Date() - comment.commentedAt.toDate();
			var days = Math.floor(diff / 86400000); // days
			var hours = Math.floor((diff % 86400000) / 3600000); // hours
			var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
			return days > 0 ? (days === 1 ? `Yesterday` : `${days} day ago`) : hours > 0 ? (hours === 1 ? `Last hour` : `${hours} hours ago`) : mins > 1 ? `${mins} minutes ago` : `Just Now`;
		}
	};

	const deleteComment = async () => {
		await updateDoc(doc(db, 'postComments', postId), {
			comments: arrayRemove(comment),
		});
	};

	return (
		<div className='d-flex border-bottom border-1 mb-1' key={comment.commentId}>
			<div className='user-photo rounded-circle'>
				<img src={commentOwner.photoURL} alt='' />
			</div>

			<div className='comment-body'>
				<Link to={`/eduMates/profile/${commentOwner.displayName}/${commentOwner.uid}`}>
					<div className='user-name fw-bold text-capitalize'>{commentOwner.displayName}</div>
				</Link>

				<div className='date fw-light mb-2' title={comment.commentedAt && comment.commentedAt.toDate().toLocaleString()}>
					{getTimeDiff()}
				</div>
				<p className='comment-txt lh-sm mb-2'>{comment.commentContent}</p>
			</div>
			{comment.commentBy === currentUser.uid && (
				<div className='remove-comment ms-auto px-2 h-2' onClick={deleteComment}>
					<BsXCircle />
				</div>
			)}
		</div>
	);
};
