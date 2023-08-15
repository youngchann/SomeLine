import React from 'react'
import { Link } from 'react-router-dom'

const CommunityInPage = () => {
  return (
    <div className='communityspace_bg'>
    <div className="login_bgm_b">
      <video className="login_bgm" autoPlay muted loop>
        <source src='videos/mainmain9.mp4' type='video/mp4' />
      </video>
    </div>
    <div className='communityspace_bg_shadow'><p title='이찬용'>✨</p><p title='전도희'>✨</p><p title='국지호'>✨</p><p title='임영찬'>✨</p></div>
    <div className='communityspace_box'>
      <div className='communityspace_box_header' ><h1>썸·연애</h1><p>community ➤</p><Link to={'/communitypagelove'} title='메인으로 가기'>⍇</Link></div>
      <div className='communityspace_box_advertisement'>광고 페이지/ 광고문의는 이찬용에게</div>
      <div className='commu_page_board'>
        
      </div>
    </div>
  </div>
  )
}

export default CommunityInPage