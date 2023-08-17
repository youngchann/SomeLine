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
      <div className='communityspace_box_header' ><h1>썸·연애</h1><p>community➤love</p><Link to={'/communitypagelove'} title='메인으로 가기'>⍇</Link></div>
      <div className='communityspace_box_advertisement'>광고 페이지/ 광고문의는 이찬용에게</div>
      <div className='commu_page_board'>
        <div className='commu_page_info' >
          <div className='commu_page_info_title'>냠냠입니다1</div>
          <div className='commu_page_info_id'>작성자 · 이찬용</div>
        </div>
        <div className='commu_page_text_contents'>
          내용은 없습니다.
        </div>
        <div className='commu_page_ripple_box'>
          <div className='commu_page_ripple_contents'>
            <div className='commu_page_ripple_contents_id'>▪︎ 전도희</div>
            <div className='commu_page_ripple_contents_text'>뭐예요</div>
          </div>
          <div className='commu_page_ripple_contents'>
            <div className='commu_page_ripple_contents_id'>▪︎ 국지호</div>
            <div className='commu_page_ripple_contents_text'>나도 냠냠</div>
          </div>
        </div>
        <form className='commu_page_ripple_contents_write'>
          <input 
            className='commu_page_ripple_contents_write_input'
            placeholder='댓글내용을 입력하세요.'
            >
          </input>
          <button className='commu_page_ripple_contents_write_sub'>작성하기</button>
        </form>
        
      </div>
    </div>
  </div>
  )
}

export default CommunityInPage