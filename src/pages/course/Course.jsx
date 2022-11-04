import React from 'react'
import { Link } from 'react-router-dom'
import './course.scss'
import {
  BsBoxArrowInRight,
  BsStarFill,
  BsStarHalf,
  BsStar
} from 'react-icons/bs'

export const Course = props => {
  const rating = value => {
    let rate = (value / 100) * 5
    return Math.round(rate * 2) / 2
  }
  return (
    <>
      <div className='course  shadow '>
        <div className='course_img'>
          <img src={props.course.courseImg} alt='course_img' />
        </div>
        <div className='course_title  '>
          <h5 className=''>{props.course.courseTitle}</h5>
        </div>
        <div className='course_body d-flex justify-content-between align-items-center '>
          <div className='rating'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                if (rating(props.course.courseRating) >= index + 1) {
                  return <BsStarFill className='gold' size={20} />
                } else if (rating(props.course.courseRating) - index === 0.5) {
                  return <BsStarHalf className='gold' size={20} />
                } else {
                  return <BsStar className='gold' size={20} />
                }
              })}
          </div>
          <div className='start_course_icon'>
            <Link to='/courseDetails' className='text-dark'>
              <BsBoxArrowInRight size={35} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
