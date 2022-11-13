import { Message } from './Message';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import chatPh from '../../../assets/images/chat-empty.svg';

export const Messages = () => {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);

	return (
		<div className="messages_wrapper">
			{data.chatId === 'null' && <img src={chatPh} alt="" className="d-block mx-auto w-75  mt-5" />}

			{messages.map((msg) => (
				<Message message={msg} key={msg.id} />
			))}
		</div>
	);
};
