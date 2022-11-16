import './matessuggestion.scss';
import { useContext } from 'react';
import { UsersContext } from './../../context/UsersContext';
import { MatesWrapper } from './Mateswrapper';

export const MatesSuggestion = () => {
	const { allUsers } = useContext(UsersContext);
	return (
		<div className="component-layout mb-3 shadow-sm">
			<h4 className="fw-bold ps-3 pt-2 ">Mates you may know:</h4>
			<div className="suggs-wrapper">
				<MatesWrapper allUsers={allUsers} />
			</div>
		</div>
	);
};
