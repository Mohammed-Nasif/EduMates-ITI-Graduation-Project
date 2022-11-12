import { Instructorcard } from '../../components/instructorcard/Instructorcard';
import './courselanding.scss';
import { CourselandingIframe } from './../../components/courselandingIframe/CourselandingIframe';
import { Courselandingdetails } from './../../components/courselandingdetails/Courselandingdetails';
import { useParams } from 'react-router-dom';
import coursesapi from './../../coursesAPI/coursesapi';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/loader/Loader';

export const Courselanding = () => {
	const [loading, setLoading] = useState(true);
	const { currentUser } = useContext(AuthContext);
	const [courseData, setCourseData] = useState({});
	const [userData, setUserData] = useState({});
	const { id } = useParams();
	const testRef = useRef();
	let test = [];

	const getDataFromApi = async (endpoint, path) => {
		const response = await coursesapi.get(`/${endpoint}/${path}`);
		setLoading(false);

		return response.data;
	};

	useEffect(() => {
		const getCourse = async () => {
			const course = await getDataFromApi('courses', id);
			if (course) {
				setCourseData(course);
				// console.log(course.courseRating);
			}
		};
		return () => {
			getCourse();
		};
	}, [id]);

	return (
		<>
			<div className="container-fluid mt-3 py-3">
				<div className="row justify-content-around">
					{loading && <Loader />}

					{courseData.id && (
						<>
							<div className="col-8">
								<CourselandingIframe courseVideo={courseData.lessonsList[0].lessonID} courseName={courseData.courseName} courseRating={courseData.courseRating} courseId={courseData.id} />
								<Courselandingdetails course={courseData} userData={userData} />
							</div>
							<div className="col-3 pt-4">
								<Instructorcard />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};
