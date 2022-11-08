import './instructorcard.scss'
import instrucotImg from './1664282187647 1.png'

export const InstructorProfile = () => {
  return (
    <>
      <div className='instructor_profile  text-center py-2 px-1  '>
        <div className='instructor_img mx-auto my-0 p-0  '>
          <img src={instrucotImg} alt='instructor_photo ' />
        </div>
        <div className='instructor_info p-0 m-0'>
          <h6 className=''>Mohamed Nasif</h6>
          <p className='text-secondary '>
            Intern | Information Technology Institute
          </p>
        </div>
        <div className='follow_btn'>
          <button>Follow</button>
        </div>
      </div>
    </>
  )
}
