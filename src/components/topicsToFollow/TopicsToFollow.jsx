import './TopicsToFollow.scss';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const TopicsToFollow = () => {
	const topicsToFollow = ['#JavaScript', '#DevOps', '#Ui-Ux'];
	return (
		<div className='topics-suggestion-layout'>
			<h4 className='fw-bold ps-4 pt-3'>Topics</h4>
			<div className='ps-4 pt-3'>
				{topicsToFollow.map((topic, i) => {
					return (
						<div key={i} className='row mb-2 g-5'>
							<div className='col-8 fw-bold'>{topic}</div>
							<div className='col-4'>
								<BsPlusCircle className='plus-icon' />
							</div>
						</div>
					);
				})}
			</div>
			<div className='show-more-section'>
				<p className='link text-center pt-2'>
					<Link to="/eduMates/topics" className='text-decoration-none'>Show All</Link>
				</p>
			</div>
		</div>
	);
};
