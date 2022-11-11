import './courselandingIframe.scss'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
// import Iframe from 'react-iframe'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'
// import axios from 'axios'

export const CourselandingIframe = (props) => {
  // const baseURl =
  //   'https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDahH_bXneE701zW8UoiiB_2WgVX0lAXA4&part=snippet&maxResults=10&playlistId=PLDoPjvoNmBAw8NNtJF4Bvhhbnt6MghtSq'
  //   const [playList, setPlayList] = useState([])
  //  useEffect(() => {
  //       axios.get(baseURl).then(response => {
  //       setPlayList(response.data)
  //       console.log(playList);

  //     })
  //   }, [])
  // axios
  //   .get(baseURl)
  //   .then(function (response) {
  //     // handle success
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error)
  //   })
  //   .then(function () {
  //     // always executed
  //   })

  return (
    <>
      <Courseheading courseName={props.courseName} courseRating={props.courseRating}/>
      <>
        <div className='iframe_wrapper'>
          <ReactPlayer
            url={`https://www.youtube-nocookie.com/embed/${props.courseVideo}`}
            width='100%'
            controls={true}
          />
          <h4 className=''>Welcome To My Course!</h4>
        </div>
      </>
    </>
  )
}

export const Courseheading = (props) => {
  const rating = (value) => {
		let rate = (value / 100) * 5;
		return Math.round(rate * 2) / 2;
	};
  return (
    <>
      <div className='course_heading'>
        <h4 className='course_name'>{props.courseName}</h4>
        <div className='rating '>
          {/* <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' /> */}
          	{Array(5)
							.fill(0)
							.map((_, index) => {
								if (rating(props.courseRating) >= index + 1) {
									return <BsStarFill className='gold' size={20} key={index} />;
								} else if (rating(props.courseRating) - index === 0.5) {
									return <BsStarHalf className='gold' size={20} key={index} />;
								} else {
									return <BsStar className='gold' size={20} key={index} />;
								}
							})}
        </div>
      </div>
    </>
  )
}
