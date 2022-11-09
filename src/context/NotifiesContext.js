import { createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { updateDoc, doc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
export const NotifiesContext = createContext();

export const NotifiesContextProvider = ({ children }) => {
	// const [notifiesCount, setNotifiesCount] = useState(0);

	const INITIAL_STATE = {
		postId: null,
		commentId: null,
		actionUser: {},
		notifyType: null,
		userId: null,
		msgText: null,
	};

	const NotifyReducer = (state, action) => {
		switch (action.type) {
			case 'LIKE_POST':
				return {
					...state,
					actionUser: action.payload.actionUser,
					postId: action.payload.postId,
					userId: action.payload.userId,
					msgText: 'Liked your post',
					notifyType: 'like',
				};
			case 'COMMENT_ON_POST':
				return {
					...state,
					actionUser: action.payload.actionUser,
					postId: action.payload.postId,
					userId: action.payload.userId,
					commentId: action.payload.commentId,
					msgText: 'Commented on your post',
					notifyType: 'comment',
				};
			case 'SHARE_POST':
				return {
					...state,
					actionUser: action.payload.actionUser,
					postId: action.payload.postId,
					userId: action.payload.userId,
					msgText: 'Shared your post',
					notifyType: 'share',
				};
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(NotifyReducer, INITIAL_STATE);

	useEffect(() => {
		state.userId && updateNotifies(state);
		console.log(state);
		console.log('notification sent');
	}, [state]);

	const updateNotifies = async (s) => {
		if (s.userId !== s.actionUser.actionUserId) {
			await updateDoc(doc(db, 'users', s.userId), {
				userNotifies: arrayUnion(s),
			});
		}
	};

	return <NotifiesContext.Provider value={{ data: state, dispatch }}>{children}</NotifiesContext.Provider>;
};
