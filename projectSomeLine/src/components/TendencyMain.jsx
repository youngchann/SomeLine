import React, {useEffect, useState} from 'react';

import Tendency from './Tendency';

const Data = [
  {title: 'group 1', items: ['만화/영화','반려동물','건강']},
  {title: 'group 2', items: ['삭제할 취향을 여기로 끌어 담아주세요.']}
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
        <div className='tendencymain_header'><h1>~ 성향 커스텀 ~</h1></div>
        <Tendency data={Data} />
      </div>
    </div>
  );
}

export default TendencyMain;