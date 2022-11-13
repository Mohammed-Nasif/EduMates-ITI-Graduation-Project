import './navbar.scss';
import { Link } from 'react-router-dom';
import { BsTrophyFill, BsFillChatDotsFill, BsBellFill } from 'react-icons/bs';
import { useState } from 'react';
import { Navavatar } from '../navavatar/Navavatar';
import { Navdropdown } from '../navdropdown/Navdropdown';

export const NavbarComponent = () => {
	let [searchValue, setSearchValue] = useState('');

	const getInputData = (e) => {
		if (e.keyCode === 13) {
			setSearchValue(e.target.value);
			e.target.value = '';
			console.log(searchValue);
		}
	};
	return (
		<div className="navbar-container sticky-top ">
			<div className="nav-content d-flex align-items-center  position-relative">
				<div className="row w-100">
					<div className="nav-search-container col-6 col-md-9">
						{/* <div className="nav-search-content">
							<input className=" ms-md-3" type="search" placeholder="Search..." onKeyDown={(event) => getInputData(event)} />
						</div> */}
					</div>
					<div className="nav-icons col-6 col-md-3 d-flex align-items-center">
						<div className="col-3 text-center">
							<Link to="/eduMates/classroom">
								<BsTrophyFill className="nav-icon " />
							</Link>
						</div>
						<div className="col-3 text-center">
							<Navdropdown icon={BsFillChatDotsFill} dropType={'chat'} />
						</div>

						<div className="col-3 text-center">
							<Navdropdown icon={BsBellFill} dropType={'notifies'} />
						</div>
						<div className="col-3 text-center">
							<Navavatar />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
