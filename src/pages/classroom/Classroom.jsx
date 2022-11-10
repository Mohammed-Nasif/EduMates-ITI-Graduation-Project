import { useContext } from 'react'
import { Coursescategories } from '../../components/coursescategories/Coursescategories'
import logo from './Classroom.svg'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { TopicsContext } from '../../context/TopicsContext'
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
// import coursesDB from './../../database/db.json'
import coursesapi from './../../coursesAPI/coursesapi';
import { AuthContext } from '../../context/AuthContext';


export const Classroom = () => {
  const { currentUser } = useContext(AuthContext); 
  const [allCoursesId, setAllCoursesId] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const allUserCourses = useRef();

  

  const getDataFromApi = async (endpoint, path)=>{
    const response = await coursesapi.get(`/${endpoint}/${path}`);
    // console.log(response.data);
    return response.data;
  }

  

  useEffect(()=>{
    const getCoursesId = async ()=>{
      const coursesIdFromApi = await getDataFromApi('users', currentUser.uid);
      if(coursesIdFromApi) {
        const coursesId = [];
        coursesIdFromApi.courses.forEach((obj)=>{
          coursesId.push(obj.id);
        })
        setAllCoursesId(coursesId);
      }
    }
    getCoursesId();
  }, []);
  console.log("ID: ", allCoursesId);


  useEffect(()=>{
    let courses = [];
    allCoursesId.forEach((courseId)=>{
      const getCourse = async ()=>{
        const courseData = await getDataFromApi('courses', courseId);
        if(courseData) {
          courses.push(courseData);
          setUserCourses(courses);
        }
      }
      getCourse();
    })
    allUserCourses.current = courses;
  }, [allCoursesId])
  console.log("courses", allUserCourses.current);

  // let coursesID = Object.keys(coursesDB.courses);
  // const { courses } = useContext(TopicsContext)
  //   console.log(courses)
  return (
    <>
      <div className='container-fluid py-3 '>
        <div className='heading ps-4 py-1 mb-2'>
          <img src={logo} alt='Logo' />
        </div>
        <div className='row justify-content-around'>
          <div className='col-8'>
            <div className='row g-5 justify-content-around '>
              {allUserCourses.current && 
                allUserCourses.current.map((course, i) => {
                return (
                  <div className='col-lg-6  col-sm-12' key={i}>
                    {console.log(course)}
                    <CurrentCourse course={course} />
                  </div>
                )
              })}
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
            now={props.course.progress}
            label={`${props.course.progress}%`}
            visuallyHidden
          />
        </div>
      </div>
    </>
  )
}
