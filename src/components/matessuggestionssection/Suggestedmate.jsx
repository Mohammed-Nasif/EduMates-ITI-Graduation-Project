import './suggestedmate.scss';

export const Suggestedmate = (props) => {
	return (
		<div className='visible-section ps-4'>
			<div className='row pt-3 g-3 d-flex align-items-center'>
				<div className='col-8'>
					<div className='row g-2'>
						<div className='col-3'>
							<img src={props.image} className='w-100' alt='profile pic' />
						</div>
						<div className='col'>
							<p className='fw-bold pt-3 w-13'>{props.name}</p>
							<p className='w-10'>{props.friends}</p>
						</div>
					</div>
				</div>
				<div className='col-4'>
					<button className='btn btn-outline-info'>Follow</button>
				</div>
			</div>
		</div>
	);
};
