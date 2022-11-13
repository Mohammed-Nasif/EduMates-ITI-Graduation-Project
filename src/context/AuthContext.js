import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			console.log(user);
			setCurrentUser(user);
			onSnapshot(doc(db, 'users', user.uid), (doc) => {
				console.log(doc.data());
				setCurrentUser(doc.data());
			});
		});
		// Clean Up Fn When Leave
		return () => {
			unSub();
		};
	}, []);
	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
