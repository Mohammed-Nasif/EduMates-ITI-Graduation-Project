import './navavatar.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { AuthContext } from './../../context/AuthContext';
import { updateDoc, doc, Timestamp } from 'firebase/firestore';

export const Navavatar = (props) => {
	const { currentUser } = useContext(AuthContext);
	// toggle flag to control the dropdown menu
	let [toggle, setToggle] = useState(false);
	// function to change the state of toggle flag
	const handleClick = () => {
		toggle ? setToggle(false) : setToggle(true);
	};
	// handle when click outside
	let dropdownRef = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!dropdownRef.current.contains(e.target)) {
				setToggle(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	const handleSignOut = async () => {
		await updateDoc(doc(db, 'users', currentUser.uid), {
			login: { isLoggedIn: false, date: Timestamp.now() },
		});
		signOut(auth);
	};
	return (
		<div className="navavatar-container" ref={dropdownRef}>
			{/* Avatar icon: */}
			<div className="avatar-icon text-center">
				<BsPersonCircle className={toggle ? 'nav-icon active fs-5' : 'nav-icon fs-5'} onClick={handleClick} />
			</div>
			{/* Dropdown menu: */}
			{toggle && (
				<div className="dropdown">
					<div className="user-info">
						<Link to={`/eduMates/profile/${currentUser.displayName}/${currentUser.uid}`} className="profile-link">
							<div className="user-img mb-2 bg-white">
								<img src={currentUser.photoURL} alt="user-img" />
							</div>
							<p className="user-name text-capitalize f-roboto fw5 d-block my-4  fs-5">{currentUser.displayName}</p>
						</Link>
						<Link to="/" className="logout-link f-roboto fw5 d-block mb-3 text-danger" onClick={handleSignOut}>
							Logout
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
