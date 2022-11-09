import './navdropdown.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

export const Navdropdown = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [notifiesCount, setNotifiesCount] = useState(currentUser?.unseenNotifies?.length);
	const [notificationsList, setNotificationsList] = useState(currentUser?.unseenNotifies);

	// toggle flag to control the dropdown menu
	let [toggle, setToggle] = useState(false);

	// function to change the state of toggle flag
	const handleClick = async () => {
		if (toggle) {
			console.log('Closed');
			setToggle(false);
			if (!!currentUser?.unseenNotifies?.length) {
				await updateDoc(doc(db, 'users', currentUser?.uid), {
					seenNotifies: arrayUnion(...currentUser.unseenNotifies),
				});
				await updateDoc(doc(db, 'users', currentUser?.uid), {
					unseenNotifies: [],
				});
			}
		} else {
			setToggle(true);
			console.log('Opened');
			setNotifiesCount(0);
		}
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
			{props.dropType === 'notifies' && <span>{notifiesCount}</span>}
			<div className='dropdown-icon'>
				<Link>
					<props.icon className={toggle ? 'nav-icon active' : 'nav-icon'} onClick={handleClick} />
				</Link>
			</div>
			{toggle && props.dropType === 'notifies' && (
				<div className='dropdown'>
					{!!notificationsList.length
						? notificationsList.map((item, index) => {
								return (
									<Link key={index + 1}>
										<div className='row mb-1'>
											<div className='col-2 user-img'>
												<img src={item.actionUser.actionUserPhoto} alt={item.actionUser.actionUserName} />
											</div>
											<div className='col-8 px-0'>
												<p className='pt-2 user-name'>
													<span className='fw-bolder text-info'>{item.actionUser.actionUserName}</span> {item.msgText}
												</p>
											</div>
										</div>
									</Link>
								);
						  })
						: currentUser.seenNotifies.map((item, index) => {
								return (
									<Link key={index + 1}>
										<div className='row mb-1'>
											<div className='col-2 user-img'>
												<img src={item.actionUser.actionUserPhoto} alt={item.actionUser.actionUserName} />
											</div>
											<div className='col-8 px-0'>
												<p className='pt-2 user-name'>
													<span className='fw-bolder text-info'>{item.actionUser.actionUserName}</span> {item.msgText}
												</p>
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
