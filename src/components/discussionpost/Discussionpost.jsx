import './discussionpost.scss';
import userImage from './../../assets/images/Default-avatar.jpg';
import { useState, useRef } from 'react';
import {AiOutlineSend} from "react-icons/ai";
import {BsArrowReturnRight} from "react-icons/bs";
import { Discussioncomment } from './../discussioncomment/Discussioncomment'



export const Discussionpost = (props) => {
    const [userslikedPost, setUserslikedPost] = useState([]);   // usersID >>> send to firebase
    const [isLiked, setIsliked] = useState(false);
    const [replyFlag, setReplyFlag] = useState(false);
    const [commentFlag, setCommentFlag] = useState(false);
    const [comments, setComments] = useState([]);
    const CommentInputRef = useRef();

    // function: handle like action
    const handleLike = ()=>{
        isLiked? setIsliked(false): setIsliked(true);
    }
    // function: handle reply action
    const handleReply = ()=>{
        setReplyFlag(true);
    }
    // function: comment input
    const addCommnetValue = ()=>{
        let commentsArr = comments;
        if(CommentInputRef.current.value.length){
            commentsArr.push(CommentInputRef.current.value);
            setComments([...commentsArr]);
            setReplyFlag(false);
            setCommentFlag(true);
            console.log(comments);
        }
    }
    return (
        <div className="discussion-post mb-3 py-3 mx-auto ">
            <div className='row mb-3'>
                <div className='col-2 text-center'>
                    <img src={userImage} alt="" />
                </div>
                <div className='col-5 d-flex align-items-center flex-column'>
                    <p className='mb-1 w-100 fw-bold'>User name</p>
                    <p className='w-100 mb-0'>{props.postContent}</p>
                    <div className='d-flex align-items-center w-100'>
                        {
                            isLiked?
                            <p className='pe-4 mb-0 interact-icon text-primary' onClick={handleLike}>Liked</p>
                            :<p className='pe-4 mb-0 interact-icon' onClick={handleLike}>Like</p>
                        }
                        <p className='pe-2 mb-0 interact-icon' onClick={handleReply}>Reply</p>
                    </div>
                </div>
            </div>
            {
                replyFlag &&
                <div className='reply mx-auto py-2 px-3'> 
                    <div className="row">
                        <div className="col-2">
                            <BsArrowReturnRight className='reply-arrow'/>
                        </div>
                        <div className="col-9 reply-input pt-2">
                            <div className='row'>
                                <div className='col-2 text-center px-1'>
                                    <img src={userImage} alt="" />
                                </div>
                                <div className='col-8 d-flex align-items-center flex-column'>
                                    <p className='mb-1 w-100 fw-bold'>User name</p>
                                    <div className='w-100'>
                                    <textarea 
                                        type="text" 
                                        className="input-text w-100 py-1 px-2"
                                        maxLength={100}
                                        ref ={CommentInputRef} />
                                    </div>
                                </div>
                                <div className="col-1 text-end d-flex flex-column-reverse pb-4">
                                    <AiOutlineSend className="fs-5 submit-icon" onClick={addCommnetValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                commentFlag && 
                <div className='comments'>
                    {
                        comments.map((comment, i)=>{
                            return(
                                <div key={i}>
                                    <Discussioncomment commentContent = {comment}/>
                                </ div>
                            )
                        })
                    }

                </div>
            }
        </div>
    )
}