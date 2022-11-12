import './courses.scss'
import { Coursecard } from '../../components/coursecard/Coursecard'
import { Coursescategories } from '../../components/coursescategories/Coursescategories'
import { Uploadcoursemenu } from '../../components/uploadYourCourse/Uploadcoursemenu'
// import { Children, createContext, useState } from 'react'
import { useState, useEffect } from 'react'
import coursesapi from './../../coursesAPI/coursesapi'

export const Courses = () => {
  let [allCourses, setAllCourses] = useState([])

  const getCoursesFromApi = async () => {
    const response = await coursesapi.get(`/courses`)
    // console.log(response.data);
    return response.data
  }
  useEffect(() => {
    const getCourses = async () => {
      const allcoursesData = await getCoursesFromApi()
      if (allcoursesData) setAllCourses(allcoursesData)
    }
    getCourses()
  }, [])
  console.log(allCourses)

  return (
    <>
      <div className='container-fluid  py-3 '>
        <h2 className='heading ps-3 py-1'>courses</h2>
        <div className='row justify-content-around '>
          <div className='col-lg-8 col-md-6 col-sm-6  '>
            <div className='row g-5 justify-content-around '>
              {allCourses &&
                allCourses.map((course, i) => {
                  return (
                    <div className='col-lg-6  col-sm-12 ' key={i}>
                      <div className='course'>
                        <Coursecard course={course} setAllCourses={setAllCourses} />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='col-lg-3 col-md-6    col-sm-5   m-md-0 '>
            <Coursescategories allCourses={allCourses} />
            <Uploadcoursemenu />
          </div>
        </div>
      </div>
    </>
  )
}
