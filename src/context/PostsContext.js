import { query, collection, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { db } from '../firebase';
export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
	const [allPosts, setAllPosts] = useState([]);
	useEffect(() => {
		const q = query(collection(db, 'posts'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const postsRes = [];
			querySnapshot.forEach((doc) => {
				postsRes.push(doc.data());
			});
			setAllPosts(postsRes);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <PostsContext.Provider value={{ allPosts }}>{children}</PostsContext.Provider>;
};
