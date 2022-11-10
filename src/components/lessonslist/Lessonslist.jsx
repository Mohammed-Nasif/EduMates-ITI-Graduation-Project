import './lessonslist.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import {BsFillCircleFill, BsCheckLg} from "react-icons/bs";
import coursesapi from "./../../coursesAPI/coursesapi";
import { AuthContext } from '../../context/AuthContext';


export const Lessonslist = (props) => {
    const { currentUser } = useContext(AuthContext); 
    const [lessonState, setLessonState] = useState(undefined);
    const [flag, setFLag] = useState(false);
    const [activeLessons, setActiveLessons] = useState([]);  // get the initial value from firebase (array of finished lessons)
    const apiSeenLessons = useRef();
    const allUserCourses = useRef();

    // get data from api
    const getDataFromApi = async (endpoint, path) => {
        const response = await coursesapi.get(`/${endpoint}/${path}`);
        console.log(response.data);
        return response.data;
    };
    // update seenlessonslist
    const updateSeenLessonslist = async (endPoint, path, request)=>{
        const response = await coursesapi.patch(`/${endPoint}/${path}`, request);
        if(response && response.data){
          console.log(response.data);
        }
      }

    useEffect(()=>{
        const getSeenLessons = async () => {
            const data = await getDataFromApi('users', currentUser.uid);
            if (data) {
                allUserCourses.current = data.courses;
                const userCourse = data.courses.filter((course)=>{
                    return course.id === props.courseId;
                }) 
                apiSeenLessons.current = userCourse[0].seenlessons;
            }
            else{
                console.log("ERROR");
                apiSeenLessons.current = [];  // set prev-value
            }
            setActiveLessons(apiSeenLessons.current);
            console.log(apiSeenLessons.current);
        };
          getSeenLessons();
    }, [])

    useEffect(()=>{
        // when select lessons from lessonslistMob component:
        if(flag === false){
            setLessonState(props.lessonNum);
            // let actLessons = apiSeenLessons.current;
            let actLessons = [];
            if(!actLessons.includes(props.lessonNum)){
                actLessons.push(props.lessonNum);
                // setActiveLessons([...actLessons]);
                // apiSeenLessons.current.push(props.lessonNum);
                // activeLessons.current = actLessons;
            }
        }
        else{    // selected lesson from this component (lessonslist)
            setFLag(false);
        }

        if (apiSeenLessons.current !== undefined){
            if (apiSeenLessons.current.length === 0){
                apiSeenLessons.current.push(0);
                setActiveLessons([...apiSeenLessons.current]);
                // const testRequest = {
                //     ???
                // }
                
                // updateSeenLessonslist('users', currentUser.uid, testRequest); // path ??
            }
        }
        console.log("mobile: ", apiSeenLessons.current)

    },[props.lessonNum, apiSeenLessons.current])

    const handleSelectLesson = (i)=>{
        props.selectedLesson(i);          // send the lessonNum to parent (communication between components)
        setLessonState(i);
        setFLag(true);
        let actLessons = apiSeenLessons.current;
        if(!actLessons.includes(i)){
            actLessons.push(i);
            // setActiveLessons([...actLessons]);
            apiSeenLessons.current = actLessons;
            // apiSeenLessons.current.push(props.lessonNum);
            setActiveLessons(apiSeenLessons.current);
        }
        console.log("list: ", activeLessons)
    }

    // console.log(apiSeenLessons.current);
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


