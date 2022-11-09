import { Link } from 'react-router-dom';
import './coursecard.scss';
import { BsBoxArrowInRight, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export const Coursecard = (props) => {
	const rating = (value) => {
		let rate = (value / 100) * 5;
		return Math.round(rate * 2) / 2;
	};
	return (
		<>
			<div className='course  shadow-sm '>
				<div className='course_img'>
					<img src={props.course.courseImg} alt='course_img' />
				</div>
				<div className='course_title  '>
					<h5 className=''>{props.course.courseTitle}</h5>
				</div>
				<div className='course_body d-flex justify-content-between align-items-center '>
					<div className='rating'>
						{Array(5)
							.fill(0)
							.map((_, index) => {
								if (rating(props.course.courseRating) >= index + 1) {
									return <BsStarFill className='gold' size={20} key={index} />;
								} else if (rating(props.course.courseRating) - index === 0.5) {
									return <BsStarHalf className='gold' size={20} key={index} />;
								} else {
									return <BsStar className='gold' size={20} key={index} />;
								}
							})}
					</div>

					<Link to={`/eduMates/courses/nasif/1`} className='text-dark'>
						<div className='start_course_icon'>
							<BsBoxArrowInRight size={35} />
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};
