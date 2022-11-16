import { Suggestedmate } from './Suggestedmate';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';

import './matessuggestion.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const MatesWrapper = ({ allUsers }) => {
	const { currentUser } = useContext(AuthContext);
	const sugList = allUsers.filter((user) => !currentUser?.matesList?.includes(user.uid));

	return (
		<>
			<Swiper
				direction={'vertical'}
				slidesPerView={3}
				spaceBetween={5}
				loop={!!(sugList.length > 2)}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				// navigation={true}
				modules={[Autoplay, Navigation]}
				className='mySwiper'>
				{sugList.map((sugUser) => {
					return (
						<SwiperSlide key={sugUser.uid}>
							<Suggestedmate sugUser={sugUser}></Suggestedmate>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
};
