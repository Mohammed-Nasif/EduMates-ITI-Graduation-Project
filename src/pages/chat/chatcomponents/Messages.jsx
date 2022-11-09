import { Message } from './Message';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
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

	console.log(messages);
	return (
		<div className='messages_wrapper'>
			{messages.map((msg) => (
				<Message message={msg} key={msg.id} />
			))}
		</div>
	);
};
