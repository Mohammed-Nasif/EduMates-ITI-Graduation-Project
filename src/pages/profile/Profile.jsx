import './profile.scss';
import { Link, useParams } from 'react-router-dom';
import { BsPeople, BsPencilSquare, BsUpload, BsCameraFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Editmodal } from './Editmodal';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { PostsContext } from './../../context/PostsContext';
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { UsersContext } from '../../context/UsersContext';

export const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	const { allPosts } = useContext(PostsContext);
	const { allUsers } = useContext(UsersContext);

	const param = useParams();
	let profileOwner = allUsers.find((user) => user.uid === param.userId);

	const [uploadedPP, setUploadedPP] = useState();
	const [uploadedCover, setUploadedCover] = useState();
	const [userDescription, setUserDescription] = useState();
	const [coverPic, setCoverPic] = useState();
	const [profilePic, setProfilePic] = useState();
	const [cvrUpdateConfirm, setCvrUpdateConfirm] = useState(false); /**variable to show save/cancel changes div after choosing the photo */
	const [profileUpdateConfirm, setProfileUpdateConfirm] = useState(false);
	const [isOwner, setIsOwner] = useState(true);
	const [userName, setUserName] = useState();
	const [modalShow, setModalShow] = useState(false);
	const [isMAte, setIsMate] = useState();
	useEffect(() => {
		window.scrollTo(0, 0);
		if (currentUser?.matesList?.includes(param.userId)) setIsMate(true);

    setIsOwner(()=>{
      if (param.userId === currentUser?.uid) return true
    });
    console.log(isOwner)
		setUserName(profileOwner?.displayName);
		setProfilePic(profileOwner?.photoURL);
		setUserDescription(profileOwner?.description || 'No description yet!');
		setCoverPic(profileOwner?.coverURL || 'https://firebasestorage.googleapis.com/v0/b/edumates---graduation-project.appspot.com/o/cover.gif?alt=media&token=eba8e3fd-4a82-4f69-b1d4-034f9557c5a2');
	}, [currentUser?.uid, param.userId]);

	// function to upload profile picture
	function updateProfileImg(e) {
		setUploadedPP(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			setProfilePic(base64URL);
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
			setCoverPic(base64URL);
		};
		setCvrUpdateConfirm(true);
	}
	// function that handles confirm of modal
	const handleConfirm = async (name, description) => {
		if (!name.trim()) return;
		setUserName(name);
		setUserDescription(description);
		setModalShow(false);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			displayName: name,
			description: description,
		});
	};

	//cancel update of cover image after preview
	function cancelCvrImgUpdate() {
		setCoverPic(currentUser.coverURL); /* on cancelling changes old cover image is recovered */
		setCvrUpdateConfirm(false);
	}
	//cancel update of profile image after preview
	function cancelProfileImgUpdate() {
		setProfilePic(currentUser.photoURL); /* on cancelling changes old profile image is recovered */
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

	return (
		<>
			<section className="profile ">
				<div className="container p-0 mx-auto">
					<div className="profile_wrapper  w-100 text-sm-center">
						<div className="cover_photo ">
							<img src={coverPic} alt="profile_cover_img" />
						</div>
						{isOwner && (
							<div className="upload-cvr-photo ms-auto me-4">
								<input type="file" className="w-100" onChange={updateCoverImg} />
								<button className="btn border p-0">
									Change Cover Photo <BsUpload />
								</button>
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
										<img src={profilePic} alt="profile_img" />
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
											<input type="file" onChange={updateProfileImg} />
											<button className="btn pb-3 p-2">
												<BsCameraFill className="camera" />
											</button>
										</div>
									)}
								</div>
								<div className="personal_info text-start">
									<h2 className="user_name m-0">{userName}</h2>
									<p className="user_Bio text-secondary  fs-5 my-1">{userDescription}</p>
								</div>
							</div>

							{!isOwner && isMAte && <button className='follow btn btn-outline-dark m-5' onClick={()=>{removeFromMatesList()}}>Unfollow</button> }
							{!isOwner && !isMAte && <button className='follow btn btn-outline-primary m-5'onClick={()=>{addToMatesList()}}>follow</button> }
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

							{allPosts
								.filter((post) => {
									return !!post.sharedBy.find((share) => share.sharedUserId === profileOwner.uid) || profileOwner.uid === post.createdBy;
								})
								.map((post) => {
									if (profileOwner.uid === post.createdBy) {
										return <Post postObj={post} key={post.postId} />;
									} else return <Post postObj={post} key={post.postId} shared={true} />;
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
