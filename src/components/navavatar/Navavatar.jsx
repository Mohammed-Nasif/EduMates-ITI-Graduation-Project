import './navavatar.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from './../../context/AuthContext';

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
      let handler = (e)=>{
        if(!dropdownRef.current.contains(e.target)){
         setToggle(false);
        }      
      };
      document.addEventListener("mousedown", handler);
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    });

	return (
		<div className='navavatar-container' ref={dropdownRef}>
			{/* Avatar icon: */}
			<div className='avatar-icon'>
				<BsPersonCircle className={toggle ? 'nav-icon active fs-5' : 'nav-icon fs-5'} onClick={handleClick} />
			</div>
			{/* Dropdown menu: */}
			{toggle && (
				<div className='dropdown'>
					<div className='user-info'>
						<div className='user-img mb-2'>
							<img src={currentUser.photoURL} alt='user-img' />
						</div>
						<p className='user-name mb-0 f-roboto fw5'>{currentUser.displayName}</p>
						<Link to={`/eduMates/profile/${currentUser.displayName}/${currentUser.uid}`}  className='profile-link f-roboto fw5 d-block mb-2'>
							View Profile
						</Link>
						<Link to='/' className='logout-link f-roboto fw5 d-block mb-1' onClick={() => signOut(auth)}>
							Logout
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
