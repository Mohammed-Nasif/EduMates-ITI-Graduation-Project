import './courselandingIframe.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
// import Iframe from 'react-iframe'
import ReactPlayer from 'react-player';
import { useState, useEffect, useContext } from 'react';
import coursesapi from './../../coursesAPI/coursesapi';
import { AuthContext } from '../../context/AuthContext';


export const CourselandingIframe = (props) => {
	const [courseRating, setCourseRating] = useState(0);
	const { currentUser } = useContext(AuthContext);
    const combId = `${currentUser.uid}-${props.courseId}`;

	const rating = (ratingArr) => {
		let rate = calculateRatingValue(ratingArr);
		return Math.round(rate * 2) / 2;
	};
	const calculateRatingValue = (ratingArr) => {
		let rateValue = 0;
		if (ratingArr.length === 0) {
			rateValue = 0;
		} else {
			ratingArr.forEach((el) => {
				rateValue += el;
			});
			rateValue = rateValue / ratingArr.length;
		}
		return Math.round(rateValue);
	};

	// get data from api to calculate the rating value
	const getDataFromApi = async (endpoint) => {
		try {
		const response = await coursesapi.get(`/${endpoint}`);
		return response.data;
		} catch (error) {
			console.log(error.response.status);
			return error.response.status;
		}
	};

	useEffect(() => {
		let ratingArr = [];
		let ratingValue = 0;
		const getCourseRating = async () => {
			const usersRating = await getDataFromApi('usercourses');
			if(usersRating){
				if (usersRating === 404) {
					// console.log("course not found");
					// missing endpoint
					ratingArr = [];
				} else {
					// store rating array
					usersRating.forEach((item)=>{
						if(item.courseId === props.courseId){
							ratingArr.push(item.userRating);
						}
					})
					// console.log("course exist", ratingArr );
				}
				if(ratingArr.length === 0){
					ratingValue = 0;
				}
				else{
					ratingValue = rating(ratingArr);
				}
				setCourseRating(ratingValue);
				// console.log(ratingValue);
			}
		};
		getCourseRating();
	}, []);

	return (
		<>
			<Courseheading courseName={props.courseName} courseRating={courseRating} />
			<>
				<div className='iframe_wrapper'>
					<ReactPlayer url={`https://www.youtube-nocookie.com/embed/${props.courseVideo}`} width='100%' controls={true} />
					<h4 className=''>Welcome To My Course!</h4>
				</div>
			</>
		</>
	);
};

export const Courseheading = (props) => {
	// const rating = (value) => {
	// 	let rate = (value / 100) * 5;
	// 	return Math.round(rate * 2) / 2;
	// };

  
	return (
		<>
			<div className='course_heading'>
				<h4 className='course_name'>{props.courseName}</h4>
				<div className='rating '>
					{Array(5)
						.fill(0)
						.map((_, index) => {
							if (props.courseRating >= index + 1) {
								return <BsStarFill className='gold' size={20} key={index} />;
							} else if (props.courseRating - index === 0.5) {
								return <BsStarHalf className='gold' size={20} key={index} />;
							} else {
								return <BsStar className='gold' size={20} key={index} />;
							}
						})}
				</div>
			</div>
		</>
	);
};
