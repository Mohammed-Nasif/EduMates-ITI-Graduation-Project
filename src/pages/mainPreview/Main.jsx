import { Home } from '../home/Home';
import { Sidebar } from './../../components/sidebar/Sidebar';
import { NavbarComponent } from './../../components/navbar/Navbar';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const Main = () => {
	return (
		<>
			<NavbarComponent />
			<Sidebar />
			<Home />
			<button onClick={() => signOut(auth)}>Logout</button>
		</>
	);
};
