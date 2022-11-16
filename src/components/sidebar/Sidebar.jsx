import './sidebar.scss';
import { Link, NavLink } from 'react-router-dom';
import logo from './../../assets/images/EduMatesLight.svg';
import { BsFillHouseFill, BsHash, BsCollectionPlay, BsTrophyFill, BsGearFill } from 'react-icons/bs';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Sidebar = () => {
	const { currentUser } = useContext(AuthContext);

	const list = [
		{
			path: '/eduMates',
			name: 'Home',
			icon: BsFillHouseFill,
		},
		{
			path: '/eduMates/topics',
			name: 'Topics',
			icon: BsHash,
		},
		{
			path: '/eduMates/courses',
			name: 'Courses',
			icon: BsCollectionPlay,
		},
		{
			path: '/eduMates/classroom',
			name: 'Classroom',
			icon: BsTrophyFill,
		},
		// {
		// 	path: '/eduMates/setting',
		// 	name: 'Setting',
		// 	icon: BsGearFill,
		// },
	];
	return (
		<div className="sidebar-container m-0  position-fixed">
			<div className="mb-3 w-100 mx-auto text-center logo ">
				<Link to="/eduMates">
					<img src={logo} alt="EduMates" className="pt-4 pb-3 w-75" />
				</Link>
			</div>
			<div className="user-info mb-3">
				<div className="user-img mb-2">
					<img src={currentUser.photoURL} alt="user-img" />
				</div>
				<p className="user-name mb-1 f-roboto fw5 text-truncate text-capitalize">{currentUser.displayName}</p>
				<Link to={`/eduMates/profile/${currentUser.displayName}/${currentUser.uid}`} className="user-profile f-roboto fw5">
					View Profile
				</Link>
			</div>
			<div className="sidebar-list">
				<ul className="ps-0">
					{list.map((item, i) => {
						return (
							<NavLink to={item.path} end key={i} className={(state) => (state.isActive ? 'active' : '')}>
								<li className={'sidebar-item'}>
									<item.icon className="sidebar-icon text-center" />
									<p className="mb-0 f-roboto fw4">{item.name}</p>
								</li>
							</NavLink>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
