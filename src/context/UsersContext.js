import { query, collection, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { db } from '../firebase';
export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
	const [allUsers, setallUsers] = useState([]);

	useEffect(() => {
		const q = query(collection(db, 'users'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const usersRes = [];
			querySnapshot.forEach((doc) => {
				usersRes.push(doc.data());
			});
			setallUsers(usersRes);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <UsersContext.Provider value={{ allUsers }}>{children}</UsersContext.Provider>;
};
