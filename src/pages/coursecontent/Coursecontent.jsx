import "./coursecontent.scss";
import "./coursecontent.scss";
import { useEffect, useState, useContext } from "react";
// import  coursesDB  from './../../database/db.json';
import { Lessonslist } from "./../../components/lessonslist/Lessonslist";
import { LessonDisplay } from "./../../components/lessondisplay/LessonDisplay";
import { LessonslistMob } from "../../components/lessonslistmob/LessonslistMob";
import { Coursediscussion } from "../../components/coursediscussion/Coursediscussion";
import { useParams } from "react-router-dom";
import coursesapi from "./../../coursesAPI/coursesapi";
import { AuthContext } from '../../context/AuthContext';


export const Coursecontent = () => {
  const [lessonIndex, setlessonIndex] = useState(0);
  const [courseData, setCourseData] = useState({});
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext); 
  const combId = `${currentUser?.uid}-${id}`;

  // const course = coursesDB.courses[id];
  // const getCoursesFromApi = async () => {
  //   const response = await coursesapi.get(`/courses/${id}`);
  //   console.log(response.data);
  //   return response.data;
  // };

    // get data from api
    const getDataFromApi = async (endpoint, path) => {
        const response = await coursesapi.get(`/${endpoint}/${path}`);
        // console.log(response.data);
        return response.data;
    };

  useEffect(() => {
    const getCourse = async () => {
      const course = await getDataFromApi('courses', id);
      if (course) setCourseData(course);
    };
    getCourse();
  }, []);
  // console.log(courseData);

  useEffect(()=>{
    const getLastLesson = async () => {
        const data = await getDataFromApi('usercourses',combId );
        if (data) { 
            // console.log("lastlesson from api: ", data.lastLesson);
            setlessonIndex(data.lastLesson);
        }

    };
    getLastLesson();
}, [])

  // function to render lesson on selecting it
  const onSelectLesson = (lessonNum) => {
    setlessonIndex(lessonNum);
  };

  return (
    <>
      { courseData.id &&
        <div className="row ps-4 py-5 w-100 mx-auto coursecontent">
        <div className="col-lg-7 col-sm-12 ">
          <div className="mb-5">
            <LessonDisplay
              lessoncontent={courseData.lessonsList[lessonIndex]}
            ></LessonDisplay>
          </div>
          <div>
            <Coursediscussion courseId={id} />
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 normal-content-list">
          <Lessonslist
            courseId={id}
            lessonNum={lessonIndex}
            courseTitle={courseData.courseName}
            lessonsList={courseData.lessonsList}
            selectedLesson={onSelectLesson}
          />
        </div>
        <div className="mobile-content-list">
          {lessonIndex}
          <LessonslistMob
            lessonNum={lessonIndex}
            lessonsList={courseData.lessonsList}
            selectedLesson={onSelectLesson}
          />
        </div>
      </div>
      }
    </>
  );
};

// "classroom":{
//     "userID": [
//         {
//             "courseid"
//             "courserating"
//             "lastlesson"
//             "progress"
//         }
//      ]

// }
