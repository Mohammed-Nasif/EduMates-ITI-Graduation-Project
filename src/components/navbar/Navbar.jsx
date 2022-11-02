import './navbar.scss';
import userImg from './../../assets/images/user2.jpg';
import notificationImg from './../../assets/images/user.png';
import { Link } from 'react-router-dom';
import { BsTrophyFill, BsFillChatDotsFill, BsBellFill, BsPersonCircle} from "react-icons/bs";
import { useState } from 'react';
import Navavatar from '../nav-avatar/Navavatar';
import Dropdown from '../items-dropdown/Dropdown';

const NavbarComponent = () => {
    let [searchValue, setSearchValue] = useState('');
    // notifications:
    let notificationsList = [
        {
            userName: "Mohamed Nasif",
            userImg: notificationImg,
            notifTitle: "Mohamed Nasif , Liked your post!"
        },
        {
            userName: "Mohamed Nasif",
            userImg: notificationImg,
            notifTitle: "Mohamed Nasif , sent you connect request!"
        },
        {
            userName: "Mohamed Nasif",
            userImg: notificationImg,
            notifTitle: "Mohamed Nasif , shared your post!"
        },
        {
            userName: "Mohamed Nasif",
            userImg: notificationImg,
            notifTitle: "Mohamed Nasif , commented on your post!"
        },
    ]
    // chats:
    let chats = [
        {
            notifTitle: "Mohamed Nasif",
            userImg: notificationImg,
        },
        {
            notifTitle: "Mohamed Nasif",
            userImg: notificationImg,
        },
        {
            notifTitle: "Mohamed Nasif",
            userImg: notificationImg,
        }
    ]
    const getInputData = (e)=> {
        if(e.keyCode === 13){
            setSearchValue(e.target.value);
            e.target.value = "";
        }
    }
  return (
    <div className='navbar-container position-fixed'>
        <div className="nav-content d-flex align-items-center position-relative">
           <div className="row w-100">
                <div className="nav-search-container col-9">
                    <div className="nav-search-content">
                        <input type="search" placeholder='Search...'  onKeyDown={(event)=>getInputData(event)} />
                    </div>
                </div>
                <div className="nav-icons col-3 d-flex align-items-center">
                    <div className="col-3">
                            <Link to='/'><BsTrophyFill className='nav-icon'/></Link>
                    </div>
                    <div className="col-3">
                        {/* <Link to='/'><BsFillChatDotsFill className='nav-icon'/></Link> */}
                        <Dropdown icon = {BsFillChatDotsFill} notifications={chats}/>
                    </div>
                    <div className="col-3">
                        {/* <Link to='/'><BsBellFill className='nav-icon'/></Link> */}
                        <Dropdown icon = {BsBellFill} notifications={notificationsList}/>
                    </div>
                    <div className="col-3">
                      <Navavatar icon = {BsPersonCircle} name={"Asmaa AboBakr"} img={userImg}/>
                    </div>
                </div>
           </div>
        </div>
    </div>
    
  )
}


export default NavbarComponent;
