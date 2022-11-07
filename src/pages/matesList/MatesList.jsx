import './mateslist.scss';
import { useContext, useMemo } from 'react';
import { Mate } from '../../components/mate/Mate';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { AuthContext } from '../../context/AuthContext';

export const Mateslist = () => {
	const { currentUser } = useContext(AuthContext);

	const currUser = useMemo(() => {
		return currentUser;
	}, [currentUser]);

	return (
		<>
			<div className='mateslist ps-3 d-flex '>
				<main className=''>
					<h1 className='mb-4'>Mates List</h1>
					<Mateslistwrapper currUser={currUser} />
				</main>
				<aside className='fixed-top'>
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};

export const Mateslistwrapper = ({ currUser }) => {
	return (
		<div className='MatesList'>
			<div className='row'>
				{Object.keys(currUser).length !== 0 &&
					currUser.matesList.map((mateId) => {
						return (
							currUser.uid !== mateId && (
								<div className='col-xxl-3 col-lg-4 col-sm-6 mb-3' key={mateId}>
									<Mate mateId={mateId} currUser={currUser}></Mate>
								</div>
							)
						);
					})}
			</div>
		</div>
	);
};
