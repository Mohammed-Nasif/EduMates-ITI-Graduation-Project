import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { Main } from './pages/mainPreview/Main';
import { Landing } from './pages/landing/Landing';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';
import { Editprofile } from './pages/editprofile/Editprofile';
import { Topics } from './pages/topics/Topics';
import { Courses } from './pages/courses/Courses';
import { Chathome } from './pages/chat/Chathome';
import { Mateslist } from './pages/mateslist/MatesList';

const App = () => {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = () => {
		if (!currentUser) {
			return <Navigate to='/' />;
		}
		return <Main />;
	};

	return (
		<>
			<Routes>
				<Route
					path='/eduMates'
					element={
						<ProtectedRoute>
							<Main />
						</ProtectedRoute>
					}>
					<Route path='home' element={<Home />} />
					<Route path='profile'>
						<Route path=':userName/:userId' element={<Profile />} />
						<Route path='edit' element={<Editprofile />} />
						<Route path='matesList' element={<Mateslist />} />
					</Route>
					<Route path='topics' element={<Topics />} />
					<Route path='courses' element={<Courses />} />
					<Route path='chats' element={<Chathome />} />
				</Route>
				<Route path='/' element={<Landing />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
			</Routes>
		</>
	);
};

export default App;
