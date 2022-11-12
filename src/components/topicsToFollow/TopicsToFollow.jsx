import { useContext } from 'react';
//import swipper and dependencies
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
//scss
import './TopicsToFollow.scss';

import { TopicsContext } from '../../context/TopicsContext';

export const TopicsToFollow = () => {
	const { courses } = useContext(TopicsContext);
	// console.log(courses)
	return (
		<>
			<div className=" card shadow-sm  topics-suggestion-layout  rounded-4 p-0 m-0">
				<h4 className="fw-bold ps-3 fs-6 pt-2">Discover Our Courses</h4>
				<div>
					<Swiper
						spaceBetween={30}
						centeredSlides={true}
						loop={true}
						autoplay={{
							delay: 3500,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Navigation]}
						className="mySwiper"
					>
						{/* {courses.map((course, i) => {
							return (
								<SwiperSlide className="" key={i}>
									<div className="preview-course p-0 m-0">
										<div className="course_img">
											<img src={course.courseImg} alt="" className="w-100" />
											<div className="overlay d-flex justify-content-center align-items-center p-0 m-0">
												<h4>{course.courseTitle}</h4>
											</div>
										</div>
										<div className="course_details text-center p-1">
											<p className="fw-bold mb-1">{course.courseTitle}</p>
											<Link to="/courses">
												<button className="btn btn-outline-primary px-4 py-1 mb-2">Join Now</button>
											</Link>
										</div>
									</div>
								</SwiperSlide>
							);
						})} */}
					</Swiper>
				</div>
			</div>
		</>
	);
};
