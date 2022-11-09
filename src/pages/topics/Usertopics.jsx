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
      let topic = props.userTopics[index];
      followedTopics = followedTopics.filter((item, i)=>{
          return i !== index;
      });
    props.onDeleteTopic(topic,followedTopics );
    }
 
    return (
        <div className='subtopics-container w-100'>
			<p className='sub-title'>Your Topics: </p>
            <div className='user-topics'>
                <div className="row position-relative px-3">
                    {
                        followedTopics?.map((topic, index)=>{
                        return (
                            <div className="col-3 topic-container mb-2" key={index}>
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
                className= "delete-icon fs-2 mb-1"
                onClick = {()=> handleDeleteTopic(isSelect)}/>
            </div>
            </div>
    </div>
    )
}