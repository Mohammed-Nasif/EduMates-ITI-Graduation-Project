import { useContext, useRef, useState } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { AuthContext } from '../../../context/AuthContext';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { TiAttachment, TiImage } from 'react-icons/ti';
import { BsCursor, BsFileEarmarkPlay, BsFileEarmarkText, BsMic, BsMicMute, BsTrash } from 'react-icons/bs';

export const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);
	const [file, setFile] = useState(null);
	const [video, setVideo] = useState(null);
	const [voice, setVoice] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [progress, setProgress] = useState(0);
	const [sendBtn, setSendBtn] = useState(false);

	const start = useRef();
	const stop = useRef();

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

					stop.current.onclick = () => {
						mediaRecorder.stop();
						stop.current.style.display = 'none';
						start.current.style.display = 'block';
						setSendBtn(true);
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
		// Msg Notify Flag
		await updateDoc(doc(db, 'users', data.user.uid), {
			msgNotifies: true,
		});

		if (voice) {
			const storageRef = ref(storage, `/voices/${uuid()}`);
			const uploadTask = uploadBytesResumable(storageRef, voice);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setProgress(percent);
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
				},
			);
		}
		if (video) {
			const storageRef = ref(storage, `/videos/${video.name}`);
			const uploadTask = uploadBytesResumable(storageRef, video);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setProgress(percent);
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
				},
			);
		} else if (file) {
			const storageRef = ref(storage, `/files/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setProgress(percent);
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
				},
			);
		} else if (img) {
			const storageRef = ref(storage, `/photos/${uuid()}`);
			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setProgress(percent);
				},
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
		console.log('sent');
		setSendBtn(false);
		setVoice(null);
		setVideo(null);
		setFile(null);
		setImg(null);
		setText('');
	};

	const removeInput = () => {
		setSendBtn(false);
		setVoice(null);
		setVideo(null);
		setFile(null);
		setImg(null);
	};

	if (data.chatId !== 'null')
		return (
			<div className='input_wrapper position-relative px-3 py-2'>
				<TiAttachment
					className='toggler icon'
					onClick={() => {
						setToggle((prev) => !prev);
					}}
				/>
				{sendBtn ? (
					<BsCursor className='fs-4 icon' onClick={handleSend} />
				) : (
					<span ref={start} onClick={openRecord}>
						<BsMic className='fs-4 icon' />
					</span>
				)}

				<span ref={stop} style={{ display: 'none' }}>
					<BsMicMute className='fs-4 icon' />
				</span>

				<div className='pop-up position-absolute p-1'>
					<div className={`icons position-relative ${toggle ? 'toggle' : ''}`}>
						<input
							type='file'
							accept='video/*'
							style={{ display: 'none' }}
							id='videoUpload'
							onChange={(e) => {
								setVideo(e.target.files[0]);
								setSendBtn(true);
								e.target.value = '';
							}}
						/>
						<label htmlFor='videoUpload'>
							<BsFileEarmarkPlay className='icon' title='Video upload' />
						</label>
						<input
							type='file'
							accept='.pdf*'
							style={{ display: 'none' }}
							id='fileUpload'
							onChange={(e) => {
								setFile(e.target.files[0]);
								setSendBtn(true);
								e.target.value = '';
							}}
						/>
						<label htmlFor='fileUpload'>
							<BsFileEarmarkText className='icon' title='PDF upload' />
						</label>

						<input
							type='file'
							accept='image/*'
							style={{ display: 'none' }}
							id='imgAttach'
							value=''
							onChange={(e) => {
								setImg(e.target.files[0]);
								setSendBtn(true);
								e.target.value = '';
							}}
						/>
						<label htmlFor='imgAttach'>
							<TiImage className='icon' title='Image upload' />
						</label>
					</div>
				</div>

				<input
					className='msg_input'
					type='text'
					value={text}
					placeholder='Type Message...'
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSend();
					}}
				/>
				<img src={currentUser.photoURL} alt='curUserImg' />

				{(img || file || video || voice) && (
					<div className='preview  position-absolute text-center shadow'>
						<div className='d-flex justify-content-center'>
							{img && (
								<div className='preview-img'>
									<img src={URL.createObjectURL(img)} />
								</div>
							)}
							{file && (
								<div className='preview-file'>
									<iframe title='pdf viewer' src={URL.createObjectURL(file)} className='w-75' height='200px'></iframe>
								</div>
							)}

							{video && (
								<div className='preview-vid'>
									<video controls>
										<source src={URL.createObjectURL(video)} type='' />
									</video>
								</div>
							)}
							{voice && (
								<div className='preview-voice'>
									<audio controls>
										<source src={URL.createObjectURL(voice)} type='audio/ogg' />
									</audio>
								</div>
							)}
						</div>

						<span onClick={removeInput}>
							<BsTrash />
						</span>
					</div>
				)}
				{progress > 0 && progress < 100 && (
					<div className='uploading position-absolute text-center shadow'>
						uploading... <small>{progress}%</small>
						<div className='progress'>
							<div
								className='progress-bar progress-bar-striped progress-bar-animated'
								role='progressbar'
								aria-label='Animated striped example'
								aria-valuemin='0'
								aria-valuemax='100'
								style={{ width: `${progress}%` }}></div>
						</div>
					</div>
				)}
			</div>
		);
};
