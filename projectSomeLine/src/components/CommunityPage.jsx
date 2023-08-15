import React from 'react'
import { Link } from 'react-router-dom'

const CommunityPageLove = () => {


  const boardData = Array(20).fill({
    number: 1,
    id: '이찬용',
    text: '냠냠입니다.',
    date: '2023·8·15',
    count: 1
  });



  return (
    <div className='communityspace_bg'>
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain9.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='communityspace_bg_shadow'><p title='이찬용'>✨</p><p title='전도희'>✨</p><p title='국지호'>✨</p><p title='임영찬'>✨</p></div>
      <div className='communityspace_box'>
        <div className='communityspace_box_header' ><h1>썸·연애</h1><p>community➤love</p><Link to={'/community'} title='메인으로 가기'>⍇</Link></div>
        <div className='communityspace_box_advertisement'>광고 페이지/ 광고문의는 이찬용에게</div>
        <div className='commu_page_board'>
          <div className='commu_page_board_contents'>
            <div className='commu_page_board_contents_number'>번호</div>
            <div className='commu_page_board_contents_id'>계정</div>
            <div className='commu_page_board_contents_text'>내용</div>
            <div className='commu_page_board_contents_date'>날짜</div>
            <div className='commu_page_board_contents_count'>조회수</div>
          </div>
          {boardData.map((item, index) => (
            <div className='commu_page_board_contents' key={index}>
              <div className='commu_page_board_contents_number'>{item.number + 19-index}</div>
              <div className='commu_page_board_contents_id'>{item.id}</div>
              <Link to={'/communityinpage'} className='commu_page_board_contents_text'>{item.text}</Link>
              <div className='commu_page_board_contents_date'>{item.date}</div>
              <div className='commu_page_board_contents_count'>{item.count}</div>
            </div>
          ))}
          <div className='commu_page_board_location'>
            <div className='commu_page_board_location_keys'>1 2 3 4 5 6 7 다음페이지▶︎</div>
            <div className='commu_page_board_location_writing'><Link to={'/communitywrite'}>글쓰기</Link></div>
          </div>
        </div>        
      </div>
    </div>
  )
}

export default CommunityPageLove