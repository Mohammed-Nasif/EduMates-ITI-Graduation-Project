import './profile.scss';
// Profile Badges
import BugHunter from '../../assets/profileicons/bugHunter.png';
import Instructor from '../../assets/profileicons/instructor.png';
import Premium from '../../assets/profileicons/premiumMember.png';
import Verified from '../../assets/profileicons/verified.png';
import WebOwner from '../../assets/profileicons/webOwner.png';
import WebDev from '../../assets/profileicons/wesiteDeveloper.png';
import SystemProfile from '../../assets/profileicons/SystemBadge.png';
// Profile Badges

import { Link, useParams } from 'react-router-dom';
import { BsPeople, BsPencilSquare, BsCameraFill } from 'react-icons/bs';
import { GrCheckmark, GrClose } from 'react-icons/gr';
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
import { NotifiesContext } from '../../context/NotifiesContext';

export const Profile = () => {
	const param = useParams();
	const { currentUser } = useContext(AuthContext);
	const { allPosts } = useContext(PostsContext);
	const { allUsers } = useContext(UsersContext);
	const { dispatch } = useContext(NotifiesContext);

	const [profileOwner, setProfileOwner] = useState({});

	let isOwner = false,
		isMAte = false;
	// const [isOwner, setIsOwner] = useState(false);
	// const [isMAte, setIsMAte] = useState(false);
	const [uploadedPP, setUploadedPP] = useState('');
	const [imgUploaded, setImgUploaded] = useState(false);
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

		console.log('Heeelp');
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
		setImgUploaded(true);
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
		setImgUploaded(false);
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
			},
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
			},
		);

		setProfileUpdateConfirm(false);
		setImgUploaded(false);
	};

	// Follow
	const addToMatesList = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayUnion(profileOwner.uid),
		});
		dispatch({
			type: 'FOLLOW_USER',
			payload: {
				userId: profileOwner.uid,
				actionUser: { actionUserId: currentUser.uid, actionUserName: currentUser.displayName, actionUserPhoto: currentUser.photoURL },
			},
		});
	};

	// Un Follow
	const removeFromMatesList = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			matesList: arrayRemove(profileOwner.uid),
		});
	};

	const feed = [];

	let userPosts = allPosts.filter((post) => param.userId === post.createdBy);
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
			<section className='profile '>
				<div className='container-lg p-0 mx-auto'>
					<div className='profile_wrapper  w-100 text-sm-center'>
						<div className='cover_photo position-relative'>
							<img ref={coverPicture} src={profileOwner?.coverURL} alt='profile_cover_img' />
						</div>
						{isOwner && (
							<div className='upload-cvr-photo ms-auto me-4'>
								<input type='file' id='cp' name='cp' className='w-100' accept='image/*' onChange={updateCoverImg} />
								<label
									htmlFor='cp'
									className='bg-white border rounded-1 gap-1 g-0 p-0 px-2 text-black d-flex justify-content-center align-content-center'>
									<span>
										<BsCameraFill className='camera' />
									</span>
									<span>Change Cover Photo</span>
								</label>
							</div>
						)}
						{cvrUpdateConfirm && (
							<div className='cvr-img-confirm '>
								<button className='btn btn-primary ' onClick={confirmCvrImgUpdate}>
									<GrCheckmark className='p-0 m-0' />
								</button>
								<button className='btn btn-secondary ' onClick={cancelCvrImgUpdate}>
									<GrClose className='p-0 m-0' />
								</button>
							</div>
						)}

						<div className='d-flex justify-content-between '>
							<div className='person d-flex flex-start  flex-column  '>
								<div className='d-flex flex-column align-items-baseline mb-4'>
									<div className='profile_img'>
										<img ref={profilePicture} src={profileOwner?.photoURL} alt='profile_img' />
									</div>
									{profileUpdateConfirm && (
										<div className='prf-img-confirm'>
											<button className='btn btn-primary' onClick={confirmProfileImgUpdate}>
												<GrCheckmark className='icon' />
											</button>
											<button className='btn btn-secondary' onClick={cancelProfileImgUpdate}>
												<GrClose className='icon' />
											</button>
										</div>
									)}
									{isOwner && !imgUploaded && (
										<div className='upload-profile-photo'>
											<input type='file' id='pp' name='pp' accept='image/*' onChange={updateProfileImg} />
											<label htmlFor='pp' className='btn-custom'>
												<BsCameraFill className='camera' />
											</label>
										</div>
									)}
								</div>
								<div className='personal_info text-start'>
									<div className='d-flex justify-content-start align-items-center gap-2'>
										<h2 className='user_name m-0 text-capitalize'>{profileOwner?.displayName}</h2>
										<div className='icons'>
											{profileOwner?.specialFlags?.isOwner && <img src={WebOwner} alt='Website Owners' title='Website Owners' />}
											{profileOwner?.specialFlags?.isDeveloper && <img src={WebDev} alt='Website Developers' title='Website Developers' />}
											{profileOwner?.specialFlags?.isVerified && <img src={Verified} alt='Verified Member' title='Verified Member' />}
											{profileOwner?.specialFlags?.isBugHunter && <img src={BugHunter} alt='Bug Hunter' title='Bug Hunter' />}
											{profileOwner?.specialFlags?.isInstructor && <img src={Instructor} alt='Instructor' title='Instructor' />}
											{profileOwner?.specialFlags?.isPremium && <img className='prem' src={Premium} alt='Premium Member' title='Premium Member' />}
											{profileOwner?.systemFlags?.isSystemProfile && <img className='sys' src={SystemProfile} alt='EduMates' title='EduMates' />}
										</div>
									</div>
									<p className='user_Bio text-secondary  fs-5 my-1'>{profileOwner?.description || 'No description yet!'}</p>
								</div>
							</div>

							{!isOwner && isMAte && (
								<button
									className='follow btn btn-outline-dark m-5'
									onClick={() => {
										removeFromMatesList();
									}}>
									Unfollow
								</button>
							)}
							{!isOwner && !isMAte && (
								<button
									className='follow btn btn-outline-primary m-5'
									onClick={() => {
										addToMatesList();
									}}>
									follow
								</button>
							)}
							{isOwner && (
								<div className='edit_and_matList my-2 pe-2 d-flex flex-column align-items-start me-5 '>
									<div className='edit' onClick={() => setModalShow(true)}>
										<div className='text-dark'>
											<h4 className='d-inline pointer fs-5'>Edit Profile</h4>
											<span className='px-1 text-dark'>
												<BsPencilSquare />
											</span>
										</div>
									</div>
									<div className='mates'>
										<Link to='/eduMates/profile/matesList' className='text-dark'>
											<h4 className='d-inline fs-5'>Mates List</h4>
											<span className='px-1 mx-1'>
												<BsPeople />
											</span>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='profile_content ps-md-3 d-flex'>
						<main className=''>
							{isOwner && (
								<div className='mb-4'>
									<AddPost />
								</div>
							)}

							{feed
								.sort((a, b) => b.date - a.date)
								.map((obj, i) => {
									return <Post postObj={obj.post} key={i} profiledate={obj.date} profileshared={obj.profileshared} profileUser={profileOwner} />;
								})}
						</main>
						<aside className=''>
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
