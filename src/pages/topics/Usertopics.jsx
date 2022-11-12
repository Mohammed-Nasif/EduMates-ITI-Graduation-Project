import './topics.scss';
import {BsFillXCircleFill} from "react-icons/bs";
import React, { useState } from 'react';


export const Usertopics = (props)=>{
    let followedTopics = props.userTopics;
    let [isSelect, setIsSelect] = useState(undefined);
    let [hoverDelete, setHoverDelete] = useState(undefined);
  
    
    const handleSelectTopic = (topic, index)=>{
      setIsSelect(index);
      props.onSelectTopic(topic);
    }
    const handleHoverDelete = (topic, index)=>{
      setHoverDelete(index);
    }
    const handleMouseLeave = ()=>{
      setHoverDelete(undefined)
    }
    const handleDeleteTopic = (index)=>{
        if(index >= 0){
            let topic = props.userTopics[index];
            followedTopics = followedTopics.filter((item, i)=>{
                return i !== index;
            });
          props.onDeleteTopic(topic,followedTopics );
        }
    }
 
    return (
        <div className='subtopics-container w-100'>
			<p className='sub-title'>Your Topics: </p>
            <div className='user-topics'>
                <div className="row position-relative px-1 border border-2 shadow-sm rounded-3 bg-white mb-2 py-1 ">
                <div className="col-3 topic-container mb-2 ">
                    <div className='name-container'>
                        <p onClick={()=> handleSelectTopic("All",-1)} onMouseOver = {()=> handleHoverDelete("All", -1)} 
                            onMouseLeave={handleMouseLeave}
                        className={(isSelect === -1) || (hoverDelete === -1)? "topic-name active": "topic-name"} ># All</p>
                    </div>
                </div>
                    {
                        followedTopics?.map((topic, index)=>{
                        return (
                            <div className="col-3 topic-container mb-2 " key={index}>
                                <div className='name-container'>
                                    <p onClick={()=> handleSelectTopic(topic,index)} onMouseOver = {()=> handleHoverDelete(topic, index)} 
                                    onMouseLeave={handleMouseLeave}
                                    className= {(isSelect === index) || (hoverDelete === index)? "topic-name active": "topic-name"} 
                                    ># {topic}</p>
                                </div>
        
                                
                            </div>
                        )
                        })
                    }
                </div>
            <div className='icon-container d-flex align-items-center'>
            <BsFillXCircleFill 
                className= {isSelect >=0? "delete-icon fs-2 mb-1":"delete-icon fs-2 mb-1 prev-click"}
                onClick = {()=> handleDeleteTopic(isSelect)}/>
            </div>
            </div>
    </div>
    )
}