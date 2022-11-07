import React, { useContext, useEffect } from 'react';
import { ChatContext } from './../../../context/ChatContext';

export const Chatnav = () => {
	const { data } = useContext(ChatContext);

	useEffect(() => {
		if (data.user) {
			console.log(data.user.login.isLoggedIn);
		}
	}, [data.user.login.isLoggedIn, data.user]);

	return (
		<div className='chat_nav'>
			<div className='nav_img'>
				<img src={data.user.photoURL} alt='User Pic' />
			</div>
			<div className='nav_data'>
				<h2>{data.user.displayName}</h2>
				<p className='d-flex flex-row align-items-center gap-1'>
					{data.user.login?.isLoggedIn ? 'Active Now' : 'Not'} <div className='active_now_icon'></div>
				</p>
			</div>
		</div>
	);
};
