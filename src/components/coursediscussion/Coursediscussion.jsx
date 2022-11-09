import {BsPencil, BsCursorFill} from "react-icons/bs";
import {AiOutlineSend} from "react-icons/ai";
import { useState, useRef } from "react";
import './coursediscussion.scss';
import { Discussionpost } from './../discussionpost/Discussionpost'


export const Coursediscussion = () => {
    const [isActive, setIsActive] = useState(false);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [posts, setPosts] = useState([]);
    const postInputRef = useRef();

    // function: set the input value 
    const handleInputValue = (e)=>{
        setIsActive(true);
    }
    // function: add post
    const handleAddPost = ()=>{
        let postsArr = posts;
        // console.log(postInputRef.current.value.length);
        if(postInputRef.current.value.length){
            postsArr.push(postInputRef.current.value);
            setPosts([...postsArr]);
        }
        setSubmitFlag(true);
        setIsActive(false);
        postInputRef.current.value = "";
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
                <AiOutlineSend className="fs-5 submit-icon" onClick={handleAddPost}/>
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
