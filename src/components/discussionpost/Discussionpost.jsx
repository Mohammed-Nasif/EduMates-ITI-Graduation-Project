import './discussionpost.scss';
import { useState, useRef, useContext } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Discussioncomment } from './../discussioncomment/Discussioncomment';
import Instructor from '../../assets/profileicons/instructor.png';

import { useEffect } from 'react';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuid } from 'uuid';

export const Discussionpost = (props) => {
	const [userslikedPost, setUserslikedPost] = useState([]); // usersID >>> send to firebase
	const [isLiked, setIsliked] = useState(false);
	const [replyFlag, setReplyFlag] = useState(false);
	const [commentFlag, setCommentFlag] = useState(false);
	const [comments, setComments] = useState([]);
	const CommentInputRef = useRef();

	const [postOwner, setpostOwner] = useState({});
	const { currentUser } = useContext(AuthContext);

	// function: handle like action
	const handleLike = async () => {
		// isLiked? setIsliked(false): setIsliked(true);
		if (isLiked) {
			setIsliked(false);
			// console.log(currentUser.uid)
			//     await updateDoc(doc(db,'courseDiscussion', props.courseId),{
			//        [props.post.discussionId]:
			//          {        // post
			//         ...props.post.discussionId,

			//             likedBy: arrayRemove(currentUser.uid)
			//          }
			//      });
		} else {
			setIsliked(true);
			// await updateDoc(doc(db, 'courseDiscussion', props.courseId), {
			//     [props.post.discussionId]:
			//     {
			//               // post
			//         ...props.post.discussionId,
			//        likedBy: arrayUnion(currentUser.uid)
			//     }
			// });
		}
	};

	// const handleLike = ()=>{
	//     isLiked? setIsliked(false): setIsliked(true);
	// }
	// function: handle reply action
	const handleReply = () => {
		setReplyFlag(true);
	};
	// function: comment input
	const addCommnetValue = () => {
		let commentsArr = comments;
		if (CommentInputRef.current.value.trim() != '') {
			commentsArr.push(CommentInputRef.current.value.trim());
			setComments([...commentsArr]);
			setReplyFlag(false);
			setCommentFlag(true);
			// console.log(comments);
		}
		handleCommentSubmit();
	};

	useEffect(() => {
		const getOwnerData = onSnapshot(doc(db, 'users', props.post.createdBy), (doc) => {
			// console.log(doc.data());
			setpostOwner(doc.data());
		});
		return () => {
			getOwnerData();
		};
	}, [props.post]);
	// console.log(postOwner);

	const clean = () => {
		CommentInputRef.current.value = '';
	};

	// function to send comments to firebase
	const handleCommentSubmit = async () => {
		const discussionCommentId = uuid();
		try {
			if (CommentInputRef.current.value.trim() !== '') {
				let inputvalue = CommentInputRef.current.value.trim();
				// console.log(currentUser.uid);
				await updateDoc(doc(db, 'discussionComments', props.post.discussionId), {
					comments: arrayUnion({
						// comment
						discussionId: props.post.discussionId,
						commentID: discussionCommentId,
						commentContent: inputvalue,
						createdBy: currentUser.uid,
						createdAt: Timestamp.now(),
					}),
				});

				clean();
			}
		} catch (error) {
			console.error(error);
		}
	};

	// function to render all post comments
	const [allComments, setAllComments] = useState([]);
	useEffect(() => {
		const discPostCommentsData = onSnapshot(doc(db, 'discussionComments', props.post.discussionId), (doc) => {
			// console.log(doc.data()['discussions'])
			let commentsArr = [];
			doc.data()['comments'].forEach((element) => {
				commentsArr.push(element);
			});
			setAllComments(commentsArr);
		});
		return () => {
			discPostCommentsData();
		};
	}, []);

	// console.log(props.post.discussionId);

	return (
		<div className='discussion-post mb-3 py-3 mx-auto '>
			<div className='row mb-2 d-flex align-items-start gx-0'>
				<div className='col-2 text-center mt-1'>
					<img src={postOwner.photoURL} alt='' />
				</div>
				<div className='col-10 '>
					<div className='d-flex align-items-center ms-0'>
						<p className='mb-0 me-2 fw-bold text-capitalize'>{postOwner.displayName}</p>
						{postOwner?.specialFlags?.isInstructor && <img className='inst-badge' src={Instructor} alt='Instructor' title='Instructor' />}
					</div>
					<p className='text-muted m-0 description'>{postOwner.description || 'No description yet'}</p>
				</div>
			</div>
			<div className='mb-1 post-body'>
				<p className='w-100 mb-2'>{props.post.discussionContent}</p>
				<div className='d-flex align-items-center w-100'>
					{isLiked ? (
						<p className='pe-4 mb-0 interact-icon text-primary' onClick={handleLike}>
							Liked
						</p>
					) : (
						<p className='pe-4 mb-0 interact-icon' onClick={handleLike}>
							Like
						</p>
					)}
					<p className='pe-2 mb-0 interact-icon' onClick={handleReply}>
						Reply
					</p>
				</div>
			</div>
			<hr className='m-0' />
			{replyFlag && (
				<div className='reply mx-auto py-2 px-3'>
					<div className='row'>
						<div className='col-2'>
							<BsArrowReturnRight className='reply-arrow' />
						</div>
						<div className='col-9 reply-input pt-2'>
							<div className='row'>
								<div className='col-2 text-center px-1'>
									<img src={currentUser?.photoURL} alt='' />
								</div>
								<div className='col-8 d-flex align-items-center flex-column'>
									<p className='mb-1 w-100 fw-bold text-capitalize'>{currentUser?.displayName}</p>
									<div className='w-100'>
										<textarea type='text' className='input-text w-100 py-1 px-2' maxLength={100} ref={CommentInputRef} />
									</div>
								</div>
								<div className='col-1 text-end d-flex flex-column-reverse pb-4'>
									<AiOutlineSend className='fs-5 submit-icon' onClick={addCommnetValue} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='comments'>
				{allComments.map((comment, i) => {
					return (
						<div key={i}>
							<Discussioncomment comment={comment} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
