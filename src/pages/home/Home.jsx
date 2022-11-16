import './home.scss';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { AuthContext } from '../../context/AuthContext';
import { UsersContext } from '../../context/UsersContext';

export const Home = () => {
	const { allPosts } = useContext(PostsContext);
	const { currentUser } = useContext(AuthContext);
	const { allUsers } = useContext(UsersContext);
	const matesList = new Set(currentUser.matesList);

	let feed = [];

	allPosts.forEach((post) => {
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
	});
	feed.sort((a, b) => b.feedDate - a.feedDate);

	return (
		<>
			<div className="home ps-lg-3 d-flex ">
				<main className="ms-md-5">
					<div className="my-4">
						<AddPost />
					</div>

					{feed.map((obj, i) => {
						return <Post postObj={obj.post} key={i} shared={obj.shared} matesShared={obj.matesShared} />;
					})}
				</main>
				<aside className="fixed-top">
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
