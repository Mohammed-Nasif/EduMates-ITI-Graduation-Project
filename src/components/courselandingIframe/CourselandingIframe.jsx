import './courselandingIframe.scss'
import { BsStarFill } from 'react-icons/bs'
// import Iframe from 'react-iframe'
import ReactPlayer from 'react-player'

export const CourselandingIframe = () => {
  return (
    <>
      <Courseheading />
      <>
        {/* <iframe
          width='853'
          height='480'
          src=' https://www.youtube.com/embed/youidvideo?autoplay=1&rel=0&showinfo=0'
          title='HTML : Is it possible to only remove the  and '
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe> */}

        <div className='iframe_wrapper'>
          <ReactPlayer
            url='https://www.youtube-nocookie.com/embed/https://www.youtube.com/watch?v=Ml7ovL69uFQ&list=PLqUX34SwGksRZHcVE2eGtxW8C0xcwEtkA&index=10'
            width='100%'
            controls={true}
          />
          <h4 className=''>Welcome To My Course!</h4>
        </div>
      </>
    </>
  )
}

export const Courseheading = () => {
  return (
    <>
      <div className='course_heading'>
        <h4 className='course_name'>Front-End Developer Roadmap</h4>
        <div className='rating '>
          <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' />
          <BsStarFill className='star' />
        </div>
      </div>
    </>
  )
}
