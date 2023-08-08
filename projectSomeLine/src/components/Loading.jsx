import React from 'react'

const Loading = () => {
  return (
    <div className='loading_bg'>
        <div className='loading_box'>
            <span style={{ '--i': '1' }}></span>
            <span style={{ '--i': '2' }}></span>
            <span style={{ '--i': '3' }}></span>
            <span style={{ '--i': '4' }}></span>
            <span style={{ '--i': '5' }}></span>
            <span style={{ '--i': '6' }}></span>
            <span style={{ '--i': '7' }}></span>
        </div>
        <svg>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdeviation="10"/>
                <feColorMatrix values='
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10
                '/>
            </filter>
        </svg>
    </div>
  )
}

export default Loading