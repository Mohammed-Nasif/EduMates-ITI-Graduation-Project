import './uploadcoursemenu.scss';
import { Link } from 'react-router-dom';

export const Uploadcoursemenu = () => {
  return (
    <>
    <div className="upload_course text-center shadow bg-white">
      <h4 className='pb-4'>Upload your own Course</h4>
      <Link to="/uploadCourse"><button className='upload_btn'>Get started</button></Link>
    </div>
    </>
  )
}
