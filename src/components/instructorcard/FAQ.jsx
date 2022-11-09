import './instructorcard.scss';
import { Link } from 'react-router-dom';

export const FAQ = () => {
	return <>
	<div className="FaQ text-center pb-5 pt-2">
		<p className='text-dark fs-6 m-1'>Have More Questions?</p>
		<Link className='fs-6 fw-bold text-dark'>FAQ</Link>
	</div>
	</>;
};
