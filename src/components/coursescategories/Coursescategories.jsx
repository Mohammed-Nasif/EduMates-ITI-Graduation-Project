
import './coursescategories.scss';
export const Coursescategories = () => {
  let topics = [
    'java script',
    'css',
    'problem solving',
    'html',
    'react js',
    'git'
  ]

  return (
    <>
      <div className='filter shadow mb-4 py-2'>
        <h3>Filter by</h3>
        <div className='topics_wrapper'>
          <h6 className='py-1'>Topics:</h6>
          {topics.map(topic => {
            return <button className='topic_btn'># {topic}</button>
          })}
        </div>
        <div className='sort_wrapper'>
          <h6 className='py-1'>Sort:</h6>
          <div className='form_recent '>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
              />
              <label className='form-check-label' for='flexRadioDefault1'>
                Most recent
              </label>
            </div>
            <div className='form-check py-2'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault2'
                checked
              />
              <label className='form-check-label' for='flexRadioDefault2'>
                Oldest
              </label>
            </div>
          </div>
        </div>
        <div className='more_lesson py-3'>
          <div class='form-check  '>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckDefault'
            />
            <label class='form-check-label' for='flexCheckDefault'>
              More lessons
            </label>
          </div>
          <div className='form-check py-1'>
            <input
              class='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckChecked'
            />
            <label className='form-check-label' for='flexCheckChecked'>
              Less lessons
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
