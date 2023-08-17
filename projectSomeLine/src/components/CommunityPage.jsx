import React from 'react'
import { Link } from 'react-router-dom'

const CommunityPageLove = () => {

  const ids = [
    "이찬용", "전도희", "국지호", "임영찬", "나예호",
    "김신욱", "성다은", "김도운", "최진수", "정태녕",
    "송솔", "병민짱", "정수리", "양희준", "불주먹"
  ];
  
  const texts = [
    "냠냠입니다1", "냠냠입니다2", "냠냠입니다3", "냠냠입니다4", "냠냠입니다5",
    "냠냠입니다6", "냠냠입니다7", "냠냠입니다8", "냠냠입니다9", "냠냠입니다10",
    "냠냠입니다11", "냠냠입니다12", "냠냠입니다13", "냠냠입니다14", "냠냠입니다15"
  ];

  const counts = [
    5, 10, 15, 20, 25,
    30, 35, 40, 45, 50,
    55, 60, 65, 70, 75
  ];

  const boardData = Array.from({length: 15}).map((_, index) => ({
    number: index + 1,
    id: ids[index],
    text: texts[index],
    date: '23.8.15',
    count: counts[index]
  }));



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
              <div className='commu_page_board_contents_number'>{16-item.number}</div>
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