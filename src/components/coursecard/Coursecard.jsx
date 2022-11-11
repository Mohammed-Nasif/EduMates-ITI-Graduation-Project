import { Link } from 'react-router-dom';
import './coursecard.scss';
import { BsBoxArrowInRight, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export const Coursecard = (props) => {
	const rating = (ratingArr) => {
		let rate = calculateRatingValue(ratingArr)
		// let rate = (value / 100) * 5;
		console.log(rate)
		return Math.round(rate * 2) / 2;
	};
	const calculateRatingValue = (ratingArr)=>{
		let rateValue = 0; 
		if(ratingArr.length === 0){
			rateValue = 0;
		}else {
			console.log(ratingArr)
			ratingArr.forEach(el => {
				console.log(el)
				rateValue += el;
				console.log(rateValue)
			});
			console.log(ratingArr)
			rateValue = rateValue / ratingArr.length;
		}
		return Math.round(rateValue);

	}
	return (
		<>
			{console.log(props.courseRating)}
			<div className='course  shadow-sm '>
				<div className='course_img w-75 mx-auto pt-3'>
					<img src={props.course.lessonsList[0].lessonThumbnail.url} alt='course_img' />
				</div>
				<div className='course_title  '>
					<h5 className=''>{props.course.courseName}</h5>
				</div>
				<div className='course_body d-flex justify-content-between align-items-center '>
					<div className='rating'>
						{Array(5)
							.fill(0)
							.map((_, index) => {
								if (rating(props.courseRating) >= index + 1) {
									return <BsStarFill className='gold' size={20} key={index} />;
								} else if (rating(props.courseRating) - index === 0.5) {
									return <BsStarHalf className='gold' size={20} key={index} />;
								} else {
									return <BsStar className='gold' size={20} key={index} />;
								}
							})}
					</div>

					<Link to={`/eduMates/courses/${props.course.courseName}/${props.course.id}`} className='text-dark'>
						<div className='start_course_icon'>
							<BsBoxArrowInRight size={35} />
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};
