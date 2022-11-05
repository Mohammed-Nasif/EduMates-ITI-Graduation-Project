import './profile.scss';
import cover from './cover.png';
import personalProfile from './pp.png';
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
import { PostsContext } from './../../context/PostsContext';
import { AuthContext } from '../../context/AuthContext';

export const Profile = () => {
	const currentCvrImg = cover;
	const currentPrfImg = personalProfile;
	const [userName, setUserName] = useState('Mohamed Nassif');
	const [userDescription, setUserDescription] = useState('Intern | Information Technology Institute');
	const [profilePic, setProfilePic] = useState(personalProfile);
	const [coverPic, setCoverPic] = useState(cover);
	const [modalShow, setModalShow] = useState(false);
	const [cvrUpdateConfirm, setCvrUpdateConfirm] = useState(false); /**variable to show save/cancel changes div after choosing the photo */
	const [profileUpdateConfirm, setProfileUpdateConfirm] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const { allPosts } = useContext(PostsContext);

	const param = useParams();

	useEffect(() => {
		if (param.userId === currentUser.uid) setIsOwner(true);
	}, [currentUser.uid, param.userId]);
	console.log(isOwner);

	// function to upload profile picture
	function updateProfileImg(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			setProfilePic(base64URL);
		};
		setProfileUpdateConfirm(true);
	}

	// function to upload profile picture
	function updateCoverImg(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			setCoverPic(base64URL);
		};
		setCvrUpdateConfirm(true);
	}
	// function that handles confirm of modal
	function handleConfirm(name, description) {
		setModalShow(false);
		console.log(name); /*here we access name from Modal input field */
		setUserName(name);
		console.log(description); /*here we access description from Modal input field */
		setUserDescription(description);
	}

	//cancel update of cover image after preview
	function cancelCvrImgUpdate() {
		setCoverPic(currentCvrImg); /* on cancelling changes old cover image is recovered */
		setCvrUpdateConfirm(false);
	}
	//cancel update of profile image after preview
	function cancelProfileImgUpdate() {
		setProfilePic(currentPrfImg); /* on cancelling changes old profile image is recovered */
		setProfileUpdateConfirm(false);
	}

	// approving changes on cover picture
	function confirmCvrImgUpdate() {
		setCvrUpdateConfirm(false);
	}
	// approving changes on profile picture
	function confirmProfileImgUpdate() {
		setProfileUpdateConfirm(false);
	}


	return (
		<>
			<section className='profile '>
				<div className='container p-0 mx-auto'>
					<div className='profile_wrapper  w-100 text-sm-center'>
						<div className='cover_photo '>
							<img src={coverPic} alt='profile_cover_img' />
						</div>
						<div className='upload-cvr-photo ms-auto me-4'>
							<input type='file' className='w-100' onChange={updateCoverImg} />
							<button className='btn border p-0'>
								Change Cover Photo <BsUpload />
							</button>
						</div>
						{cvrUpdateConfirm && (
							<div className='cvr-img-confirm'>
								<button className='btn btn-primary me-3 p-0' onClick={confirmCvrImgUpdate}>
									Save
								</button>
								<button className='btn btn-dark pt-1' onClick={cancelCvrImgUpdate}>
									Cancel
								</button>
							</div>
						)}

						<div className='d-flex justify-content-between '>
							<div className='person d-flex flex-start  flex-column  '>
								<div className='d-flex flex-column align-items-baseline mb-4'>
									<div className='profile_img '>
										<img src={profilePic} alt='profile_img' />
									</div>
									{profileUpdateConfirm && (
										<div className='prf-img-confirm mt-4'>
											<button className='btn btn-primary me-3 p-0' onClick={confirmProfileImgUpdate}>
												Save
											</button>
											<button className='btn btn-dark pt-1' onClick={cancelProfileImgUpdate}>
												Cancel
											</button>
										</div>
									)}
									<div className='upload-profile-photo d-flex border'>
										<input type='file' onChange={updateProfileImg} />
										<button className='btn pb-3 p-2'>
											<BsCameraFill className='camera' />
										</button>
									</div>
								</div>
								<div className='personal_info text-start'>
									<h2 className='user_name m-0'>{userName}</h2>
									<p className='user_Bio text-secondary  fs-5 my-1'>{userDescription}</p>
								</div>
							</div>
							<div className='edit_and_matList my-2 pe-2'>
								<div className='edit' onClick={() => setModalShow(true)}>
									<div className='text-dark'>
										<h4 className='d-inline '>Edit Profile</h4>
										<span className='px-1 text-dark'>
											<BsPencilSquare />
										</span>
									</div>
								</div>
								<div className='mates'>
									<Link to='/eduMates/profile/matesList' className='text-dark'>
										<h4 className='d-inline'>Mates List</h4>
										<span className='px-1 mx-1'>
											<BsPeople />
										</span>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className='profile_content ps-3 d-flex'>
						<main className=''>
							<div className=''>
								<AddPost />
							</div>
							{/* {allPosts.map((post) => {
								return <Post postObj={post} key={post.postId} />;
							})} */}
						</main>
						<aside className=''>
							<MatesSuggestion />
							<TopicsToFollow />
						</aside>
					</div>
				</div>
				<Editmodal show={modalShow} onHide={() => setModalShow(false)} onConfirm={handleConfirm}></Editmodal>
			</section>
		</>
	);
};
