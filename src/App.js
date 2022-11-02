import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { Main } from './pages/mainPreview/Main';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = () => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
		return <Main />;
	};
	
	return (
		<Routes>
			<Route path='/'>
				<Route
					index
					element={
						<ProtectedRoute>
							<Main />
						</ProtectedRoute>
					}
				/>
			</Route>
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
		</Routes>
	);
};

export default App;
