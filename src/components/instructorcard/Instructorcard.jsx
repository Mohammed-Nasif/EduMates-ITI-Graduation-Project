import './instructorcard.scss';
import { InstructorProfile } from './Instructorprofile';
import { Instructorabout } from './Instructorabout';
import { FAQ } from './FAQ';
import { UsersContext } from './../../context/UsersContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import coursesapi from '../../coursesAPI/coursesapi';

// Col-3 - Sticky
export const Instructorcard = () => {
	const courseID = useParams().id;
	const { allUsers } = useContext(UsersContext);
	const [instructorUid, setInstructorUid] = useState('');
	const [instructor, setInstructor] = useState({});
	const [instructorAbout, setInstructorAbout] = useState('');

	const getDataFromApi = async () => {
		try {
			const { data } = await coursesapi.get(`/courses/${courseID}`);
			// console.log(data.courseInstructor.info);
			setInstructorAbout(data.courseInstructor.info);
			setInstructorUid(data.courseInstructor.userId);
			setInstructor(() => allUsers.find((user) => user.uid === data.courseInstructor.userId));
			return data;
		} catch (error) {
			return error.response.status;
		}
	};

	useEffect(() => {
		getDataFromApi();
		console.log(instructor);
	}, []);
	return (
		<>
			<div className='  instractor_wrapper pb-4   shadow-sm'>
				<InstructorProfile instructor={instructor} />
				<Instructorabout about={instructorAbout} />
				<FAQ />
			</div>
		</>
	);
};
