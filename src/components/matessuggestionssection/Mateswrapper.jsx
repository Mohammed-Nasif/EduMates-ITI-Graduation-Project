import { Suggestedmate } from './Suggestedmate';

export const MatesWrapper = ({ allUsers }) => {
	return (
		<>
			{allUsers.map((sugUser) => {
				return <Suggestedmate key={sugUser.uid} sugUser={sugUser}></Suggestedmate>;
			})}
		</>
	);
};
