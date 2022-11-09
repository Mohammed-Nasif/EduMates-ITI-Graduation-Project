import './discussioncomment.scss';
import userImage from './../../assets/images/Default-avatar.jpg';




export const Discussioncomment = (props) => {
    return (
        <div className="discussion-comment mb-1 pt-1 pb-0 mx-auto ">
            <div className='row mb-0'>
                <div className='col-2 text-center pe-0'>
                    <img src={userImage} alt="" />
                </div>
                <div className='col-5 d-flex align-items-center flex-column'>
                    <p className='mb-1 w-100 fw-bold user-name'>User name</p>
                    <p className='w-100 mb-0 comment-content'>{props.commentContent}</p>
                </div>
            </div>
        </div>
    )
}