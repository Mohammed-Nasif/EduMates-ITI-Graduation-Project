import { useContext, useState, useEffect } from 'react';
//import swipper and dependencies
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
//scss
import './TopicsToFollow.scss';
import coursesapi from './../../coursesAPI/coursesapi';

import { TopicsContext } from '../../context/TopicsContext';
import { Loader } from '../loader/Loader';

export const TopicsToFollow = () => {
	const { courses } = useContext(TopicsContext);
	let [allCourses, setAllCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	// get courses data from api
	const getDataFromApi = async (endpoint) => {
		const response = await coursesapi.get(`/${endpoint}`);
		return response.data;
	};

	useEffect(() => {
		const getCourses = async () => {
			const allcoursesData = await getDataFromApi('courses');
			setLoading(false);

			if (allcoursesData) {
				setAllCourses(allcoursesData);
			}
		};
		getCourses();
	}, []);

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
						{loading && <Loader />}

						{allCourses.length > 0 &&
							allCourses.map((course, i) => {
								return (
									<SwiperSlide className='' key={i}>
										<div className='preview-course p-0 m-0'>
											<div className='course_img'>
												<img src={course.lessonsList[0].lessonThumbnail.url} alt='' className='w-100' />
												<div className='overlay d-flex justify-content-center align-items-center p-0 m-0'>
													<h4>{course.courseName}</h4>
												</div>
											</div>
											<div className='course_details text-center p-1'>
												<p className='fw-bold mb-1'>{course.courseName}</p>
												<Link to={`/eduMates/courses/${course.courseName}/${course.id}`}>
													<button className='btn btn-outline-primary px-4 py-1 mb-2'>Join Now</button>
												</Link>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
					</Swiper>
				</div>
			</div>
		</>
	);
};
