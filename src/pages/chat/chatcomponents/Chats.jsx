import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';

export const Chats = () => {
	const [chats, setChats] = useState();
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			//Clean Up
			return () => {
				unsub();
			};
		};

		// Condition to prevent errors of missing user id
		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (user) => {
		console.log(user);
		dispatch({ type: 'CHANGE_USER', payload: user });
	};

	return (
		<div className='chats'>
			<p className=' ms-4 mt-1 fw-bold'>Your chats</p>
			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => (
						<div className='visible-section px-4 ' key={chat[0]}>
							<div className='row py-2 g-3 d-flex align-items-center align-items-center '>
								<div className='col-9'>
									<div className='row g-2'>
										<div className='col-3 p-1 '>
											<img className='userChat_pic' src={chat[1].userInfo.photoURL} alt='UserPic' />
										</div>
										<div className='col-9 mt-0 py-2 '>
											<p className='fw-bold w-13 text-truncate lh-1 text-capitalize'>{chat[1].userInfo.displayName}</p>
											<p className='w-10 text-truncate lh-1'>{chat[1].lastMessage?.text}</p>
										</div>
									</div>
								</div>
								<div className='col-3 p-0 mb-2'>
									<button className='btn btn-outline-primary follow rounded-1' onClick={() => handleSelect(chat[1].userInfo)}>
										Chat
									</button>
								</div>
							</div>
						</div>
					))}
		</div>
	);
};
