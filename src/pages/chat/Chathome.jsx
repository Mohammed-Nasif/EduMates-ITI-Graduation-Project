import './chathome.scss';
import { Chatnav } from './chatcomponents/Chatnav';
import { Messages } from './chatcomponents/Messages';
import { Searchchats } from './chatcomponents/Searchchats';
import { Chats } from './chatcomponents/Chats';
import { Input } from './chatcomponents/Input';

export const Chathome = () => {
	return (
		<div className="row g-0 gap-5 ps-5 pt-4">
			<div className="chat_main col-8 bg-white">
				<Chatnav />
				<Messages />
				<Input />
			</div>
			<div className="chat_side col-3 bg-white">
				<div className="side_head">
					<h2 className="side_title">Your Mates</h2>
					<Searchchats />
				</div>
				<Chats />
			</div>
		</div>
	);
};
