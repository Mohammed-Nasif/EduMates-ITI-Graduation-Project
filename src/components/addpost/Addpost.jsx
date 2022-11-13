import './addpost.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import Select from 'react-select';
import { BsCardImage, BsFillCursorFill, BsPencil, BsPencilSquare } from 'react-icons/bs';
import { TopicsContext } from './../../context/TopicsContext';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from './../../context/AuthContext';

export function AddPost() {
	const txtarea = useRef();
	const [postText, setPostText] = useState('');
	const [postImg, setPostImg] = useState();
	const [postTopics, setPostTopics] = useState([]);
	const [preview, setPreview] = useState();
	const [isActive, setisACtive] = useState(false);
	const { topicsOptions } = useContext(TopicsContext);
	const { currentUser } = useContext(AuthContext);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		if (!postImg) return;
		const src = URL.createObjectURL(postImg);
		setPreview(src);
		return () => URL.revokeObjectURL(src);
	}, [postImg]);

	const getImage = (e) => {
		setPostImg(e.target.files[0]);
	};
	const createPost = (e) => {
		setisACtive(true);
		txtarea.current.focus();
	};
	const clean = () => {
		txtarea.current.value = '';
		setisACtive(false);
		setPreview();
		setPostImg();
		setPostText('');
		setPostTopics([]);
		setIsError(false);
	};
	const removeImg = () => {
		setPostImg();
		setPreview();
	};
	const handleSubmit = async () => {
		const postId = uuid();
		try {
			if (!postTopics.length) {
				setIsError(true);
				return;
			}
			if (postImg) {
				const storageRef = ref(storage, postId);
				const uploadTask = uploadBytesResumable(storageRef, postImg);
				uploadTask.on(
					(error) => {},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							// Set Post to Posts collection
							await setDoc(doc(db, 'posts', postId), {
								//Properties Stored In Post
								postId: postId,
								postContent: postText,
								postImg: downloadURL,
								postTopics: [...postTopics],
								createdAt: serverTimestamp(),
								createdBy: currentUser.uid,
								likedBy: [],
								sharedBy: [],
							});

							// Set Comment to postComments collection
							await setDoc(doc(db, 'postComments', postId), {
								//Properties Stored In Post
								comments: [],
							});
						});
						clean();
					}
				);
			} else if (postText.trim() !== '') {
				await setDoc(doc(db, 'posts', postId), {
					//Properties Stored In Post
					postId: postId,
					postContent: postText,
					postImg: '',
					postTopics: [...postTopics],
					createdAt: serverTimestamp(),
					createdBy: currentUser.uid,
					likedBy: [],
					sharedBy: [],
				});

				// Set Comment to postComments collection
				await setDoc(doc(db, 'postComments', postId), {
					//Properties Stored In Post
					comments: [],
				});
				clean();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="add-new-post border border-1 rounded-4 w-100 py-2">
				<div className="row px-3">
					<div className="col-1">
						<BsPencil className="icon border-1" />
					</div>
					<div className="col-10">
						<textarea
							ref={txtarea}
							onChange={(e) => {
								if (e.target.value) setisACtive(true);
								setPostText(e.target.value);
							}}
							id="newpost"
							rows={isActive ? 5 : 1}
							placeholder="write something..."
							maxLength={350}
							className={postText.length === 350 ? 'text-muted' : ''}
						/>
						{isActive && (
							<>
								{isError && postTopics < 1 && <p className="alert alert-danger">Choose 1 topic</p>}
								<Select
									className="m-2 "
									options={topicsOptions}
									isMulti
									onChange={(v) => {
										setPostTopics(v.map((topic) => topic.label));
									}}
								/>
								<div className="preview w-100 d-flex align-items-center justify-content-center position-relative">
									<div className="del position-absolute" onClick={removeImg}>
										X
									</div>
									<img src={preview} alt="" />
								</div>
							</>
						)}
					</div>
					{isActive && (
						<div className="col-1">
							<div className="btn text-muted p-0" onClick={clean}>
								x
							</div>
						</div>
					)}
				</div>
				<hr className="my-1" />
				<div className="buttons-wrapper px-3 text-center d-flex justify-content-around">
					{!isActive ? (
						<div className="btn py-0" onClick={createPost}>
							Create new post <BsPencilSquare />
						</div>
					) : (
						<>
							<input type="file" id="img" name="img" accept="image/*" onChange={getImage} />
							<label htmlFor="img" className="btn py-0">
								<BsCardImage /> Photo
							</label>
							<div className="btn py-0" onClick={handleSubmit}>
								<BsFillCursorFill /> Post
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
