import './navavatar.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';


const Navavatar = (props) => {
    // toggle flag to control the dropdown menu
    let [toggle, setToggle] = useState(false);  
    // function to change the state of toggle flag 
    const handleClick = ()=>{
        toggle? setToggle(false): setToggle(true);
    }

  return (
    <div className="navavatar-container">
        {/* Avatar icon: */}
        <div className='avatar-icon'>
            <props.icon className={toggle? 'nav-icon active fs-5': 'nav-icon fs-5'} onClick={handleClick}/>
        </div>
        {/* Dropdown menu: */}
        {toggle && <div className='dropdown'>
                <div className='user-info'>
                    <div className='user-img mb-2'>
                        <img src={props.img} alt="user-img"/>
                    </div>
                    <p className='user-name mb-0 f-roboto fw5'>{props.name}</p>
                    <Link to="/profile" className='profile-link f-roboto fw5 d-block mb-2'>View Profile</Link>
                    <Link to="/" className='logout-link f-roboto fw5 d-block mb-1'>Logout</Link>
                </div>
            </div>
        }
    </div>
  )
}

export default Navavatar;
