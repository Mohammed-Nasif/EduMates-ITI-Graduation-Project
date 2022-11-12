import './courses.scss';
import { Coursecard } from '../../components/coursecard/Coursecard';
import { Coursescategories } from '../../components/coursescategories/Coursescategories';
import { Uploadcoursemenu } from '../../components/uploadYourCourse/Uploadcoursemenu';
import { useState, useEffect, useCallback } from 'react';
import coursesapi from './../../coursesAPI/coursesapi';
import { Loader } from '../../components/loader/Loader';

export const Courses = () => {
	const [loading, setLoading] = useState(true);

	let [allCourses, setAllCourses] = useState([]);
	let [userRatingMap, setuserRatingMap] = useState({});
	const [sortFlag, setSortFlag] = useState('');

	const getDataFromApi = async (endpoint) => {
		const response = await coursesapi.get(`/${endpoint}`);
		return response.data;
	};

	const handelSortCourses = useCallback((flag) => {
		setSortFlag(flag);
	}, []);

	useEffect(() => {
		let ratingMap = {};
		const getCourses = async () => {
			const allcoursesData = await getDataFromApi('courses');
			const usercoursesData = await getDataFromApi('usercourses');

			if (allcoursesData && usercoursesData) {
				setAllCourses(allcoursesData);

				allcoursesData.forEach((el) => {
					ratingMap[el.id] = [];
				});

				usercoursesData.forEach((el) => {
					ratingMap[el.courseId].push(el.userRating);
				});

				setuserRatingMap(ratingMap);
			}
			setLoading(false);
		};

		return () => {
			getCourses();
		};
	}, []);

	return (
		<>
			<div className="container-fluid  py-3 ">
				<h2 className="heading ps-3 py-1">courses</h2>
				<div className="row justify-content-around ">
					<div className="col-lg-8 col-md-6 col-sm-6  ">
						<div className="row g-5 flex-wrap">
							{loading && <Loader />}

							{allCourses &&
								allCourses.map((course, i) => {
									return (
										<div className="col-lg-6  col-sm-12 " key={i}>
											<div className="course">
												<Coursecard course={course} courseRating={userRatingMap[course.id]} />
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="col-lg-3 col-md-6    col-sm-5   m-md-0 ">
						<Coursescategories allCourses={allCourses} handelSortCourses={handelSortCourses} />
						<Uploadcoursemenu />
					</div>
				</div>
			</div>
		</>
	);
};
