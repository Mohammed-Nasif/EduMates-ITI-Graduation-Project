import './home.scss';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';
import { AuthContext } from '../../context/AuthContext';

export const Home = () => {
	const { allPosts } = useContext(PostsContext);
	const { currentUser } = useContext(AuthContext);

	const matesList = new Set(currentUser.matesList);
	return (
		<>
			<div className="home ps-3 d-flex ">
				<main className="ms-5">
					<div className="my-4">
						<AddPost />
					</div>
					{allPosts
						.filter((post) => matesList.has(post.createdBy) || post.sharedBy.forEach((user) => matesList.has(user)))
						.map((post) => {
							return <Post postObj={post} key={post.postId} />;
						})}
				</main>
				<aside className="fixed-top">
					{/* <MatesSuggestion /> */}
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
