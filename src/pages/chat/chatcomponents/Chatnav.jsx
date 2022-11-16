import React, { useContext, useEffect } from 'react';
import { ChatContext } from './../../../context/ChatContext';
import { UsersContext } from './../../../context/UsersContext';
import { useState } from 'react';

export const Chatnav = () => {
	const { data } = useContext(ChatContext);
	const { allUsers } = useContext(UsersContext);
	const [chatUser, setChatUser] = useState({});
	useEffect(() => {
		if (data.user) {
			const user = allUsers.find((user) => user.uid === data.user.uid);
			setChatUser(user);
		}
	}, [data.user, allUsers]);

	if (Object.keys(data.user).length === 0) {
		return <h2 className="text-muted text-center pt-4">Select a Mate to chat with</h2>;
	} else {
		return (
			<div className="chat_nav">
				<div className="nav_img">
					<img src={chatUser?.photoURL} alt="User Pic" />
				</div>
				<div className="nav_data">
					<h2 className='text-capitalize'>{chatUser?.displayName}</h2>
					<p className="d-flex flex-row align-items-center gap-1 pb-0">
						{chatUser?.login?.isLoggedIn ? 'Active Now' : `Last seen ${chatUser?.login?.date.toDate().toLocaleString()}`} <span className={chatUser?.login?.isLoggedIn ? 'active_now_icon' : 'not_active_now_icon'}></span>
					</p>
				</div>
			</div>
		);
	}
};
