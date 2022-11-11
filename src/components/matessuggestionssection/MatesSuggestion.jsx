import './matessuggestion.scss';
import { useContext } from 'react';
import { UsersContext } from './../../context/UsersContext';
import { MatesWrapper } from './Mateswrapper';
// import { useState } from 'react';

export const MatesSuggestion = () => {
	const { allUsers } = useContext(UsersContext);
	// const [seeMore, setSeeMore] = useState(false);
	return (
		<div className="component-layout mb-3 shadow-sm">
			<h4 className="fw-bold ps-3 pt-2 ">People you may Know:</h4>
			{/* <div className={seeMore ? 'seemore' : 'seeless'}> */}
			<div className="suggs-wrapper">
				<MatesWrapper allUsers={allUsers} />
			</div>
			{/* <div className="show-more-section">
				<p className="link text-center pt-2" onClick={() => setSeeMore((prev) => !prev)}>
					{seeMore ? 'Show Less' : 'Show More'}
				</p>
			</div> */}
		</div>
	);
};
