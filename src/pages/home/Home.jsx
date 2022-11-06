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

	const posts = allPosts.filter((post) => matesList.has(post.createdBy)); // Get Posts To Home Including you and Mates

	const feed = posts.map((post) => {
		if (post.sharedBy.length === 0) {
			return { post: post, feedDate: post.createdAt };
		} else {
			return { post: post, feedDate: post.sharedBy[post.sharedBy.length - 1].sharedTime };
		}
	});
	feed.sort((a, b) => new Date(b.feedDate) - new Date(a.feedDate));
	console.log(feed);

	// for (let post of posts) {
	// 	feed.push({ date: post.createdAt, post: post, shared: false });
	// }
	// console.log(feed);

	// let sharedPosts = allPosts.filter((post) => {

	// 	return !!post.sharedBy.find((share) => {
	// 		matesList.has(share.sharedUserId);

	// 	});
	// });

	// for (let post of sharedPosts) {
	// 	let matesNames = [];
	// 	post.sharedBy.forEach((share) => {
	// 		if (matesList.has(share.sharedUserId)) {
	// 			let user = allUsers.find((user) => user.uid === share.sharedUserId);
	// 			matesNames.push(user.displayName);
	// 		}
	// 	});
	// 	let dateOfLastShare = post.sharedBy.slice(-1).sharedTime;
	// 	feed.push({ date: dateOfLastShare, post: post, shared: true, matesNames: matesNames });
	// }
	// console.log(feed);

	// for (let post of posts) {
	// 	if (matesList.has(post.createdBy)) {
	// 		feed.push(<Post postObj={post} key={post.postId} />);
	// 	}

	// 	if (post.sharedBy.some((share) => matesList.has(share.sharedUserId))) {
	// 		let shares = [];
	// 		post.sharedBy.forEach((sharing) => {
	// 			if (matesList.has(sharing.sharedUserId)) {
	// 				shares.push(sharing.sharedUserId);
	// 			}
	// 		});
	// 		let shareNames = [];
	// 		if (shares && allUsers) {
	// 			shares.forEach((share) => {
	// 				let user = allUsers?.find((user) => user.uid === share);
	// 				shareNames.push(user.displayName);
	// 			});
	// 		}
	// 		feed.push(<Post postObj={post} key={post.postId} shareNames={shareNames} />);
	// 	}
	// }

	return (
		<>
			<div className='home ps-3 d-flex '>
				<main className='ms-5'>
					<div className='my-4'>
						<AddPost />
					</div>

					{feed.map((obj, i) => {
						return <Post postObj={obj.post} key={i} shared={obj.shared} matesNames={obj.matesNames} />;
					})}
					{/* {allPosts
						.filter((post) => {
							return matesList.has(post.createdBy) || post.sharedBy.forEach((share) => matesList.has(share.sharedUserId));
						})
						.map((post) => {
							return <Post postObj={post} key={post.postId} />;
						})} */}
				</main>
				<aside className='fixed-top'>
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
