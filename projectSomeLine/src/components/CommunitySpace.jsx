import React from 'react'

const CommunitySpace = () => {
  return (
    <div className='communityspace_bg'>
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain9.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='communityspace_bg_shadow'><p title='이찬용'>✨</p><p title='전도희'>✨</p><p title='국지호'>✨</p><p title='임영찬'>✨</p></div>
      <div className='communityspace_box'>
        <div className='communityspace_box_header' ><h1>SOME.LINE</h1><p>community</p></div>
        
        <div className='communityspace_box_in_box2'>
          <div className='communityspace_box_in_best_page'>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
            <div>하나</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CommunitySpace