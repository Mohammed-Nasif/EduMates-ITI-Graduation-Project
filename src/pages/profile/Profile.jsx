import './profile.scss';
import cover from './cover.png';
import personalProfile from './pp.png';
import { BsPeople, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const Profile = () => {
	return (
		<>
			<section className='profile'>
				<div className='container mt-3 mx-auto'>
					<div className='profile_wrapper w-100 text-sm-center'>
						<div className='cover_photo '>
							<img src={cover} alt='profile_cover_img' />
						</div>
						<div className='d-flex justify-content-between '>
							<div className='person d-flex flex-start  flex-column  '>
								<div className='profile_img  '>
									<img src={personalProfile} alt='profile_img' />
								</div>
								<div className='personal_info text-start py-3 '>
									<h2 className='user_name m-0'>Mohamed nassif</h2>
									<p className='user_Bio text-secondary  fs-5 my-1'>Intern | Information Technology Institute</p>
								</div>
							</div>
							<div className='edit_and_matList my-2 pe-2'>
								<div className='edit'>
									<Link to='/eduMates/profile/edit' className='text-dark'>
										<h4 className='d-inline '>Edit Profile</h4>
										<span className='px-1 text-dark'>
											<BsPencilSquare />
										</span>
									</Link>
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
			</section>
		</>
	);
};
