import './navdropdown.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Navdropdown = (props) => {
    // toggle flag to control the dropdown menu
    let [toggle, setToggle] = useState(false);  
    // function to change the state of toggle flag 
    const handleClick = ()=>{
        toggle? setToggle(false): setToggle(true);
    }
  return (
    <div className='dropdown-container'>
        <div className='dropdown-icon'>
        <Link to='/'><props.icon className={toggle? 'nav-icon active': 'nav-icon'} onClick={handleClick}/></Link>
        </div>
        {toggle && <div className='dropdown'>
               {  
                    props.notifications.map((item, index)=>{
                        return (
                          <Link to='/' key={index+1} >
                            <div className="row mb-1">
                                <div className="col-2 user-img">
                                    <img src={item.userImg} alt={item.userName} />
                                </div>
                                <div className="col-8 px-0">
                                    <p className='pt-2 user-name'>{item.notifTitle}</p>
                                </div>
                            </div>
                          </Link>
                        )
                    })
               }
                <div className="row">
                </div>
           </div>
        }
    </div>
  )
}

