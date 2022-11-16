import './topics.scss';
import noResult from '../../assets/images/topics-empty.svg';
import React, { useMemo, useState, useContext } from 'react';
import { Usertopics } from './Usertopics';
import { Alltopics } from './Alltopics';
import { AuthContext } from '../../context/AuthContext';
import { TopicsContext } from '../../context/TopicsContext';
import { PostsContext } from '../../context/PostsContext';
import { Post } from '../../components/post/Post';
import { MatesSuggestion } from '../../components/matessuggestionssection/MatesSuggestion';
import { TopicsToFollow } from '../../components/topicsToFollow/TopicsToFollow';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const Topics = () => {
	const { currentUser } = useContext(AuthContext);
	const { topicsOptions } = useContext(TopicsContext);
	const { allPosts } = useContext(PostsContext);

	let allTopics = [];
	topicsOptions.forEach((topic) => {
		allTopics.push(topic.label);
	});

	let followedTopics = currentUser.userTopics;
	const [userTopics, setUserTopics] = useState(followedTopics);
	const [selectedTopic, setSelectedTopic] = useState(followedTopics);

	const onSelectTopic = (topicName) => {
		let topic = [];
		topic.push(topicName);
		setSelectedTopic(topic);
	};

	// posts in specific topics
	const specificPosts = [];
	// inputs: array of userTopics and array of postTopics
	// output: true or false
	const includeTopics = (uTopics, pTopics) => {
		let flag = false;
		const uTopicsSet = new Set(uTopics);
		for (let item of pTopics) {
			if (uTopicsSet.has(item)) {
				flag = true;
				break;
			}
		}
		return flag;
	};

	allPosts.forEach((post) => {
		if (selectedTopic[0] === 'All') {
			if (includeTopics(userTopics, post.postTopics)) {
				specificPosts.push(post);
			}
		} else if (includeTopics(selectedTopic, post.postTopics)) {
			specificPosts.push(post);
		}
		// console.log(selectedTopic);
	});

	const onDeleteTopic = async (topic, topics) => {
		setUserTopics(topics);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			userTopics: arrayRemove(topic),
		});
	};

	const topicsToFollow = useMemo(() => {
		let toFollow = allTopics.filter((item) => {
			return !userTopics?.includes(item);
		});
		return toFollow;
	}, [allTopics, userTopics]);

	const onAddTopic = async (topic, topics) => {
		setUserTopics(topics);
		await updateDoc(doc(db, 'users', currentUser.uid), {
			userTopics: arrayUnion(topic),
		});
	};

	return (
		<>
			<div className="topics ps-lg-3 d-flex ">
				<main className="ms-md-5">
					<div className="topics-comp-container mx-auto mb-3 py-1 px-1">
						{/* Topics */}
						<div className="topics-container mb-5">
							<p className="title my-3">Topics</p>
							<div className="topics-content mx-4">
								<Usertopics userTopics={userTopics} onDeleteTopic={onDeleteTopic} onSelectTopic={onSelectTopic} />
								<Alltopics userTopics={userTopics} topicsToFollow={topicsToFollow} allTopics={allTopics} onAddTopic={onAddTopic} />
							</div>
						</div>
						{/* Posts: */}
						<div className=" posts-container">
							{specificPosts.length > 0 ? (
								specificPosts.map((post) => {
									return <Post postObj={post} key={post.postId} />;
								})
							) : (
								<div className="text-center py-3 px-2">
									<img src={noResult} alt="not-found" />
								</div>
							)}
						</div>
					</div>
				</main>
				<aside className="fixed-top">
					<MatesSuggestion />
					<TopicsToFollow />
				</aside>
			</div>
		</>
	);
};
