import './courselandingdetails.scss'
import { BsArrowDown } from 'react-icons/bs'
import { useState, useContext, useEffect } from 'react'
import coursesapi from "./../../coursesAPI/coursesapi";
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';



export const Courselandingdetails = (props) => {
  return (
    <>
      <div className='course_landing_details py-4 w-100 shadow px-4'>
        <Coursedescription course = {props.course} userData={props.userData}/>
        <CourselessonsWrapper courseLessons={props.course.lessonsList}/>
      </div>
    </>
  )
}

export const Coursedescription = (props) => {
  const { currentUser } = useContext(AuthContext); 
	// const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolledUsers, setEnrolledUsers] = useState(props.course.enrollment);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  let enrolledCoursesArr = useRef(); 

  // console.log(enrolledCourses);
  const [userData, setUserData] = useState({});

  const getDataFromApi = async (endpoint, path) => {
    const response = await coursesapi.get(`/${endpoint}/${path}`);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDataFromApi('users', currentUser.uid);
      if (data) {
        setIsEnrolled(checkCourseEnrollment(data.courses));
        setUserData(data);
        setEnrolledCourses(data.courses);
        enrolledCoursesArr.current = data.courses;
        // console.log(enrolledCoursesArr.current);
      }
    };
    getUserData();
  }, []);

  const updateEnrolled = async (endPoint, path, request)=>{
    const response = await coursesapi.patch(`/${endPoint}/${path}`, request);
    if(response && response.data){
      console.log(response);
      console.log(response.data);
    }
  }

      // check if the user enrolled in this course
      const checkCourseEnrollment = (arr)=>{
        let coursesArr = []
        coursesArr = arr?.filter((course, index)=>{
          return course.id !== props.course.id;
        });
  
        if(arr){
          if(arr.length > coursesArr.length)
          return true;
        }
        else{
          return false;
        }
      }

      console.log("userData: ", userData.courses);

	const enroll = () => {
    // checkCourseEnrollment(userData.courses);
    // endpoint: courses
    let enrolledUsersArr = [];

    // endpoint: users
    // let enrolledCoursesArr = [];
    const newCourse = [{
      "id": props.course.id,
      "isenrolled": true,
      "userRating": 0,
      "lastLesson": 0,
      "seenlessons":[]
    }]
    // const enrollUserRequest = {
    //   "courses": {enrolledCoursesArr}
    // }
    if(!isEnrolled){
        // add
        enrolledUsersArr = [...enrolledUsers, currentUser.uid];
        enrolledCoursesArr.current = [...enrolledCoursesArr.current, ...newCourse];
        // enrolledCoursesArr.current.push(newCourse);
        // console.log("newArr: ", enrolledCoursesArr.current);
        setIsEnrolled(true);
    }
    else{
        // remove
      const enrolledUsersArr = enrolledUsers;
      const idIndex = enrolledUsersArr.indexOf(currentUser.uid);
      enrolledUsersArr.splice(idIndex, 1);

      console.log("before", enrolledUsersArr);
      enrolledCoursesArr.current = enrolledCoursesArr.current.filter((course)=>{
          return course.id !== props.course.id;
      })
      console.log("after",enrolledUsersArr);
      setIsEnrolled(false);
    }

    const enrollCourseRequest = {
      "enrollment": enrolledUsersArr
    }
    updateEnrolled('course', props.course.id, enrollCourseRequest);
    setEnrolledUsers([...enrolledUsersArr]);

    // console.log(enrolledCoursesArr.current)
    const enrollUserRequest = {
      "courses": enrolledCoursesArr.current
    }
    updateEnrolled('users', currentUser.uid, enrollUserRequest);
    setEnrolledCourses([...enrolledCoursesArr.current]);
		// setIsEnrolled((prev) => !prev);
	  }



    // checkCourseEnrollment(enrolledCourses);
  return (
    <>
      <div className='course_Description '>
        <div className='course_Details_heading d-flex justify-content-between align-items-center '>
          <h4 className='fs-2'>Course Description</h4>
		       { isEnrolled? <button  onClick={enroll} className='btn btn-outline-success ' >
              enrolled 
              </button>: <button  onClick={enroll} className='btn btn-outline-success ' >
                enroll <BsArrowDown />
              </button> 
           }
        </div>
        <div className='course_details py-4'>
          <p>
            {/* React is one of the best choices for building modern web
            applications. Its JavaScript library communicates changes on a User
            Interface to the browsers quickly, without having to re-render
            anything except the part of the display that needs to change. In
            less than 5 hours you will learn React JS basics using practical
            simple videos to build the main features in any e-commerce
            application, supported with illustrations and code files. */}

            {props.course.courseDescription}
          </p>
        </div>
      </div>
    </>
  )
}

export const CourselessonsWrapper = (props) => {
  // const lessons = [
  //   'Build a Weather App in React JS | React JS beginner Tutorial',
  //   'introduction',
  //   'set up',
  //   'elements',
  //   'grid system',
  //   '8',
  //   8
  // ]
  return (
    <>
      <h4 className='fs-2'>Lessons List</h4>
      <div className='course_lessons'>
        <ul className=''>
          {props.courseLessons.map((lesson, i) => {
            return <Courselesson lesson={lesson} key={i} />
          })}
        </ul>
      </div>
    </>
  )
}

export const Courselesson = ({ lesson }) => {
  return <li>{lesson.lessonTitle}</li>
}



/*
// users:[
  {
    "userid"
    "courses":[
      {
        courseid
        isenrolled
        userRating
        lastLesson
        seenlessons:[]
      }
    ]
  }
]

*/