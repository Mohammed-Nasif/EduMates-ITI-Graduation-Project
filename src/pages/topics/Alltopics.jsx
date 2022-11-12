import './topics.scss';
import { BsCheckCircleFill } from 'react-icons/bs';
import React, { useState } from 'react';
import Select from 'react-select';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';

export const Alltopics = (props) => {
	let topicsToFollow = props.topicsToFollow;
	let topicsToFollowShow = topicsToFollow.slice(0, 7);

	let [isSelect, setIsSelect] = useState(undefined);
	let [selectedTopic, setSelectedTopic] = useState('');
	let [hoverAdd, setHoverAdd] = useState(undefined);
	let [selectOpt, setSelectOpt] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const options = [];
	options.push({ value: 'defaultValue', label: 'Select...', isDisabled: true });
	props.allTopics.forEach((item) => {
		if (props.userTopics?.includes(item)) {
			options.push({ value: item, label: item, isDisabled: true });
		} else {
			options.push({ value: item, label: item });
		}
	});

	const handleHoverAdd = (index) => {
		setHoverAdd(index);
	};
	const handleMouseLeave = () => {
		setHoverAdd(undefined);
	};

	const handleSelectTopic = (topic, index) => {
		setSelectedTopic(topic);
		setIsSelect(index);
	};
	const handleAddTopic = (topic) => {
		setSelectedTopic(topic);
		let topics = props.userTopics;
		if (!topics.includes(topic) && topic) {
			topics.push(topic);
			props.onAddTopic(topic, [...topics]);
		}
		setSelectOpt(false);
	};

	const handleSelectOption = (e) => {
		setSelectedTopic(e.value);
		setSelectOpt(true);
	};

	return (
		<div className="subtopics-container w-100">
			<p className="sub-title">Explore more</p>
			<div className="user-topics">
				<div className="row position-relative px-1 mb-3 border border-1  shadow-sm rounded-3 pt-2 bg-white">
					{topicsToFollowShow.map((topic, index) => {
						return (
							<div className="col-3 topic-container mb-2" key={index}>
								<div className="name-container">
									<p onClick={() => handleSelectTopic(topic, index)} onMouseOver={() => handleHoverAdd(index)} onMouseLeave={handleMouseLeave} className={isSelect === index || hoverAdd === index ? 'topic-name active' : 'topic-name'}>
										# {topic}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className='mb-3 '>
	{/* options={currentUser.systemFlags.isSystemProfile ? [...options, { value: 'bot', label: 'bot' }] : options} */}
	                  
					  <Select
						options={options}
						value={options.filter(function (option) {
							if (selectOpt) {
								return option.value === selectedTopic;
							} else {
								return option.value === 'defaultValue';
							}
						})}
						onChange={(event) => handleSelectOption(event)}
					/>
				</div>
				<div className='icon-container d-flex align-items-center'>
					<BsCheckCircleFill
						className={(isSelect >= 0) || selectOpt ? 'add-icon fs-2 mb-3' : 'add-icon fs-2 mb-3 prev-click'}
						onClick={() => handleAddTopic(selectedTopic)}
					/>
				</div>
			</div>
		</div>
	);
};
