import {BsPencil, BsCursorFill} from "react-icons/bs";
import {AiOutlineSend} from "react-icons/ai";
import { useState, useRef, useContext } from "react";
import './coursediscussion.scss';
import { Discussionpost } from './../discussionpost/Discussionpost';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebase';
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot, deleteDoc, Timestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

export const Coursediscussion = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [posts, setPosts] = useState([]);
    const postInputRef = useRef();
    const { currentUser } = useContext(AuthContext); 

    // firebase functions:
    const handlePostSubmit = async () => {
        const discussionPostId = uuid();
        try {
            if (postInputRef.current.value.trim() !== ''){
                let inputvalue = postInputRef.current.value.trim();
                console.log(currentUser.uid);
                await updateDoc(doc(db,'courseDiscussion', props.courseId),{
                   "discussions":arrayUnion(
                    {        // post
                        discussionId : discussionPostId,
                        discussionContent: inputvalue,
                        createdBy: currentUser.uid,
                        createdAt: Timestamp.now(),
                        likedBy: []
                    }
                   )
                });

                await setDoc(doc(db,'discussionComments', discussionPostId),{
                    comments: []
                });
                clean();
            }
        } catch(error){
            console.error(error);
        }
    }

    // function: clear all flags and values
    const clean = ()=>{
        postInputRef.current.value = "";
    };

    // function: set the input value 
    const handleInputValue = (e)=>{
        setIsActive(true);
        if(postInputRef.current.value.trim() !== ""){
            setValidInput(true);
        }
        else{
            setValidInput(false);
        }
    }
    // function: add post
    const handleAddPost = ()=>{
        let postsArr = posts;
        // console.log(postInputRef.current.value.length);
        if(postInputRef.current.value.trim() !== ""){
            postsArr.push(postInputRef.current.value);
            setPosts([...postsArr]);
        }
        setSubmitFlag(true);
        setIsActive(false);
        handlePostSubmit();
    }
  return (
    <div className="coursediscussion">
        <h3 className="mb-3">Discussion</h3>
        {/* add post */}
        <div className="row input-container pt-4 pb-2 px-4 mx-auto mb-4">
            <div className="col-1 text-end pe-0">
                <BsPencil/>
            </div>
            <div className="col-10">
            <textarea 
                type="text" 
                placeholder= "Write Something..."
                className="input-text border-0 w-100"
                maxLength={100}
                onChange = {(e)=> handleInputValue(e)}
                rows= {!isActive? 1: 3}
                ref ={postInputRef} />
            </div>
            { isActive &&
                <div className="col-1 text-end d-flex flex-column-reverse pb-1">
                <AiOutlineSend className={validInput?"fs-5 submit-icon": "fs-5 prev-click"} onClick={handleAddPost}/>
            </div>
            }
        </div>
        {
            submitFlag && 
            <div>
                {
                    posts.map((post,i)=>{
                        return(
                            <div key={i}>
                                <Discussionpost postContent={post}/>
                            </div>
                        )
                    })
                }
            </div>
        }
    </div>
  )
}


// Input: add comment       done
// post component           done
// like , reply buttons     done
// functionality of reply   done
// comment component        done
// firebase
// style and more features
