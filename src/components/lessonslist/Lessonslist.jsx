import './lessonslist.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import {BsFillCircleFill, BsCheckLg} from "react-icons/bs";
import coursesapi from "./../../coursesAPI/coursesapi";
import { AuthContext } from '../../context/AuthContext';
import {Rating} from './../rating/Rating';


export const Lessonslist = (props) => {
    const { currentUser } = useContext(AuthContext); 
    const [lessonState, setLessonState] = useState(undefined);
    const [flag, setFLag] = useState(false);
    const [activeLessons, setActiveLessons] = useState([]);  // get the initial value from firebase (array of finished lessons)
    const apiSeenLessons = useRef();
    const combId = `${currentUser?.uid}-${props.courseId}`;

    // get data from api
    const getDataFromApi = async (endpoint, path) => {
        const response = await coursesapi.get(`/${endpoint}/${path}`);
        // console.log(response.data);
        return response.data;
    };
    // update seenlessonslist
    const updateSeenLessonslist = async (endPoint, path, request)=>{
        const response = await coursesapi.patch(`/${endPoint}/${path}`, request);
        if(response && response.data){
        //   console.log(response.data);
        }
      }

    useEffect(()=>{
        const getSeenLessons = async () => {
            const data = await getDataFromApi('usercourses',combId );
            if (data) { 
                // console.log(data.seenlessons);
                apiSeenLessons.current = data.seenlessons;
                // setLessonState(data.lastLesson);
                // console.log("lastlesson from api: ", data.lastLesson);
            }
            else{
                console.log("ERROR");
                apiSeenLessons.current = [];  // set prev-value
            }
            setActiveLessons(apiSeenLessons.current);
            // console.log(apiSeenLessons.current);
        };
          getSeenLessons();
    }, [])

    useEffect(()=>{
        // when select lessons from lessonslistMob component:
        if(flag === false){
            setLessonState(props.lessonNum);
            // console.log(props.lessonNum);
            let actLessons = [];
            if(!actLessons.includes(props.lessonNum)){
                actLessons.push(props.lessonNum);
            }
            document.getElementById(`${props.lessonNum}`).scrollIntoView();
        }
        else{    // selected lesson from this component (lessonslist)
            setFLag(false);
        }

        if (apiSeenLessons.current !== undefined){
            if (apiSeenLessons.current.length === 0){
                apiSeenLessons.current.push(0);
                setActiveLessons([...apiSeenLessons.current]);
            }
        }
        // console.log("mobile: ", apiSeenLessons.current);

    },[props.lessonNum, apiSeenLessons.current])

    // Get the progress of the course  inputs: array of allLessons, array of active lessons   output: number
    const CalculateProgress = (actLessonsArr, allLessonsArr)=>{
        return (actLessonsArr.length/allLessonsArr.length) * 100;
    }


    const handleSelectLesson = (i)=>{
        props.selectedLesson(i);          // send the lessonNum to parent (communication between components)
        setLessonState(i);
        setFLag(true);
        let actLessons = apiSeenLessons.current;
        if(!actLessons.includes(i)){
            actLessons.push(i);
            apiSeenLessons.current = actLessons;
            setActiveLessons(apiSeenLessons.current);
            // console.log("lastlesson: ", i);
            const progress = Math.floor(CalculateProgress(activeLessons, props.lessonsList));
            const lessonsRequest = {
                "seenlessons": apiSeenLessons.current,
                "progress": progress,
                "lastLesson": i
            }
            updateSeenLessonslist('usercourses',combId, lessonsRequest);
        }
        // console.log("list: ", activeLessons)
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
                            <p key={i}  id={i} className={ lessonState === i ? 'active py-3 mb-0' : 'py-3 mb-0' } onClick={()=>handleSelectLesson(i)}>
                                {`lesson ${lesson.lessonNum}: `}
                                {lesson.lessonTitle}
                            </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Rating courseId = {props.courseId}/>
        </div>
    )
}


