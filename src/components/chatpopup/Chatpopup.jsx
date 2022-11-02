import './chatpopup.scss';

import photo from '../../pp.jpg';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { BsBoxArrowInUp } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { useState } from 'react';

export const Chatpopup = () => {
	const [chatOpen, setChatOpen] = useState(false);
	const chatToggle = function () {
		setChatOpen((prev) => !prev);
	};
	return (
		<div className='popup-chat-container' style={{ height: !chatOpen ? 'auto' : '' }}>
			<div className='chat-header'>
				<div className='row d-flex align-items-center p-3'>
					<div className='col-2'>
						<img className='w-100' src={photo} alt='userPicture' />
					</div>
					<div className='col'>Salwa Kamel</div>
					<div className='col-2 chat-toggle' onClick={chatToggle}>
						{chatOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
					</div>
				</div>
			</div>
			<div className='chatBox' style={{ display: chatOpen ? 'block' : 'none' }}>
				<div className='chatBody p-3 pt-5'>
					<div className='row d-flex p1 g-2'>
						<div className='col-3'>
							<img className='w-100' src={photo} alt='userPicture' />
						</div>
						<div className='col'>
							<p className='p-2'>As a leader, It is important to not just see your own success, but focus on the success of others.</p>
						</div>
					</div>
				</div>
				<div className='chatFooter'>
					<div className='row d-flex align-items-center g-2 ps-3'>
						<div className='col-2'>
							<BsBoxArrowInUp className='sendMsg' />
						</div>
						<div className='col'>
							<input className='ps-3' type='text'></input>
						</div>
						<div className='col'>
							<BiSend className='sendMsg' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
