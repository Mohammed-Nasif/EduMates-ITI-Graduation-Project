import { createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { updateDoc, doc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
export const NotifiesContext = createContext();

export const NotifiesContextProvider = ({ children }) => {
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
			case 'FOLLOW_USER':
				return {
					...state,
					actionUser: action.payload.actionUser,
					userId: action.payload.userId,
					msgText: 'Followed you',
					notifyType: 'follow',
				};
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(NotifyReducer, INITIAL_STATE);

	useEffect(() => {
		state.userId && updateNotifies(state);
	}, [state]);

	const updateNotifies = async (s) => {
		if (s.userId !== s.actionUser.actionUserId) {
			await updateDoc(doc(db, 'users', s.userId), {
				unseenNotifies: arrayUnion({ ...s, notifiedAt: Timestamp.now() }),
			});
		}
	};

	return <NotifiesContext.Provider value={{ data: state, dispatch }}>{children}</NotifiesContext.Provider>;
};
