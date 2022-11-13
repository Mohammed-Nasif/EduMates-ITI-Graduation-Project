import './courselandingdetails.scss';
import { BsArrowDown } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import coursesapi from './../../coursesAPI/coursesapi';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';

export const Courselandingdetails = (props) => {
	const [isEnrolled, setIsEnrolled] = useState(false);
	const updateIsEnrolled = (value)=>{
		setIsEnrolled(value);
		// console.log("enrolled in parent: ", value);
	}
	return (
		<>
			<div className='course_landing_details py-4 w-100 shadow px-4'>
				<Coursedescription course={props.course} userData={props.userData} updateIsEnrolled={updateIsEnrolled} />
				<CourselessonsWrapper course={props.course} courseLessons={props.course.lessonsList} isEnrolled ={isEnrolled} />
			</div>
		</>
	);
};

export const Coursedescription = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [enrolledUsers, setEnrolledUsers] = useState(props.course.enrollment);
	const [enrolledCourses, setEnrolledCourses] = useState([]);
	const [isEnrolled, setIsEnrolled] = useState(false);
	let enrolledCoursesArr = useRef();
	const combID = `${currentUser?.uid}-${props.course.id}`;
	const [userData, setUserData] = useState({});

	const getDataFromApi = async (endpoint, path) => {
		try {
			const response = await coursesapi.get(`/${endpoint}/${path}`);
			// console.log(response.data);
			return response;
		} catch (error) {
			// console.log(error.response.status);
			return error.response.status;
		}
	};

	// post new element in seenlessons entity
	const add = async (endpoint, request) => {
		const response = await coursesapi.post(endpoint, request);
		// console.log(response);
		// console.log(response.data);
	};

	// delete
	const deleteLessosn = async (endpoint, path) => {
		const response = await coursesapi.delete(`/${endpoint}/${path}`);
		// console.log(response);
		// console.log(response.data);
	};

	useEffect(() => {
		const getUserData = async () => {
			const response = await getDataFromApi('users', currentUser.uid);
			if (response.data) {
				enrolledCoursesArr.current = response.data.courses;
				// console.log(enrolledCoursesArr.current);
			}
		};
		return () => {
			getUserData();
		};
	}, [currentUser.uid]);

	useEffect(() => {
		const checkenrollment = async () => {
			const data = await getDataFromApi('usercourses', combID);
			if (data === 404) {
				// console.log(false);
				setIsEnrolled(false);
			} else {
				// console.log(true);
				setIsEnrolled(true);
			}
		};
		return () => {
			checkenrollment();
		};
	}, [combID]);

	useEffect(()=>{
		props.updateIsEnrolled(isEnrolled);
	}, [isEnrolled])

	const updateEnrolled = async (endPoint, path, request) => {
		const response = await coursesapi.patch(`/${endPoint}/${path}`, request);
		if (response && response.data) {
			// console.log(response);
			// console.log(response.data);
		}
	};

	// check if the user enrolled in this course
	const checkCourseEnrollment = (arr) => {
		let coursesArr = [];
		coursesArr = arr?.filter((course, index) => {
			return course.id !== props.course.id;
		});

		if (arr) {
			if (arr.length > coursesArr.length) return true;
		} else {
			return false;
		}
	};

	const enroll = () => {
		// endpoint: courses
		let enrolledUsersArr = [];
		if (!isEnrolled) {
			// add
			if (enrolledCoursesArr.current) {
				if (!enrolledCoursesArr.current.includes(props.course.id)) {
					enrolledCoursesArr.current.push(props.course.id);
				}
			}
			add('usercourses', {
				id: combID,
				courseId: props.course.id,
				seenlessons: [0],
				lastLesson: 0,
				progress: 0,
				userRating: 0,
			});
			setIsEnrolled(true);
		} else {
			// remove
			const enrolledUsersArr = enrolledUsers;
			const idIndex = enrolledUsersArr.indexOf(currentUser.uid);
			enrolledUsersArr.splice(idIndex, 1);

			// console.log('before', enrolledCoursesArr.current);
			enrolledCoursesArr.current = enrolledCoursesArr.current.filter((courseId) => {
				return courseId !== props.course.id;
			});
			// console.log('after', enrolledCoursesArr.current);
			deleteLessosn('usercourses', combID);
			setIsEnrolled(false);
		}

		setEnrolledUsers([...enrolledUsersArr]);

		const enrollUserRequest = {
			courses: enrolledCoursesArr.current,
		};
		updateEnrolled('users', currentUser.uid, enrollUserRequest);
	};

	return (
		<>
			<div className='course_Description '>
				<div className='course_Details_heading d-flex justify-content-between align-items-center '>
					<h4 className='fs-2'>Course Description</h4>
					{isEnrolled ? (
						<button onClick={enroll} className='btn btn-outline-success '>
							enrolled
						</button>
					) : (
						<button onClick={enroll} className='btn btn-outline-success '>
							enroll <BsArrowDown />
						</button>
					)}
				</div>
				<div className='course_details py-4'>
					<p>{props.course.courseDescription}</p>
				</div>
			</div>
		</>
	);
};

export const CourselessonsWrapper = (props) => {
	// const { currentUser } = useContext(AuthContext);
	// const [userEnrolled, setUserEnrolled] = useState(false);
	// let combId = currentUser.uid + '-' + useParams().id;

	// const getDataFromApi = async () => {
	// 	try {
	// 		const response = await coursesapi.get('/usercourses');
	// 		response.data.forEach((res) => {
	// 			if (res.id === combId) setUserEnrolled(true);
	// 		});
	// 		return response;
	// 	} catch (error) {
	// 		return error.response.status;
	// 	}
	// };

	// useEffect(() => {
	// 	getDataFromApi();
	// }, []);

	return (
		<>
			<h4 className='fs-2 mb-4'>Lessons List</h4>
			<div className='course_lessons'>
				<ul className=''>
					{props.courseLessons.map((lesson, i) => {
						return <Courselesson lesson={lesson} key={i} lessonNum={i} userEnrolled={props.isEnrolled} course={props.course}/>;
					})}
				</ul>
			</div>
		</>
	);
};

export const Courselesson = ({ lesson, lessonNum, userEnrolled, course }) => {
	// console.log(userEnrolled)
	if (lessonNum === 0) {
		return userEnrolled ? (
			<li className='d-flex '>
				Lesson {lessonNum + 1 + ' | '} {lesson.lessonTitle}
			</li>
		) : (
			<li className='d-flex fw-bolder'>
				Lesson {lessonNum + 1 + ' | '} {lesson.lessonTitle}
			</li>
		);
	} else {
		return userEnrolled ? (
			<li className='d-flex align-items-center justify-content-between'>
				<Link to={`/eduMates/classroom/${course.courseName}/${course.id}`}
				className="d-flex align-items-center justify-content-between w-100">
					Lesson {lessonNum + 1 + ' | '} {lesson.lessonTitle} <FaLockOpen /></Link>
			</li>
		) : (
			<li className='text-muted d-flex align-items-center justify-content-between' style={{ cursor: 'not-allowed' }}>
				Lesson {lessonNum + 1 + ' | '} {lesson.lessonTitle} <FaLock />
			</li>
		);
	}
};
