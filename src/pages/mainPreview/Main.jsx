import { Home } from '../home/Home';
import { Sidebar } from './../../components/sidebar/Sidebar';
import { NavbarComponent } from './../../components/navbar/Navbar';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const Main = () => {
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-2 p-0">
						<Sidebar />
					</div>
					<div className="col-10 p-0">
						<NavbarComponent  />
						<Home className='w-100' />
					</div>
				</div>
			</div>
		</>
	);
};
