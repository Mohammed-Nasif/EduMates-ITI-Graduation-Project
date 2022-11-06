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

	for (let post of allPosts) {
		if (matesList.has(post.createdBy)) {
			feed.push(<Post postObj={post} key={post.postId} />);
		}
		if (post.sharedBy.some((share) => matesList.has(share.sharedUserId))) {
			let shares = [];
			post.sharedBy.forEach((sharing) => {
				if (matesList.has(sharing.sharedUserId)) {
          shares.push(sharing.sharedUserId);  
        }
			});
      let shareNames = [];
      if (shares && allUsers) {
        shares.forEach((share) => {
          let user = allUsers?.find((user) => user.uid === share);
          shareNames.push(user.displayName);
        });
      }
			feed.push(<Post postObj={post} key={post.postId} shareNames={shareNames} />);
		}
	}

	return (
		<>
			<div className="home ps-3 d-flex ">
				<main className="ms-5">
					<div className="my-4">
						<AddPost />
					</div>

					{feed.map((post) => post)}
					{/* {allPosts
						.filter((post) => {
							return matesList.has(post.createdBy) || post.sharedBy.forEach((share) => matesList.has(share.sharedUserId));
						})
						.map((post) => {
							return <Post postObj={post} key={post.postId} />;
						})} */}
				</main>
				<aside className="fixed-top">
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
