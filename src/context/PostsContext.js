import { getDocs, query, collection } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { db } from '../firebase';
export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
	const [allPosts, setAllPosts] = useState([]);
	useEffect(() => {
		// const postsRes = [];
		// const postsRef = collection(db, 'posts');
		// const q = query(postsRef);
		// const sub = async () => {
		// 	const querySnapshot = await getDocs(q);
		// 	querySnapshot.forEach((doc) => {
		// 		// console.log(doc.id, ' => ', doc.data());
		// 		postsRes.push(doc.data());
		// 	});
		// 	setAllPosts(postsRes);
		// };
		// sub();
	}, []);

	return <PostsContext.Provider value={{ allPosts }}>{children}</PostsContext.Provider>;
};
