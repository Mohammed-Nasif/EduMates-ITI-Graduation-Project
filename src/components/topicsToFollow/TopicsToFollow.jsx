
import { useContext } from 'react'
//import swipper and dependencies
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'
import { Link } from "react-router-dom"
//scss
import './TopicsToFollow.scss'

import { TopicsContext } from '../../context/TopicsContext'

export const TopicsToFollow = () => {
  const { courses } = useContext(TopicsContext)
  console.log(courses)
  return (
    <>
      <div className=' card shadow-sm  topics-suggestion-layout  rounded-4 p-0 m-0'>
        <h4 className='fw-bold ps-4 fs-6 pt-2'>Discover Our Courses</h4>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper'
          >
            {courses.map((course, i) => {
              return (
                <SwiperSlide className=''>
                  <div className='previewCourse p-0 m-0'>
                    <div className='course_img'>
                      <img src={course.courseImg} alt='' className='w-100' />
                      <div className='overlay d-flex justify-content-center align-items-center p-0 m-0'>
                        <h4>{course.courseTitle}</h4>
                      </div>
                    </div>
					<div className="course_details text-center p-1">
						<p className='fw-bold'>{course.courseTitle}</p>
           <Link to="/courses"> <button className='btn btn-outline-info'>join now</button></Link>
					</div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}
