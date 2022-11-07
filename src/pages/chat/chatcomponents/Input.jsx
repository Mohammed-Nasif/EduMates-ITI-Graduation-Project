import { useContext, useState } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { AuthContext } from '../../../context/AuthContext';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { TiFolderAdd, TiImage } from 'react-icons/ti';

export const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async (e) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			if (img) {
				const storageRef = ref(storage, uuid());
				const uploadTask = uploadBytesResumable(storageRef, img);

				uploadTask.on(
					(error) => {},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							const chatsRef = doc(db, 'chats', data.chatId);
							await updateDoc(chatsRef, {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									img: downloadURL,
								}),
							});
						});
					},
				);
			} else if (text.trim() !== '') {
				const chatsRef = doc(db, 'chats', data.chatId);
				await updateDoc(chatsRef, {
					messages: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: Timestamp.now(),
					}),
				});
			}

			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.lastMessage']: {
					text,
				},
				[data.chatId + '.data']: serverTimestamp(),
			});

			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId + '.lastMessage']: {
					text,
				},
				[data.chatId + '.data']: serverTimestamp(),
			});

			setImg(null);
			setText('');
		}
	};
	return (
		<div className='input_wrapper'>
			<div className='icons'>
				{/* <input type='file' style={{ display: 'none' }} id='folderAttach' onChange={(e) => setFolder(e.target.files[0])} />
				<label htmlFor='folderAttach'> */}
					<TiFolderAdd className='icon' />
				{/* </label> */}
				<input type='file' style={{ display: 'none' }} id='imgAttach' onChange={(e) => setImg(e.target.files[0])} />
				<label htmlFor='imgAttach'>
					<TiImage className='icon' />
				</label>
			</div>
			<input
				className='msg_input'
				type='text'
				value={text}
				placeholder='Type Message...'
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleSend}
			/>
			<img src={currentUser.photoURL} alt='curUserImg' />
		</div>
	);
};
