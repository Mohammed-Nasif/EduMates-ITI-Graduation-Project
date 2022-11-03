import './addpost.scss';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { BsCardImage, BsFillCursorFill, BsPencil, BsPencilSquare } from 'react-icons/bs';

export function AddPost() {
	const txtarea = useRef();
	const [postText, setPostText] = useState('');
	const [postImg, setPostImg] = useState();
	const [postTopics, setPostTopics] = useState([]);
	const [preview, setPreview] = useState();
	const [isActive, setisACtive] = useState(false);

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
		setisACtive(false);
		setPreview();
		txtarea.current.value = '';
	};
	const handleSubmit = () => {
		console.log(postText);
		console.log(postImg);
		console.log(postTopics);
	};
	const TOPICS = [
		{ value: 'JavaScript', label: 'JavaScript' },
		{ value: 'HTML', label: 'HTML' },
		{ value: 'CSS', label: 'CSS' },
	];

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
								rows={isActive ? 3 : 1}
								placeholder="write something"
								maxLength={150}
								className={postText.length === 150 ? 'text-muted' : ''}
							/>
							{isActive && (
								<>
									<Select
										className="m-2 "
										options={TOPICS}
										isMulti
										onChange={(v) => {
											setPostTopics(v.map((topic) => topic.value));
										}}
									/>
									<div className="preview w-100 d-flex align-items-center justify-content-center">
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
									<BsFillCursorFill /> Share
								</div>
							</>
						)}
					</div>
				</div>

		</>
	);
}
