import './suggestedmate.scss';

export const Suggestedmate = (props) => {
	return (
		<div className="visible-section px-4 ">
			<div className="row py-2 g-3 d-flex align-items-center align-items-center ">
				<div className="col-9">
					<div className="row g-2">
						<div className="col-3 p-1 ">
							<img src={props.image} className="w-100" alt="profile pic" />
						</div>
						<div className="col-9 mt-0 py-2 ">
							<p className="fw-bold w-13">{props.name}</p>
							<p className="w-10">{props.friends}</p>
						</div>
					</div>
				</div>
				<div className="col-3 p-0 mb-2">
					<button className="btn btn-outline-info follow rounded-1">Follow</button>
				</div>
			</div>
		</div>
	);
};
