import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MatesSuggestion } from './../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from './../../components/topicsToFollow/TopicsToFollow';
import { PostsContext } from './../../context/PostsContext';
import { Post } from './../../components/post/Post';
import { AuthContext } from '../../context/AuthContext';
import { UsersContext } from '../../context/UsersContext';

export const Postnotification = () => {
	const params = useParams().postId;
	console.log(params);

	const { allPosts } = useContext(PostsContext);
	const { currentUser } = useContext(AuthContext);
	const { allUsers } = useContext(UsersContext);
	const matesList = new Set(currentUser.matesList);

	const feed = [];

	allPosts.forEach((post) => {
        console.log("in")
		if (post.postId === params) {
			console.log(feed);
			if (matesList.has(post.createdBy)) feed.push({ post: post, feedDate: post.createdAt, shared: false });

			if (post.sharedBy.some((share) => matesList.has(share.sharedUserId))) {
				let matesShared = [];
				matesShared = [];
				post.sharedBy.forEach((share) => {
					if (matesList.has(share.sharedUserId)) {
						let user = allUsers.find((user) => user.uid === share.sharedUserId);
						matesShared.push(user.displayName);
					}
				});
				feed.push({ post: post, feedDate: post.sharedBy[post.sharedBy.length - 1].sharedTime, shared: true, matesShared: matesShared });
			}
		}
	});

	return (
		<>
			<div className='home ps-lg-3 d-flex mt-5'>
				<main className='ms-md-5'>
					{feed.map((obj, i) => {
						return <Post postObj={obj.post} key={i} shared={obj.shared} matesShared={obj.matesShared} />;
					})}
				</main>
				<aside className='fixed-top'>
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
