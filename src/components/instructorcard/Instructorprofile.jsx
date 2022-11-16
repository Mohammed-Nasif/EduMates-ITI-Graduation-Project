import './instructorcard.scss';
import { Link } from 'react-router-dom';

export const InstructorProfile = ({ instructor }) => {
	return (
		<>
			<div className='instructor_profile  text-center py-1 px-1  '>
				<div className='instructor_img mx-auto my-0 p-0  '>
					<img src={instructor.photoURL} alt='instructor_photo ' />
				</div>
				<div className='instructor_info p-0 m-0 mt-1'>
					<h6 className='text-capitalize'>{instructor.displayName}</h6>
					<p className='text-secondary px-2 '>{instructor.description}</p>
				</div>
				<div className='follow_btn'>
					<Link to={`/eduMates/profile/${instructor.displayName}/${instructor.uid}`}>
						<button>View Profile</button>
					</Link>
				</div>
			</div>
		</>
	);
};
