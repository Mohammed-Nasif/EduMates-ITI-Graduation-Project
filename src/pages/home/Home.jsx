import './home.scss';

// Components
import { Navbar } from './../../components/navbar/Navbar';
import { Sidebar } from './../../components/sidebar/Sidebar';

export const Home = () => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<div>Home</div>
		</>
	);
};
