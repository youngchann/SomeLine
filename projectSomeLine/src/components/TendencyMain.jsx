import React, {useEffect, useState} from 'react';

import Tendency from './Tendency';

const Data = [
  {title: 'group 1', items: ['취향을 여기 담아주세요.']},
  {title: 'group 2', items: ['축구', '농구', '배구', '테니스', '탁구', '골프', '야구', '크리켓', '럭비', '하키', '빙상', '스케이트보드', '서핑', '스노보드', '스키', '빠드민턴', '볼링', '조정', '육상', '자전거 경주', '수영', '다이빙', '레슬링', '복싱', '태권도', '유도', '카라테', '비치발리볼', '트라이애슬론', '마라톤', '승마', '펜싱', '양궁', '쇼트트랙', '체조', '래프팅', '패러글라이딩', '클라이밍', '카누', '카이악']}
]

function TendencyMain() {

  return (
    <div className="tendencymain_bg">
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain10.mp4' type='video/mp4' />
        </video>
      </div>
      <div className="tendencymain_box">
        <div className='tendencymain_header'><h1>~ 성향 리스트 샘플 ~</h1></div>
        <Tendency data={Data} />
        
      </div>
    </div>
  );
}

export default TendencyMain;