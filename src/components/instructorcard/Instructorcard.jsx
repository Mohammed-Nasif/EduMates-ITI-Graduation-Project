import './instructorcard.scss'
import { InstructorProfile } from './Instructorprofile'
import { Instructorabout } from './Instructorabout'
import { FAQ } from './FAQ'

// Col-3 - Sticky
export const Instructorcard = () => {
  return (
    <>
      <div className='  instractor_wrapper pb-4   shadow-sm'>
        <InstructorProfile />
        <Instructorabout />
        <FAQ />
      </div>
    </>
  )
}
