import { useState, useEffect } from 'react';
import './lessonslist.scss';
import {BsFillCircleFill, BsCheckLg} from "react-icons/bs";

export const Lessonslist = (props) => {
    // console.log(props);
    const [lessonState, setLessonState] = useState(undefined);
    const [flag, setFLag] = useState(false);
    let [activeLessons, setActiveLessons] = useState([]);  // get the initial value from firebase (array of finished lessons)
    useEffect(()=>{
        if(flag === false){
            setLessonState(props.lessonNum);
            let actLessons = activeLessons;
            if(!actLessons.includes(props.lessonNum)){
                actLessons.push(props.lessonNum);
                setActiveLessons([...actLessons]);
            }
        }else{
            setFLag(false);
        }
    },[props.lessonNum])

    const handleSelectLesson = (i)=>{
        props.selectedLesson(i);
        setLessonState(i);
        setFLag(true);
        let actLessons = activeLessons;
        if(!actLessons.includes(i)){
            actLessons.push(i);
            setActiveLessons([...actLessons]);
        }
        console.log(activeLessons);
    }
    return (
        <div className='lessonslist p-4'>
            <div>{props.courseTitle}</div>
            <hr />
            <div className={props.lessonsList.length > 5?'list scorll' : 'list' }>
                {props.lessonsList.map((lesson,i)=>{
                    return(
                        <div key={i} className='row d-flex align-items-center w-100 lesson-name'>
                            <div className="col-1 position-relative">
                               {
                                activeLessons.includes(i)?
                                <BsCheckLg className='circle-icon text-success'/>:
                                <BsFillCircleFill className='circle-icon'/>
                               } 
                            </div>
                            <div className="col-10 ">
                            <p key={i} className={ lessonState === i ? 'active py-3 mb-0' : 'py-3 mb-0' } onClick={()=>handleSelectLesson(i)}>
                                {`lesson ${lesson.lessonNum}: `}
                                {lesson.lessonTitle}
                            </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

