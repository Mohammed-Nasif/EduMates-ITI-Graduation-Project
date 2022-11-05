import pPhoto from '../../pp.jpg';
import cPhoto from '../../cp.jpg';
import Mate from '../../components/mate/Mate';
import './matesList.scss';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { useContext } from 'react';

export const MatesList = () => {
	const matesList = [
		{
			mateName: 'Samya Abdelrahman',
			description: 'student',
			coverPhoto: cPhoto,
			profilePhoto: pPhoto,
		},
		{
			mateName: 'Samya Abdelrahman',
			description: 'student',
			coverPhoto: cPhoto,
			profilePhoto: pPhoto,
		},
		{
			mateName: 'Samya Abdelrahman',
			description: 'student',
			coverPhoto: cPhoto,
			profilePhoto: pPhoto,
		},
		{
			mateName: 'Samya Abdelrahman',
			description: 'student',
			coverPhoto: cPhoto,
			profilePhoto: pPhoto,
		},
	];
	return (
		<>
			<div className="mateslist ps-3 d-flex ">
				<main className="">
					<h1 className='mb-4'>Mates List </h1>
					<div className="MatesList ">
						<div className="row">
							{matesList.map((mate, i) => {
								return (
									<div className="col-xxl-3 col-lg-4 col-sm-6 mb-3">
										<Mate key={i} name={mate.mateName} description={mate.description} cPhoto={mate.coverPhoto} pPhoto={mate.profilePhoto}></Mate>
									</div>
								);
							})}
						</div>
					</div>
				</main>
				<aside className="fixed-top">
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};

// export const MatesList = () => {
// 	// simulating data
// 	const matesList = [
// 		{
// 			mateName: 'Samya Abdelrahman',
// 			description: 'student',
// 			coverPhoto: cPhoto,
// 			profilePhoto: pPhoto,
// 		},
// 		{
// 			mateName: 'Samya Abdelrahman',
// 			description: 'student',
// 			coverPhoto: cPhoto,
// 			profilePhoto: pPhoto,
// 		},
// 		{
// 			mateName: 'Samya Abdelrahman',
// 			description: 'student',
// 			coverPhoto: cPhoto,
// 			profilePhoto: pPhoto,
// 		},
// 		{
// 			mateName: 'Samya Abdelrahman',
// 			description: 'student',
// 			coverPhoto: cPhoto,
// 			profilePhoto: pPhoto,
// 		},
// 	];
// 	return (
// 		<div className="MatesList ">
// 			<div className="row">
// 				{matesList.map((mate, i) => {
// 					return (
// 						<div className="col">
// 							<Mate key={i} name={mate.mateName} description={mate.description} cPhoto={mate.coverPhoto} pPhoto={mate.profilePhoto}></Mate>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };
