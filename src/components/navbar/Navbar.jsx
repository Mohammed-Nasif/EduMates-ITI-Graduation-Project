import './navbar.scss';
import { Link } from 'react-router-dom';
import { BsTrophyFill, BsFillChatDotsFill, BsBellFill } from 'react-icons/bs';
import { useState } from 'react';
import { Navavatar } from '../navavatar/Navavatar';
import { Navdropdown } from '../navdropdown/Navdropdown';

export const NavbarComponent = () => {
	let [searchValue, setSearchValue] = useState('');

	// notifications:
	let notificationsList = [
		{
			userName: 'Mohamed Nasif',
			userImg: '',
			notifTitle: 'Mohamed Nasif , Liked your post!',
		},
		{
			userName: 'Mohamed Nasif',
			userImg: '',
			notifTitle: 'Mohamed Nasif , sent you connect request!',
		},
		{
			userName: 'Mohamed Nasif',
			userImg: '',
			notifTitle: 'Mohamed Nasif , shared your post!',
		},
		{
			userName: 'Mohamed Nasif',
			userImg: '',
			notifTitle: 'Mohamed Nasif , commented on your post!',
		},
	];
	// chats:
	let chats = [
		{
			notifTitle: 'Mohamed Nasif',
			userImg: '',
		},
		{
			notifTitle: 'Mohamed Nasif',
			userImg: '',
		},
		{
			notifTitle: 'Mohamed Nasif',
			userImg: '',
		},
	];
	const getInputData = (e) => {
		if (e.keyCode === 13) {
			setSearchValue(e.target.value);
			e.target.value = '';
		}
	};
	return (
		<div className='navbar-container sticky-top '>
			<div className='nav-content d-flex align-items-center position-relative'>
				<div className='row w-100'>
					<div className='nav-search-container col-9'>
						<div className='nav-search-content'>
							<input type='search' placeholder='Search...' onKeyDown={(event) => getInputData(event)} />
						</div>
					</div>
					<div className='nav-icons col-3 d-flex align-items-center'>
						<div className='col-3'>
							<Link>
								<BsTrophyFill className='nav-icon' />
							</Link>
						</div>
						<div className='col-3'>
							<Navdropdown icon={BsFillChatDotsFill} notifications={chats} />
						</div>
						<div className='col-3'>
							<Navdropdown icon={BsBellFill} notifications={notificationsList} />
						</div>
						<div className='col-3'>
							<Navavatar />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
