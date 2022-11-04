import './profile.scss';
import cover from './cover.png';
import personalProfile from './pp.png';
import { BsPeople, BsPencilSquare, BsUpload, BsCameraFill } from 'react-icons/bs';
import { useState } from 'react';
import { Editmodal } from './Editmodal'
import { Link } from 'react-router-dom';

export const Profile = () => {

	const [profilePic, setProfilePic] = useState(personalProfile);
	const [coverPic, setCoverPic] = useState(cover);
	const [modalShow, setModalShow] = useState(false);

	// function to upload profile picture
	function updateProfileImg(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			setProfilePic(base64URL);
		};
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
	}
	// function that handles confirm of modal
	function handleConfirm(name,description) {
		setModalShow(false);
		console.log(name);     /*here we access name from Modal input field */
		console.log(description);  /*here we access description from Modal input field */
	}

	return (
		<>
			<section className='profile'>
				<div className='container mt-3 mx-auto'>
					<div className='profile_wrapper w-100 text-sm-center'>
						<div className='cover_photo '>
							<img src={coverPic} alt='profile_cover_img' />
						</div>
						<div className='upload-cvr-photo ms-auto me-4'>
							<input type="file" className='w-100' />
							<button className='btn border p-0' onChange={updateCoverImg}>Change Cover Photo <BsUpload/></button>
						</div>
						<div className='d-flex justify-content-between '>
							<div className='person d-flex flex-start  flex-column  '>
								<div className='profile_img  '>
									<img src={profilePic} alt='profile_img' />
								</div>
								<div className='upload-profile-photo d-flex border'>
									<input type="file" />
									<button className='btn pb-3 p-2' onChange={updateProfileImg} ><BsCameraFill className="camera"/></button>
								</div>
								<div className='personal_info text-start py-3 '>
									<h2 className='user_name m-0'>Mohamed nassif</h2>
									<p className='user_Bio text-secondary  fs-5 my-1'>Intern | Information Technology Institute</p>
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
				</div>
				<Editmodal show={modalShow} onHide={() => setModalShow(false)} onConfirm={handleConfirm}></Editmodal>
			</section>
		</>
	);
};
