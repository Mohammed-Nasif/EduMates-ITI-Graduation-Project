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

	return (
		<div className='chat_nav'>
			<div className='nav_img'>
				<img src={chatUser?.photoURL} alt='User Pic' />
			</div>
			<div className='nav_data'>
				<h2>{chatUser?.displayName}</h2>
				<p className='d-flex flex-row align-items-center gap-1'>
					{chatUser?.login?.isLoggedIn ? 'Active Now' : 'Not'}{' '}
					<div className={chatUser?.login?.isLoggedIn ? 'active_now_icon' : 'not_active_now_icon'}></div>
				</p>
			</div>
		</div>
	);
};
