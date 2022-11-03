import './home.scss';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { useContext } from 'react';
import { PostsContext } from './../../context/PostsContext';

export const Home = () => {
	const { allPosts } = useContext(PostsContext);
	return (
		<>
			<div className='home container-fluid ps-3 d-flex justify-content-around'>
				<main>
					<div className='mb-5'>
						<AddPost />
					</div>
					{allPosts.map((post) => {
						return <Post postObj={post} key={post.postId} />;
					})}
				</main>
				<aside>
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
