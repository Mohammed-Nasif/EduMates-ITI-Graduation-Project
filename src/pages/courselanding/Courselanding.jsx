import { Instructorcard } from '../../components/instructorcard/Instructorcard'
import './courselanding.scss'
import { CourselandingIframe } from './../../components/courselandingIframe/CourselandingIframe';
import { Courselandingdetails } from './../../components/courselandingdetails/Courselandingdetails';

export const Courselanding = () => {
  return (
    <>
      <div className='container-fluid mt-3 py-3'>
        <div className='row justify-content-around'>
          <div className='col-8'>
            <CourselandingIframe/>
            <Courselandingdetails/>
          </div>
          <div className='col-3'>
            <Instructorcard />
          </div>
        </div>
      </div>
    </>
  )
}
