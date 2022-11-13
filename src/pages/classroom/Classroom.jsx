import { useContext } from 'react';
import { Coursescategories } from '../../components/coursescategories/Coursescategories';
import logo from './Classroom.svg';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import coursesapi from './../../coursesAPI/coursesapi';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/loader/Loader';
import empty from '../../assets/images/classroom-empty.svg';

export const Classroom = () => {
	const { currentUser } = useContext(AuthContext);
	const [allCoursesId, setAllCoursesId] = useState([]);
	const [userCourses, setUserCourses] = useState([]);
	const [progressMap, setProgressMap] = useState({});
	const [lastLessonMap, setLastLessonMap] = useState({});
	const allUserCourses = useRef();
	const [loading, setLoading] = useState(true);

	// GET REQUEST WITH END POINT AND PATH
	const getDataFromApi = async (endpoint, path) => {
		const response = await coursesapi.get(`/${endpoint}/${path}`);
		setLoading(false);
		// console.log(response);
		return response.data;
	};

	// GET REQUEST WITH END POINT
	const getEntityDataFromApi = async (endpoint) => {
		const response = await coursesapi.get(`/${endpoint}`);
		return response.data;
	};

	useEffect(() => {
		let allcourses = [];
		let courses = [];
		let courseProgress = {};
		let courseLastLesson = {};

		const getCourses = async () => {
			const allcoursesData = await getEntityDataFromApi('courses');
			const userCoursesData = await getEntityDataFromApi('usercourses');
			const coursesIdFromApi = await getDataFromApi('users', currentUser?.uid);
			if (allcoursesData && coursesIdFromApi.courses && userCoursesData) {
				// console.log(coursesIdFromApi)
				allcourses = allcoursesData;
				courses = allcourses.filter((course) => {
					return coursesIdFromApi.courses.includes(course.id);
				});

				userCoursesData.forEach((course) => {
					courseProgress[course.courseId] = course.progress;
					courseLastLesson[course.courseId] = course.lastLesson;
				});
				// console.log(courseProgress);
				setProgressMap(courseProgress);
				setLastLessonMap(courseLastLesson);
				setUserCourses(courses);
			}
		};

		getCourses();
	}, []);
	// console.log("courses", userCourses);

	return (
		<>
			<div className="container-fluid py-3 ">
				<div className="heading ps-4 py-1 mb-2">
					<img src={logo} alt="Logo" />
				</div>
				<div className="row justify-content-around">
					<div className="col-8">
						<div className="row g-5 justify-content-around ">
							{loading && <Loader />}
							{!loading && userCourses.length === 0 && (
								<div>
									{' '}
									<h2 className="text-center text-muted mt-3">Nothing here</h2> <img src={empty} alt="" />{' '}
								</div>
							)}
							{userCourses.length > 0 &&
								userCourses.map((course, i) => {
									return (
										<div className="col-lg-6  col-sm-12" key={i}>
											{/* {console.log(allUserCourses.current)} */}
											<CurrentCourse course={course} progress={progressMap} lastLesson={lastLessonMap} />
										</div>
									);
								})}
						</div>
					</div>
					<div className="col-3">
						<Coursescategories />
					</div>
				</div>
			</div>
		</>
	);
};

export const CurrentCourse = (props) => {
	return (
		<>
			<div className="course classroomCard shadow-sm ">
				<div className="course_img w-75 mx-auto pt-3">
					<img src={props.course.lessonsList[props.lastLesson[props.course.id]].lessonThumbnail.url} alt="course_img" />
				</div>
				<div className="course_title  ">
					<Link to={`/eduMates/classroom/${props.course.courseName}/${props.course.id}`} className="text-decoration-none text-dark">
						<h5>{props.course.courseName}</h5>
					</Link>
					{/* <h5 className=''>{props.course.courseTitle}</h5> */}
				</div>
				{/* <div className=''>
          <span>
            lesson{props.course.currentLessonNum}:
            {props.course.currentLessonName}
          </span>
        </div> */}
				<div className="course_body ">
					<p className="mb-0 last-lesson">
						Last Lesson: <span>Lesson {props.lastLesson[props.course.id] + 1}</span>
					</p>
					<div className="progressBar py-3 ">
						<ProgressBar now={props.progress[props.course.id]} label={`${props.progress[props.course.id]}%`} visuallyHidden />
					</div>
				</div>
			</div>
		</>
	);
};
