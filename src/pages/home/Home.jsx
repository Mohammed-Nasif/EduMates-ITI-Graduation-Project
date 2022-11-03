import './home.scss';
import { AddPost } from '../../components/addpost/Addpost';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow, topicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';

export const Home = () => {
	return (
		<>
			<div className="home container-fluid ps-3 d-flex justify-content-around">
				<main>
					<div className="mb-5">
						<AddPost />
					</div>

					<Post />
					<Post />
					<Post />
					<Post />
				</main>
				<aside>
					<MatesSuggestion />
          <TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
