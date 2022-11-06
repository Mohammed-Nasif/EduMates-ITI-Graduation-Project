import './courselandingdetails.scss';
import { useState } from 'react';

export const Courselandingdetails = () => {
	const [isEnrolled, setIsEnrolled] = useState(false);
	return (
		<div>
			<Coursedescription />
			<CourselessonsWrapper />
		</div>
	);
};

export const Coursedescription = () => {
	return;
};

export const CourselessonsWrapper = () => {
	const lessons = [];
	return (
		<>
			{lessons.map((lesson, i) => {
				return <Courselesson lesson={lesson} key={i} />;
			})}
		</>
	);
};

export const Courselesson = ({ lesson }) => {
	return;
};
