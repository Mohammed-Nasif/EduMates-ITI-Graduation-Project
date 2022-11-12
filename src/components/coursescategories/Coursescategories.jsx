import './coursescategories.scss';
export const Coursescategories = ({ allCourses, handelSortCourses }) => {
	let topics = ['java script', 'css', 'problem solving', 'html', 'react js', 'git'];

	const handelsentSortedCourses = (flag) => {
		handelSortCourses(flag);
	};

	function sorting(e) {
		if (e.target.id === 'moreLessons') {
			allCourses.sort((a, b) => b.lessonsList.length - a.lessonsList.length);
			handelsentSortedCourses('more');
		} else if (e.target.id === 'lessLessons') {
			allCourses.sort((a, b) => a.lessonsList.length - b.lessonsList.length);
			handelsentSortedCourses('less');
		}
	}

	return (
		<>
			<div className='filter shadow mb-4 py-2 bg-white'>
				<h3>Filter by</h3>
				<div className='topics_wrapper'>
					<h6 className='py-1'>Topics:</h6>
					{topics.map((topic) => {
						return (
							<button className='topic_btn btn' key={topic}>
								# {topic}
							</button>
						);
					})}
				</div>
				<div className='sort_wrapper'>
					<h6 className='py-1'>Sort:</h6>
					<div className='form_recent '>
						<div className='form-check'>
							<input className='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1' />
							<label className='form-check-label' htmlFor='flexRadioDefault1'>
								Most recent
							</label>
						</div>
						<div className='form-check py-2'>
							<input className='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault2' />
							<label className='form-check-label' htmlFor='flexRadioDefault2'>
								Oldest
							</label>
						</div>
					</div>
				</div>
				<div className='more_lesson py-3'>
					<div className='form-check'>
						<input className='form-check-input' type='radio' name='flexRadioDefault' id='moreLessons' onClick={(e) => sorting(e)} />
						<label className='form-check-label' htmlFor='moreLessons'>
							More Lessons
						</label>
					</div>
					<div className='form-check py-2'>
						<input className='form-check-input' type='radio' name='flexRadioDefault' id='lessLessons' onClick={(e) => sorting(e)} />
						<label className='form-check-label' htmlFor='lessLessons'>
							Less Lessons
						</label>
					</div>
				</div>
			</div>
		</>
	);
};
