import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			// console.log(user);
		});

		// Clean Up Fn When Leave
		return () => {
			unSub();
		};
	}, []);
    
	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
