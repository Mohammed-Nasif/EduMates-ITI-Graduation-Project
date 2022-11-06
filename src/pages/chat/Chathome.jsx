import './chathome.scss';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';

export const Chathome = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className='row g-0 gap-5 ps-5 pt-5'>
			<div className='chat_main col-8 bg-white'>
				<div className='chat_nav w-100 row'>
					<div className='overflow-hidden col-3'>
						<img src={currentUser.photoURL} className='rounded-circle w-25' alt='User Pic' />
					</div>
					<div className='col-9'>
						<h2>{currentUser.displayName}</h2>
						<p>Active Now</p>
					</div>
				</div>
			</div>
			<div className='chat_side col-3 bg-white'>Side</div>
		</div>
	);
};
