import './navdropdown.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

export const Navdropdown = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [notifiesCount, setNotifiesCount] = useState(currentUser?.unseenNotifies?.length);
	const [msgPing, setMsgPing] = useState(currentUser?.msgNotifies);
	// toggle flag to control the dropdown menu
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const ignoreMsgFlag = async () => {
			await updateDoc(doc(db, 'users', currentUser.uid), {
				msgNotifies: false,
			});
		};
		if (window.location.pathname === 'eduMates/chats') {
			ignoreMsgFlag();
		}
		// console.log('Msg Flag');
	}, [currentUser.uid]);

	// function to change the state of toggle flag
	const handleClick = async () => {
		if (toggle) {
			// console.log('Closed');
			setToggle(false);
			if (!!currentUser?.unseenNotifies?.length && props.dropType === 'notifies') {
				setNotifiesCount(0);
				await updateDoc(doc(db, 'users', currentUser?.uid), {
					seenNotifies: arrayUnion(...currentUser.unseenNotifies),
					unseenNotifies: [],
				});
			}
			if (props.dropType === 'chat') {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					msgNotifies: false,
				});
			}
		} else {
			setToggle(true);
			// console.log('Opened');
			setNotifiesCount(0);
			setMsgPing(false);
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
			<div className='dropdown-icon position-relative'>
				<Link onClick={handleClick}>
					{props.dropType === 'notifies' && !!notifiesCount && <span className='notifiesCount position-absolute'>{notifiesCount}</span>}
					{props.dropType === 'chat' && msgPing && (
						<div className='ping-wrapper'>
							<div id='r1' className='ring'></div>
							<div id='r2' className='ring'></div>
							<div id='r3' className='ring'></div>
						</div>
					)}
					<props.icon className={toggle ? 'nav-icon active' : 'nav-icon'} />
				</Link>
			</div>
			{toggle && (
				<div className='dropdown'>
					{props.dropType === 'notifies' &&
						(!!currentUser?.unseenNotifies.length
							? currentUser.unseenNotifies
									.sort((a, b) => b.notifiedAt - a.notifiedAt)
									.map((item, index) => {
										return (
											<div className='notify' key={index + 1}>
												<Link
													to={
														item.notifyType === 'follow'
															? `/eduMates/profile/${item.actionUser.actionUserName}/${item.actionUser.actionUserId}`
															: `/eduMates/${currentUser.displayName}/${currentUser.uid}/${item.postId}`
													}>
													<div className='row d-flex align-items-center justify-content-center p-0 gap-2'>
														<div className='col-2 user-img'>
															<img src={item.actionUser.actionUserPhoto} alt={item.actionUser.actionUserName} />
														</div>
														<div className='col-8 px-0'>
															<p className='pt-2 user-name m-0 mb-1'>
																<span className='fw-bolder text-info text-capitalize'>{item.actionUser.actionUserName}</span>
																<span>{' ' + item.msgText}</span>
															</p>
														</div>
													</div>
												</Link>
											</div>
										);
									})
							: currentUser.seenNotifies
									.sort((a, b) => b.notifiedAt - a.notifiedAt)
									.map((item, index) => {
										return (
											<div className='notify' key={index + 1}>
												<Link
													to={
														item.notifyType === 'follow'
															? `/eduMates/profile/${item.actionUser.actionUserName}/${item.actionUser.actionUserId}`
															: `/eduMates/${currentUser.displayName}/${currentUser.uid}/${item.postId}`
													}>
													<div className='row d-flex align-items-center justify-content-center p-0 gap-2'>
														<div className='col-2 user-img'>
															<img src={item.actionUser.actionUserPhoto} alt={item.actionUser.actionUserName} />
														</div>
														<div className='col-8 px-0'>
															<p className='pt-2 user-name m-0 mb-1'>
																<span className='fw-bolder text-info text-capitalize'>{item.actionUser.actionUserName}</span>
																<span>{' ' + item.msgText}</span>
															</p>
														</div>
													</div>
												</Link>
											</div>
										);
									}))}
					{props.dropType === 'chat' && (
						<>
							{currentUser.msgNotifies && <p className='text-center m-0 fs-6 text-warning'>You have new Message</p>}
							<Link to='/eduMates/chats' className='d-flex flex-column align-items-center justify-content-center text-info link'>
								<p className='text-center m-0'>See all in chats</p>
							</Link>
						</>
					)}
				</div>
			)}
		</div>
	);
};
