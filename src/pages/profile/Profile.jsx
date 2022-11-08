import './profile.scss';
import { Link, useParams } from 'react-router-dom';
import { BsPeople, BsPencilSquare, BsUpload, BsCameraFill } from 'react-icons/bs';
// import { AiOutlineCheck } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Editmodal } from './Editmodal';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { PostsContext } from './../../context/PostsContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { UsersContext } from '../../context/UsersContext';

export const Profile = () => {
	const param = useParams();
	const { currentUser } = useContext(AuthContext);
	const { allPosts } = useContext(PostsContext);
	const { allUsers } = useContext(UsersContext);

	const [profileOwner, setProfileOwner] = useState({});

	let isOwner = false,
		isMAte = false;

	const [uploadedPP, setUploadedPP] = useState('');
	const [uploadedCover, setUploadedCover] = useState('');
	const [cvrUpdateConfirm, setCvrUpdateConfirm] = useState(false); /**variable to show save/cancel changes div after choosing the photo */
	const [profileUpdateConfirm, setProfileUpdateConfirm] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	const profilePicture = useRef();
	const coverPicture = useRef();

	if (param.userId === currentUser.uid) isOwner = true;
	if (currentUser?.matesList?.includes(param.userId)) isMAte = true;

	useEffect(() => {
		window.scrollTo(0, 0);
		setProfileOwner(() => allUsers.find((user) => user.uid === param.userId));
	}, [param.userId, profileOwner, allUsers]);

	// function to upload profile picture
	function updateProfileImg(e) {
		setUploadedPP(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			profilePicture.current.src = base64URL;
		};
		setProfileUpdateConfirm(true);
	}

	// function to upload profile cover
	function updateCoverImg(e) {
		setUploadedCover(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			coverPicture.current.src = base64URL;
		};
		setCvrUpdateConfirm(true);
	}
	// function that handles confirm of modal
	const handleConfirm = async (name, description) => {
		console.log('handle', name, description);
		if (!name.trim()) return;

		setModalShow(false);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			displayName: name,
			description: description,
		});
	};

	//cancel update of cover image after preview
	function cancelCvrImgUpdate() {
		coverPicture.current.src = profileOwner.coverURL; /* on cancelling changes old cover image is recovered */
		setCvrUpdateConfirm(false);
	}
	//cancel update of profile image after preview
	function cancelProfileImgUpdate() {
		profilePicture.current.src = currentUser.photoURL; /* on cancelling changes old profile image is recovered */
		setProfileUpdateConfirm(false);
	}

	// approving changes on cover picture
	const confirmCvrImgUpdate = async () => {
		const storageRef = ref(storage, `${currentUser.displayName}cover`);
		const uploadTask = uploadBytesResumable(storageRef, uploadedCover);
		uploadTask.on(
			(error) => {
				console.error(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					await updateDoc(doc(db, 'users', currentUser.uid), {
						coverURL: downloadURL,
					});
				});
			}
		);
		setCvrUpdateConfirm(false);
	};
	// approving changes on profile picture
	const confirmProfileImgUpdate = async () => {
		const storageRef = ref(storage, currentUser.displayName);
		const uploadTask = uploadBytesResumable(storageRef, uploadedPP);
		uploadTask.on(
			(error) => {
				console.error(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					await updateDoc(doc(db, 'users', currentUser.uid), {
						photoURL: downloadURL,
					});
				});
			}
		);

		setProfileUpdateConfirm(false);
	};

	// Follow
	const addToMatesList = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayUnion(profileOwner.uid),
		});
	};

	// Un Follow
	const removeFromMatesList = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayRemove(profileOwner.uid),
		});
	};

	const feed = [];

	let userPosts = allPosts.filter((post) => profileOwner.uid === post.createdBy);
	for (let post of userPosts) {
		feed.push({ date: post.createdAt, post: post, profileshared: false });
	}
	let sharedPosts = allPosts.filter((post) => !!post.sharedBy.find((share) => share.sharedUserId === profileOwner.uid));
	for (let post of sharedPosts) {
		let sharedDate;
		post.sharedBy.forEach((share) => {
			if (share.sharedUserId === profileOwner.uid) {
				sharedDate = share.sharedTime;
				feed.push({ date: sharedDate, post: post, profileshared: true });
			}
		});
	}

	return (
		<>
			<section className="profile ">
				<div className="container p-0 mx-auto">
					<div className="profile_wrapper  w-100 text-sm-center">
						<div className="cover_photo position-relative">
							<img ref={coverPicture} src={profileOwner?.coverURL} alt="profile_cover_img" />
						</div>
						{isOwner && (
							<div className="upload-cvr-photo ms-auto me-4">
								<input type="file" id="cp" name="cp" className="w-100" accept="image/*" onChange={updateCoverImg} />
								<label htmlFor="cp" className="btn border p-0">
									Change Cover Photo <BsUpload />
								</label>
							</div>
						)}
						{cvrUpdateConfirm && (
							<div className="cvr-img-confirm">
								<button className="btn btn-primary me-3 p-0" onClick={confirmCvrImgUpdate}>
									Save
								</button>
								<button className="btn btn-dark pt-1" onClick={cancelCvrImgUpdate}>
									Cancel
								</button>
							</div>
						)}

						<div className="d-flex justify-content-between ">
							<div className="person d-flex flex-start  flex-column  ">
								<div className="d-flex flex-column align-items-baseline mb-4">
									<div className="profile_img ">
										<img ref={profilePicture} src={profileOwner?.photoURL} alt="profile_img" />
									</div>
									{profileUpdateConfirm && (
										<div className="prf-img-confirm mt-4">
											<button className="btn btn-primary me-3 p-0" onClick={confirmProfileImgUpdate}>
												Save
											</button>
											<button className="btn btn-dark pt-1" onClick={cancelProfileImgUpdate}>
												Cancel
											</button>
										</div>
									)}
									{isOwner && (
										<div className="upload-profile-photo d-flex border">
											<input type="file" id="pp" name="pp" accept="image/*" onChange={updateProfileImg} />
											<label htmlFor="pp" className="btn pb-3 p-2">
												<BsCameraFill className="camera" />
											</label>
										</div>
									)}
								</div>
								<div className="personal_info text-start">
									<h2 className="user_name m-0">{profileOwner?.displayName}</h2>
									<p className="user_Bio text-secondary  fs-5 my-1">{profileOwner?.description || 'No description yet!'}</p>
								</div>
							</div>

							{!isOwner && isMAte && (
								<button
									className="follow btn btn-outline-dark m-5"
									onClick={() => {
										removeFromMatesList();
									}}
								>
									Unfollow
								</button>
							)}
							{!isOwner && !isMAte && (
								<button
									className="follow btn btn-outline-primary m-5"
									onClick={() => {
										addToMatesList();
									}}
								>
									follow
								</button>
							)}
							{isOwner && (
								<div className="edit_and_matList my-2 pe-2">
									<div className="edit" onClick={() => setModalShow(true)}>
										<div className="text-dark">
											<h4 className="d-inline ">Edit Profile</h4>
											<span className="px-1 text-dark">
												<BsPencilSquare />
											</span>
										</div>
									</div>
									<div className="mates">
										<Link to="/eduMates/profile/matesList" className="text-dark">
											<h4 className="d-inline">Mates List</h4>
											<span className="px-1 mx-1">
												<BsPeople />
											</span>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="profile_content ps-3 d-flex">
						<main className="">
							{isOwner && (
								<div className="mb-4">
									<AddPost />
								</div>
							)}

							{feed
								.sort((a, b) => b.date - a.date)
								.map((obj, i) => {
									return <Post postObj={obj.post} key={i} profiledate={obj.date} profileshared={obj.profileshared} profileUser={profileOwner} />;
								})}
						</main>
						<aside className="">
							<MatesSuggestion />
							<TopicsToFollow />
						</aside>
					</div>
				</div>
				<Editmodal show={modalShow} onHide={() => setModalShow(false)} onConfirm={handleConfirm} data={currentUser}></Editmodal>
			</section>
		</>
	);
};
