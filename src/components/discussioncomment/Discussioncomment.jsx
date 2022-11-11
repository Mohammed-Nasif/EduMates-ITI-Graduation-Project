import './discussioncomment.scss';
import userImage from './../../assets/images/Default-avatar.jpg';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot, deleteDoc, Timestamp, setDoc,query,collection,orderBy } from 'firebase/firestore';





export const Discussioncomment = (props) => {
    const [commentOwner,setcommentOwner] = useState({})
    useEffect(()=>{
        const getOwnerData = onSnapshot(doc(db, 'users', props.comment.createdBy), (doc) => {
            console.log(doc.data())
            setcommentOwner(doc.data());
        });
        return () => {
			getOwnerData();
		};
    },[props.comment])
    return (
        <div className="discussion-comment mb-1 pt-1 pb-3 mx-auto ps-0">
            <div className='row p-3 comment d-flex align-items-baseline gx-0'>
                <div className='col-2 text-center pe-0'>
                    <img src={commentOwner.photoURL} alt="" />
                </div>
                <div className='col-5 d-flex align-items-center flex-column'>
                    <p className='mb-1 w-100 fw-bold user-name'>{commentOwner.displayName}</p>
                </div>
            </div>
            <p className='w-100 mb-0 ps-5 ms-4 comment-content'>{props.comment.commentContent}</p>
        </div>
    )
}