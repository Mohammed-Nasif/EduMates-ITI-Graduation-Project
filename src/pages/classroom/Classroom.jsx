import { useContext } from 'react'
import { Coursescategories } from '../../components/coursescategories/Coursescategories'
import logo from './Classroom.svg'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import coursesapi from './../../coursesAPI/coursesapi';
import { AuthContext } from '../../context/AuthContext';


export const Classroom = () => {
  const { currentUser } = useContext(AuthContext); 
  const [allCoursesId, setAllCoursesId] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const allUserCourses = useRef();
  

  
  // GET REQUEST WITH END POINT AND PATH
  const getDataFromApi = async (endpoint, path)=>{
    const response = await coursesapi.get(`/${endpoint}/${path}`);
    return response.data;
  }

  // GET REQUEST WITH END POINT 
  const getEntityDataFromApi = async (endpoint)=>{
    const response = await coursesapi.get(`/${endpoint}`);
    return response.data;
  }
   

  useEffect(()=>{
    let allcourses = [];
    let courses = [];
    let courseProgress = {};

    const getCourses = async ()=>{
      const allcoursesData = await getEntityDataFromApi('courses');
      const userCoursesData = await getEntityDataFromApi('usercourses');
      const coursesIdFromApi = await getDataFromApi('users', currentUser?.uid);
      if(allcoursesData && coursesIdFromApi.courses && userCoursesData) {
        // console.log(coursesIdFromApi)
        allcourses = allcoursesData;
        courses = allcourses.filter((course)=>{
          return coursesIdFromApi.courses.includes(course.id) ;
        })

        userCoursesData.forEach((course)=>{
          courseProgress[course.courseId] = course.progress;
        })
        // console.log(courseProgress);  
        setProgressMap(courseProgress);      
        setUserCourses(courses);
      }
    }

  
    getCourses();
   
  }, [])
  console.log("courses", userCourses);

  return (
    <>
      <div className='container-fluid py-3 '>
        <div className='heading ps-4 py-1 mb-2'>
          <img src={logo} alt='Logo' />
        </div>
        <div className='row justify-content-around'>
          <div className='col-8'>
            <div className='row g-5 justify-content-around '>
              {userCourses.length>0 && 
                userCourses.map((course, i) => {
                return (
                  <div className='col-lg-6  col-sm-12' key={i}>
                    {console.log(allUserCourses.current)}
                    <CurrentCourse course={course} progress = {progressMap} />
                  </div>
                )
              })
              // <div>
              //   {console.log(userCourses[0])}
              //   {console.log(userCourses[1])}
              //   <CurrentCourse course={userCourses[0]} />
              // <CurrentCourse course={userCourses[1]} />
              // </div>
              }
              
            </div>
          </div>
          <div className='col-3'>
            <Coursescategories />
          </div>
        </div>
      </div>
    </>
  )
}

export const CurrentCourse = props => {
  return (
    <>
      <div className='course  shadow-sm '>
        <div className='course_img w-75 mx-auto pt-3'>
          <img src={props.course.lessonsList[0].lessonThumbnail.url} alt='course_img' />
        </div>
        <div className='course_title  '>
        <Link to= {`/eduMates/classroom/${props.course.courseName}/${props.course.id}`}
        className="text-decoration-none text-dark"
        ><h5>{props.course.courseName}</h5></Link>
          {/* <h5 className=''>{props.course.courseTitle}</h5> */}
        </div>
        {/* <div className=''>
          <span>
            lesson{props.course.currentLessonNum}:
            {props.course.currentLessonName}
          </span>
        </div> */}

        <div className='course_body progressBar py-3 '>
          <ProgressBar
            now={props.progress[props.course.id]}
            label={`${props.progress[props.course.id]}%`}
            visuallyHidden
          />
        </div>
      </div>
    </>
  )
}
