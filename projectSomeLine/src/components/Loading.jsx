import React from 'react'

const Loading = () => {
  return (
    <div className='loading_bg'>
        <div className='loading_container'>
            <div className='loading_box'>
                <div className='loading_cube'></div>
            </div>
            <h1 className='loading_text'>Loading...</h1>
        </div>
    </div>
  )
}

export default Loading