import './courselandingdetails.scss'

import { BsArrowDown } from 'react-icons/bs'
import { useState } from 'react'

export const Courselandingdetails = () => {
  return (
    <>
      <div className='course_landing_details py-4 w-100 shadow px-4'>
        <Coursedescription />
        <CourselessonsWrapper />
      </div>
    </>
  )
}

export const Coursedescription = () => {
	const [isEnrolled, setIsEnrolled] = useState(false)

	const enroll = () => {
		setIsEnrolled((prev) => !prev)
	  }
  return (
    <>
      <div className='course_Description   '>
        <div className='course_Details_heading d-flex justify-content-between align-items-center '>
          <h4 className='fs-2'>Course Description</h4>
		  {isEnrolled? <button  onClick={enroll}     className='btn btn-outline-success ' >
            enrolled 
          </button>: <button  onClick={enroll}     className='btn btn-outline-success ' >
            enroll <BsArrowDown />
          </button> }
        </div>
        <div className='course_details py-4'>
          <p>
            React is one of the best choices for building modern web
            applications. Its JavaScript library communicates changes on a User
            Interface to the browsers quickly, without having to re-render
            anything except the part of the display that needs to change. In
            less than 5 hours you will learn React JS basics using practical
            simple videos to build the main features in any e-commerce
            application, supported with illustrations and code files.
          </p>
        </div>
      </div>
    </>
  )
}

export const CourselessonsWrapper = () => {
  const lessons = [
    'Build a Weather App in React JS | React JS beginner Tutorial',
    'introduction',
    'set up',
    'elements',
    'grid system',
    '8',
    8
  ]
  return (
    <>
      <h4 className='fs-2'>Lessons List</h4>
      <div className='course_lessons'>
        <ul className=''>
          {lessons.map((lesson, i) => {
            return <Courselesson lesson={lesson} key={i} />
          })}
        </ul>
      </div>
    </>
  )
}

export const Courselesson = ({ lesson }) => {
  return <li>{lesson}</li>
}
