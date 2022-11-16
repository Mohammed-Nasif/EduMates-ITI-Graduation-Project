import './post.scss';
import SystemProfile from '../../assets/profileicons/SystemBadge.png';
import WebOwner from '../../assets/profileicons/webOwner.png';
import Verified from '../../assets/profileicons/verified.png';

import { BsHandThumbsUp, BsChatRightText, BsHash, BsHandThumbsUpFill, BsFillCursorFill, BsSuitHeart, BsTrash, BsThreeDots, BsArrow90DegRight } from 'react-icons/bs';
import { FaRegShareSquare, FaShareSquare } from 'react-icons/fa';
import { useState, useContext, useEffect, useRef } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuid } from 'uuid';
import { Postcomment } from '../postcomment/Postcomment';
import { Link, useParams } from 'react-router-dom';
import { NotifiesContext } from './../../context/NotifiesContext';

export function Post({ postObj, shared, matesShared, profileshared, profiledate, profileUser }) {
	const [dropdown, setDropDown] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [postOwner, setPostOwner] = useState({});
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(NotifiesContext);
	const commentArea = useRef();
	const post = useRef();
	const params = useParams().postId;

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
		};
	}, [postObj]);

	let likedByUser;
	if (postObj.likedBy.includes(currentUser.uid)) likedByUser = true;

	let sharedByUser;
	if (postObj.sharedBy.find((share) => share.sharedUserId === currentUser.uid)) sharedByUser = true;

	const handleLike = async () => {
		if (likedByUser) {
			await updateDoc(doc(db, 'posts', postObj.postId), {
				likedBy: arrayRemove(currentUser.uid),
			});
		} else {
			await updateDoc(doc(db, 'posts', postObj.postId), {
				likedBy: arrayUnion(currentUser.uid),
			});
			dispatch({
				type: 'LIKE_POST',
				payload: {
					postId: postObj.postId,
					userId: postOwner.uid,
					actionUser: { actionUserId: currentUser.uid, actionUserName: currentUser.displayName, actionUserPhoto: currentUser.photoURL },
				},
			});
		}
	};

	const sendComment = (e) => {
		(e.code === 'Enter' || e.code === 'NumpadEnter') && !e.shiftKey && handleComment();
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
			dispatch({
				type: 'COMMENT_ON_POST',
				payload: {
					postId: postObj.postId,
					userId: postOwner.uid,
					commentId: commentId,
					actionUser: { actionUserId: currentUser.uid, actionUserName: currentUser.displayName, actionUserPhoto: currentUser.photoURL },
				},
			});
			setComment();
			commentArea.current.value = '';
		}
	};
	const handleDelete = async () => {
		if (postObj.createdBy !== currentUser.uid) post.current.style.display = 'none';
		else {
			await deleteDoc(doc(db, 'posts', postObj.postId));
			await deleteDoc(doc(db, 'postComments', postObj.postId));
		}
	};
	const getTimeDiff = () => {
		if (postObj.createdAt) {
			const diff = new Date() - postObj.createdAt.toDate();
			var days = Math.floor(diff / 86400000); // days
			var hours = Math.floor((diff % 86400000) / 3600000); // hours
			var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
			return days > 0 ? (days === 1 ? `Yesterday` : `${days} days ago`) : hours > 0 ? (hours === 1 ? `Last hour` : `${hours} hours ago`) : mins > 1 ? `${mins} minutes ago` : `Just Now`;
		}
	};

	const handleShare = async () => {
		if (sharedByUser) {
			const updatedRemovedShare = postObj.sharedBy.filter((share) => share.sharedUserId !== currentUser.uid);
			await updateDoc(doc(db, 'posts', postObj.postId), {
				sharedBy: updatedRemovedShare,
			});
		} else {
			await updateDoc(doc(db, 'posts', postObj.postId), {
				sharedBy: arrayUnion({
					sharedUserId: currentUser.uid,
					sharedTime: Timestamp.now(),
				}),
			});
			dispatch({
				type: 'SHARE_POST',
				payload: {
					postId: postObj.postId,
					userId: postOwner.uid,
					actionUser: { actionUserId: currentUser.uid, actionUserName: currentUser.displayName, actionUserPhoto: currentUser.photoURL },
				},
			});
		}
	};

	return (
		<>
			<div ref={post} className="post shadow-sm w-100 border border-1 bg-white rounded-4 mb-3 position-relative">
				<div className="header p-4 pb-3 pt-2">
					{shared && (
						<small className="text-muted text-capitalize" title={sharedByUser ? matesShared?.filter((x) => x !== currentUser.displayName).join(' & ') : matesShared?.join(' & ')}>
							<BsArrow90DegRight />
							{sharedByUser && '  you '}
							{sharedByUser && matesShared.length > 2 ? `& ${matesShared.length - 1} mates ` : ' '}
							{sharedByUser && matesShared.length === 2 ? '& 1 mate ' : ''}
							{!sharedByUser && matesShared.length > 1 ? ` ${matesShared.length} mates` : ' '}
							{!sharedByUser && matesShared.length === 1 ? ` ${matesShared[0]} ` : ' '}
							shared this post
						</small>
					)}
					{profileshared && (
						<small className="text-muted text-capitalize">
							<BsArrow90DegRight />
							{profileUser.uid === currentUser.uid ? ' You ' : ' ' + profileUser.displayName} shared this post {profiledate.toDate().toLocaleString()}
						</small>
					)}
					<div className="d-flex pt-2">
						<div className="user-photo me-3 d-flex align-items-center">
							<img src={postOwner.photoURL} alt="" />
						</div>
						<div className="name w-100">
							<div className=" d-flex align-items-center gap-1">
								<Link to={`/eduMates/profile/${postOwner.displayName}/${postOwner.uid}`}>
									<div className="user-name fw-bold text-capitalize">{postOwner.displayName}</div>
								</Link>
								<div className="m-0 p-0 mb-1">
									{postOwner?.systemFlags?.isSystemProfile && <img className="sys-badge" src={SystemProfile} alt="EduMates" title="EduMates" />}
									{postOwner?.specialFlags?.isOwner && <img className="special_badge" src={WebOwner} alt="Website Owners" title="Website Owners" />}
									{postOwner?.specialFlags?.isVerified && <img className="special_badge" src={Verified} alt="Verified Member" title="Verified Member" />}
								</div>
							</div>
							<div className="date fw-light" title={postObj.createdAt && postObj.createdAt.toDate().toLocaleString()}>
								{getTimeDiff()}
							</div>
						</div>
						<div className=" ms-auto position-relative">
							<div
								className="btn p-0"
								onClick={() => {
									setDropDown((prev) => !prev);
								}}
							>
								<BsThreeDots />
							</div>
							<div className={'drop position-absolute ' + (dropdown ? ' show' : '')}>
								<div className="p-2" onClick={handleDelete}>
									<BsTrash /> {postObj.createdBy === currentUser.uid ? 'Remove my post' : 'Hide for now'}
								</div>

								<div className="p-2">
									<BsSuitHeart /> Save the post
								</div>
							</div>
						</div>
					</div>
				</div>
				<p className="px-4 mb-1 lh-sm">{postObj.postContent}</p>
				<div className="px-4 my-2">
					{postObj.postTopics.map((topic, i) => {
						return (
							<span className="tag border border-2 fw-semibold p-1 me-2 rounded-1 lh-sm" key={i}>
								<strong>
									<BsHash className="fs-5" />
								</strong>
								{topic}
							</span>
						);
					})}
				</div>

				<div className="post-image overflow-hidden d-flex justify-content-center">
					<img src={postObj.postImg} alt="" />
				</div>

				<div className="d-flex justify-content-around text-center border-top border-1">
					<div className={`btn ${likedByUser ? 'pe-1' : ' pe-2'}`} onClick={handleLike}>
						{!!postObj?.likedBy.length && <div className={` badge bg-opacity-50 ${likedByUser ? ' bg-primary ' : 'bg-secondary'}`}>{postObj?.likedBy.length}</div>}

						{!likedByUser ? (
							<>
								<BsHandThumbsUp className="icon" /> Like
							</>
						) : (
							<>
								<BsHandThumbsUpFill className="icon" /> Unlike
							</>
						)}
					</div>
					{/* comment */}
					<div
						className="btn pe-0"
						onClick={() => {
							setShowComments((prev) => !prev);
						}}
					>
						{!!comments.length && <div className="badge bg-opacity-50 bg-secondary">{comments.length}</div>}
						<BsChatRightText className="icon" /> Comment
					</div>
					<div className="btn" onClick={handleShare}>
						{!sharedByUser ? (
							<>
								<FaRegShareSquare className="icon" /> Share
							</>
						) : (
							<>
								<FaShareSquare className="icon" /> Shared
							</>
						)}
					</div>
				</div>
				{(showComments || params === postObj.postId) && (
					<div className="comments w-100 border-top border-1 px-4 py-2">
						{comments.length !== 0 &&
							comments.map((comment) => {
								return <Postcomment comment={comment} postId={postObj.postId} key={comment.commentId} />;
							})}
						{/* add Comment */}
						<div className="d-flex">
							<div className="user-photo rounded-circle">
								<img src={currentUser.photoURL} alt="" />
							</div>
							<div className="comment-body">
								<div className="user-name fw-bold mb-1 text-capitalize">{currentUser.displayName}</div>
								<textarea
									className="w-100"
									ref={commentArea}
									rows="2"
									onChange={(e) => {
										setComment(e.target.value);
									}}
									onKeyDown={sendComment}
								></textarea>
							</div>
							<div className="btn h-25 align-self-center fs-4 ms-auto" onClick={handleComment}>
								<BsFillCursorFill />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
