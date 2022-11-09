import { useContext } from 'react'
import { Coursescategories } from '../../components/coursescategories/Coursescategories'
import logo from './Classroom.svg'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { TopicsContext } from '../../context/TopicsContext'

export const Classroom = () => {
  const { courses } = useContext(TopicsContext)
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
              {courses.map((course, i) => {
                return (
                  <div className='col-lg-6  col-sm-12 ' key={i}>
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
        <div className='course_img'>
          <img src={props.course.courseImg} alt='course_img' />
        </div>
        <div className='course_title  '>
          <h5 className=''>{props.course.courseTitle}</h5>
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
