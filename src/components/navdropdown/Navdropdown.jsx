import './navdropdown.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export const Navdropdown = (props) => {
	// toggle flag to control the dropdown menu
	let [toggle, setToggle] = useState(false);
	// function to change the state of toggle flag
	const handleClick = () => {
		toggle ? setToggle(false) : setToggle(true);
	};

	// handle when click outside
	let dropdownRef = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!dropdownRef.current.contains(e.target)) {
				setToggle(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	return (
		<div className='dropdown-container' ref={dropdownRef}>
			<div className='dropdown-icon'>
				<Link>
					<props.icon className={toggle ? 'nav-icon active' : 'nav-icon'} onClick={handleClick} />
				</Link>
			</div>
			{toggle && (
				<div className='dropdown'>
					{props.notifications.map((item, index) => {
						return (
							<Link key={index + 1}>
								<div className='row mb-1'>
									<div className='col-2 user-img'>
										<img src={item.userImg} alt={item.userName} />
									</div>
									<div className='col-8 px-0'>
										<p className='pt-2 user-name'>{item.notifTitle}</p>
									</div>
								</div>
							</Link>
						);
					})}
					{props.dropType === 'chat' && (
						<Link to='/eduMates/chats' className='d-flex flex-row align-items-center justify-content-center text-info link'>
							<p className='text-center m-0'>See all in chats</p>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};
