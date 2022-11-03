import './post.scss';
import { BsHandThumbsUp, BsChatRightText, BsReplyAll, BsHash, BsHandThumbsUpFill, BsFillCursorFill } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuid } from 'uuid';
import { Postcomment } from '../postcomment/Postcomment';

export function Post({ postObj }) {
	const [isLiked, setIsLiked] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [postOwner, setPostOwner] = useState({});
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const unsubPostOwner = onSnapshot(doc(db, 'users', postObj.createdBy), (doc) => {
			setPostOwner(doc.data());
		});
		const unsubPostComments = onSnapshot(doc(db, 'postComments', postObj.postId), (doc) => {
			doc.data() && setComments(doc.data().comments);
		});

		return () => {
			unsubPostOwner();
			unsubPostComments();
			if (postObj.likedBy.includes(postOwner.uid)) setIsLiked(true);
		};
	}, [postObj, postOwner.uid]);

	const handleLike = async () => {
		setIsLiked((prev) => !prev);
		if (isLiked) {
			await updateDoc(doc(db, 'posts', postObj.postId), {
				likedBy: arrayRemove(currentUser.uid),
			});
		} else {
			await updateDoc(doc(db, 'posts', postObj.postId), {
				likedBy: arrayUnion(currentUser.uid),
			});
		}
	};

	const handleComment = async () => {
		const commentId = uuid();
		if (comment.trim() !== '') {
			await updateDoc(doc(db, 'postComments', postObj.postId), {
				comments: arrayUnion({
					commentContent: comment,
					commentBy: currentUser.uid,
					postId: postObj.postId,
					commentId: commentId,
					commentedAt: Timestamp.now(),
				}),
			});
		}
	};

	const handleDelete = async () => {
		await deleteDoc(doc(db, 'posts', postObj.postId));
		await deleteDoc(doc(db, 'postComments', postObj.postId));
	};

	const getTimeDiff = () => {
		if (postObj.createdAt) {
			const diff = new Date() - postObj.createdAt.toDate();
			var days = Math.floor(diff / 86400000); // days
			var hours = Math.floor((diff % 86400000) / 3600000); // hours
			var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
			return days ? `${days} day ago` : hours ? `${hours} hours ago` : !mins ? `Just Now` : `${mins} mins ago`;
		}
	};
	return (
		<>
			<div className='post w-100 border border-1 bg-white rounded-4 mb-3'>
				<div className='header p-4 pb-3 pt-2'>
					{/* <small className='text-muted'>user shared this post</small> */}
					<div className='d-flex pt-2'>
						<div className='user-photo rounded-circle overflow-hidden me-3 d-flex align-items-center'>
							<img src={postOwner.photoURL} alt='' />
						</div>

						<div className='name'>
							<div className='user-name fw-bold'>{postOwner.displayName}</div>
							<div className='date fw-light' title={postObj.createdAt && postObj.createdAt.toDate().toLocaleString()}>
								{getTimeDiff()}
							</div>
						</div>

						<div className='delete btn ms-auto' onClick={handleDelete}>
							X
						</div>
					</div>
				</div>
				<p className='px-4 mb-1 lh-sm'>{postObj.postContent}</p>
				<div className='px-4 my-2'>
					{postObj.postTopics.map((topic) => {
						return (
							<span className='tag border border-2 fw-semibold p-1 me-2 rounded-1 lh-sm'>
								<strong>
									<BsHash className='fs-5' />
								</strong>
								{topic}
							</span>
						);
					})}
				</div>

				<div className='post-image overflow-hidden d-flex justify-content-center'>
					<img src={postObj.postImg} alt='' />
				</div>
				<div className='d-flex justify-content-around text-center border border-top border-1'>
					<div className='btn' onClick={handleLike}>
						{!isLiked ? (
							<>
								<BsHandThumbsUp className='icon' /> like
							</>
						) : (
							<>
								<BsHandThumbsUpFill className='icon' /> liked
							</>
						)}
					</div>
					<div
						className='btn'
						onClick={() => {
							setShowComments((prev) => !prev);
						}}>
						<BsChatRightText className='icon' /> comment
					</div>
					<div className='btn'>
						<BsReplyAll className='icon' /> share
					</div>
				</div>
				{showComments && (
					<div className='comments w-100 border-top border-1 px-4 py-2'>
						{/* This is Static */}
						{comments.length !== 0 &&
							comments.map((comment) => {
								return <Postcomment comment={comment} key={comment.commentId} />;
							})}
						{/* add Comment */}
						<div className='d-flex'>
							<div className='user-photo rounded-circle'>
								<img src={currentUser.photoURL} alt='' />
							</div>
							<div className='comment-body'>
								<div className='user-name fw-bold mb-1'>{currentUser.displayName}</div>
								<textarea
									className='w-100'
									name='com'
									id='com'
									rows='2'
									onChange={(e) => {
										setComment(e.target.value);
									}}></textarea>
							</div>
							{}
							<div className='btn h-25 align-self-center fs-4' onClick={handleComment}>
								<BsFillCursorFill />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
