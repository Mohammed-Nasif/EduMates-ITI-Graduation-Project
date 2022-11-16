import './lessondisplay.scss'

export const LessonDisplay = (props) => {
    return (
        <div>
            <div className='lesson-display'>
                <div className='ratio ratio-16x9'>
                    <iframe title='youtube-frame' id="ytplayer" type="text/html" width="640" height="360"
                    src={`https://www.youtube.com/embed/${props.lessoncontent.lessonID}?rel=0`}
                    frameBorder="0"></iframe>
                </div>
                <div className='p-4'>
                    <p className='fw-bolder fs-4'>
                        {`lesson ${props.lessoncontent.lessonNum}:  ${props.lessoncontent.lessonTitle}`}
                    </p>
                </div>
            </div>
        </div>
    )
}

