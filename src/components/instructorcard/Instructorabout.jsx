import './instructorcard.scss';

export const Instructorabout = ({ about }) => {
	return (
		<>
			<div className='about_instructor py-3 text-center px-4 '>
				<h5>About instructor</h5>
				<div className='about_box  m-auto p-2 '>
					<p>{about}</p>
				</div>
			</div>
		</>
	);
};
