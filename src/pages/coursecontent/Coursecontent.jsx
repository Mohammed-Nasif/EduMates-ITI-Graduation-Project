import { useEffect, useState } from "react";
import  coursesDB  from './../../database/db.json';
import { Lessonslist } from "./../../components/lessonslist/Lessonslist";
import { LessonDisplay } from "./../../components/lessondisplay/LessonDisplay";
import { LessonslistMob } from "../../components/lessonslistmob/LessonslistMob";
import { Coursediscussion } from "./../../components/coursediscussion/Coursediscussion"
import './coursecontent.scss';
import {useParams} from 'react-router-dom';


export const Coursecontent = () => {
    const [lessonIndex, setlessonIndex] = useState(0);
    const {courseId} = useParams();
    const course = coursesDB.courses[courseId];


    // function to render lesson on selecting it
    const onSelectLesson = (lessonNum)=> {
        setlessonIndex(lessonNum);
    } 

    return (
        <div className="row ps-4 py-5 w-100 mx-auto coursecontent">
            <div className="col-lg-7 col-sm-12 ">
                <div className="mb-5">
                    <LessonDisplay  lessoncontent={course.lessonsList[lessonIndex]}></LessonDisplay>
                </div>
                <div>
                    <Coursediscussion/>
                </div>
            </div>
            <div className="col-lg-4 col-sm-12 normal-content-list">
                <Lessonslist  lessonNum={lessonIndex} courseTitle={course.courseName} lessonsList={course.lessonsList} selectedLesson={onSelectLesson}/>
            </div>
            <div className="mobile-content-list" >
                {lessonIndex}
                <LessonslistMob lessonNum={lessonIndex} lessonsList={course.lessonsList} selectedLesson={onSelectLesson}/>
            </div>
        </div>
    )
}


// "classroom":{
//     "userID": [
//         {
//             "courseID"
//             "courserating"
//             "lastlesson"
//             "progress"
//         }
//      ]
    
// }