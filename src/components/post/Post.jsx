import pp from './pp.png';
import postImg from './post-img.png';
import './post.scss';
import { BsHandThumbsUp, BsChatRightText, BsReplyAll, BsHash, BsHandThumbsUpFill } from 'react-icons/bs';
import { useState } from 'react';


export function Post() {
	const [isLiked, setIsLiked] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const handleLike = () => {
		setIsLiked((prev) => !prev);
	};
	return (
		<>
			<div className="post w-100 border border-1 bg-white rounded-4 mb-3">
				<div className="header p-4 pb-3 pt-2">
					{/* <small className='text-muted'>user shared this post</small> */}
					<div className="d-flex pt-2">
						<div className="user-photo rounded-circle overflow-hidden me-3">
							<img src={pp} alt="" className="w-100" />
						</div>
						<div className="name">
							<div className="user-name fw-bold">Mahmoud Magdy</div>
							<div className="user-description fw-light">Mahmoud Magdy</div>
						</div>
					</div>
				</div>
				<p className="px-4 mb-1 lh-sm">As a leader, It is important to not just see your own success, but focus on the success of others. </p>
				<div className="px-4 my-2">
					<a href="" className="tag border border-2 fw-semibold p-1 me-2 rounded-1 lh-sm">
						<strong>
							<BsHash className="fs-5" />
						</strong>
						TopicName
					</a>
				</div>
				<div className="post-image overflow-hidden d-flex justify-content-center">
					<img src={postImg} alt="" />
				</div>
				<div className="d-flex justify-content-around text-center">
					<div className="btn" onClick={handleLike}>
						{!isLiked ? (
							<>
								<BsHandThumbsUp className="icon" /> like
							</>
						) : (
							<>
								<BsHandThumbsUpFill className="icon" /> liked
							</>
						)}
					</div>
					<div
						className="btn"
						onClick={() => {
							setShowComments((prev) => !prev);
						}}
					>
						<BsChatRightText className="icon" /> comment
					</div>
					<div className="btn">
						<BsReplyAll className="icon" /> share
					</div>
				</div>
				{showComments && (
					<div className="comments w-100 border-top border-1 px-4 py-2">
						<div className="d-flex">
							<div className="user-photo">
								<img src={pp} alt="" />
							</div>
							<div className="comment-body">
								<div className="user-name fw-bold mb-1">Mahmoud Magdy</div>
								<p className="comment-txt lh-sm"> excepturi perspiciatis, laborum dignissimos enim iste nostrum, sequi perferendis provident, error adipisci aut laboriosam.</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

