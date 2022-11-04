import './courses.scss'
import img1 from './jonas 3.png'
import img2 from './indian.png'
import img3 from './nassif.png'
import img4 from './jonas.png'
import { Course } from '../course/Course'
import { Topics } from '../topics/Topics'
import { UploadCourse } from './../uploadYourCourse/UploadCourse'

export const Courses = props => {
  const courses = [
    {
      courseImg: img1,
      courseTitle: 'Advanced CSS and Sass: Flexbox, Grid, Animations and More',
      courseRating: 92
    },
    {
      courseImg: img2,
      courseTitle: 'Java Programming for Complete Beginners',
      courseRating: 54
    },
    {
      courseImg: img3,

      courseTitle: 'Problem Solving with JavaScript! (LeetCode)',
      courseRating: 100
    },

    {
      courseImg: img4,
      courseTitle: 'JavaScript - The Complete Guide 2022 (Beginner + Advanced)',
      courseRating: 84
    }
  ]

  return (
    <>
      <div className='container  py-2 '>
        <h2 className='heading'>courses</h2>
        <div className='row justify-content-between'>
          <div className='col-lg-9 col-md-6 col-sm-6  '>
            <div className='row g-3'>
              {courses.map(course => {
                return (
                  <div className='col-lg-6  col-sm-12  '>
                    <div className='course'>
                      <Course course={course} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col-lg-3 col-md-6    col-sm-5   m-md-0 '>
            <Topics />
            <UploadCourse />
          </div>
        </div>
      </div>
    </>
  )
}
