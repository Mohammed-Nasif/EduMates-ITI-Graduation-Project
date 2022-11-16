import Select from 'react-select';
import './lessonlistmob.scss';
import { useState } from 'react';
import { useEffect } from 'react';



export const LessonslistMob = (props) => {
    let options = [];
    const [lessonNumState, setLessonNumState] = useState(0);
    const [flag, setFLag] = useState(false);
    useEffect(()=>{
        if(flag === false){
            setLessonNumState(props.lessonNum)
        }else{
            setFLag(false);
        }
    },[props.lessonNum])
  
    const handleSelectOptions = (e)=>{

        props.selectedLesson(e.value);
        setLessonNumState(e.value);
    }
    props.lessonsList.forEach((el,i)=>{
        options.push({value: i, label: `Lesson ${i+1}: ${el.lessonTitle}`});
    })
    
    // function to get next lesson on clicking next right arrow 
    const handleNextLesson = (e)=>{
        if(lessonNumState < props.lessonsList.length-1){
            setLessonNumState(lessonNumState +1);
            setFLag(true);
            props.selectedLesson(lessonNumState+1);
        }
    }

    // function to get prev lesson on clicking  left arrow 
    const handlePrevLesson = ()=>{
        if(lessonNumState >0){
            setLessonNumState(lessonNumState - 1);
            props.selectedLesson(lessonNumState-1);
            setFLag(true);
        }
    }

    return (
        <div className='row d-flex align-items-baseline mt-5 w-75 mx-auto'>
            <p className='col-2' onClick={handlePrevLesson}> {`< prev`} </p>
            <div className='col-7'>
                <Select className='mx-5 select' options={options} onChange={(e)=>handleSelectOptions(e)}/>
            </div>
            <p className='col-2' onClick={handleNextLesson}> {` next >`} </p>
            {lessonNumState}
        </div>
    )
}

