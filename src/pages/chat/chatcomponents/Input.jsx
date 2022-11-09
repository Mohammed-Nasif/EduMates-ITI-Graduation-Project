import { useContext, useRef, useState } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { AuthContext } from '../../../context/AuthContext';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { TiAttachment, TiImage } from 'react-icons/ti';
import { BsFileEarmarkPlay, BsFileEarmarkText, BsMic, BsMicMute } from 'react-icons/bs';

export const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);
	const [file, setFile] = useState(null);
	const [video, setVideo] = useState(null);
	const [voice, setVoice] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [progress, setProgress] = useState(0);

	const start = useRef();
	const stop = useRef();
	const audio = useRef();

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);
	const openRecord = () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			console.log('getUserMedia supported.');
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					// Success callback
					start.current.style.display = 'none';
					stop.current.style.display = 'block';
					const mediaRecorder = new MediaRecorder(stream);

					let chunks = [];

					mediaRecorder.ondataavailable = (e) => {
						chunks.push(e.data);
					};

					mediaRecorder.start();
					console.log(mediaRecorder.state);
					console.log('recorder started');

					stop.current.onclick = () => {
						mediaRecorder.stop();
						console.log(mediaRecorder.state);
						console.log('recorder stopped');
						stop.current.style.display = 'none';
						start.current.style.display = 'block';
					};

					mediaRecorder.onstop = (e) => {
						console.log('stopped');
						const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
						chunks = [];
						// const audioURL = window.URL.createObjectURL(blob);
						setVoice(blob);
					};
				})
				.catch((err) => {
					console.error(`The following getUserMedia error occurred: ${err}`);
				});
		} else {
			console.log('getUserMedia not supported on your browser!');
		}
	};

	// sending to firebase
	const handleSend = async (e) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			if (voice) {
				const storageRef = ref(storage, `/voices/${uuid()}`);
				const uploadTask = uploadBytesResumable(storageRef, voice);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						// setProgress(percent);
					},
					(err) => {},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							const chatsRef = doc(db, 'chats', data.chatId);
							await updateDoc(chatsRef, {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									voice: downloadURL,
								}),
							});
						});
					}
				);
			}
			if (video) {
				const storageRef = ref(storage, `/videos/${video.name}`);
				const uploadTask = uploadBytesResumable(storageRef, video);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						// setProgress(percent);
					},
					(err) => {},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							const chatsRef = doc(db, 'chats', data.chatId);
							await updateDoc(chatsRef, {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									video: downloadURL,
								}),
							});
						});
					}
				);
			} else if (file) {
				const storageRef = ref(storage, `/files/${file.name}`);
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						// setProgress(percent);
					},
					(err) => {},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							const chatsRef = doc(db, 'chats', data.chatId);
							await updateDoc(chatsRef, {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									file: downloadURL,
								}),
							});
						});
					}
				);
			} else if (img) {
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
					}
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
		<div className="input_wrapper position-relative px-3 py-2">
			<TiAttachment
				className="toggler"
				onClick={() => {
					setToggle((prev) => !prev);
				}}
			/>
			<span ref={start} onClick={openRecord}>
				<BsMic className="fs-4" />
			</span>

			<span ref={stop} style={{ display: 'none' }}>
				<BsMicMute className="fs-4" />
			</span>
			<div className="pop-up position-absolute p-1">
				<div className={`icons position-relative ${toggle ? 'toggle' : ''}`}>
					<input type="file" accept="video/*" style={{ display: 'none' }} id="videoUpload" onChange={(e) => setVideo(e.target.files[0])} />
					<label htmlFor="videoUpload">
						<BsFileEarmarkPlay className="icon" title="Video upload" />
					</label>
					<input type="file" accept=".pdf*" style={{ display: 'none' }} id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
					<label htmlFor="fileUpload">
						<BsFileEarmarkText className="icon" title="PDF upload" />
					</label>

					<input type="file" accept="image/*" style={{ display: 'none' }} id="imgAttach" onChange={(e) => setImg(e.target.files[0])} />
					<label htmlFor="imgAttach">
						<TiImage className="icon" title="Image upload" />
					</label>
				</div>
			</div>
			{/* <audio src="" ref={audio} controls></audio> */}

			<input className="msg_input" type="text" value={text} placeholder="Type Message..." onChange={(e) => setText(e.target.value)} onKeyDown={handleSend} />
			<img src={currentUser.photoURL} alt="curUserImg" />

			{/* <div className="preview w-100 position-absolute d-flex justify-content-between">
				<p>LLLLL</p>
				<button>X</button>
			</div> */}
		</div>
	);
};
