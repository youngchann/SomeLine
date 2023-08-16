import React, { useState, useEffect, useRef, useContext } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Link } from 'react-router-dom';
import Footer from './Footer';


function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

const CommunitySpace = () => {

  const options = {
    scale: 1.05,
    speed: 1000,
    max: 4
  };


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
          <div className='comu_best_box_header'>오늘의 베스트 글</div>
            <div className='comu_best_box_contents'>어제 이런 일이 있었어요.</div>
            <div className='comu_best_box_contents'>전기버스에서 너무 냄새나요 ㅜ</div>
            <div className='comu_best_box_contents'>오늘 좋은 일이 있었어요!</div>
            <div className='comu_best_box_contents'>연애 시작했어요!</div>
            <div className='comu_best_box_contents'>우울해요.</div>
            <div className='comu_best_box_contents'>세상 믿을 사람 하나 없네요.</div>
            <div className='comu_best_box_contents'>임영찬이라는 사람 아세요?</div>
            <div className='comu_best_box_contents'>국지호가 복싱에서 우승했어요</div>
          </div>
          <div className='communityspace_box_in_best_page'>
            <div className='comu_best_box_header'>어제의 베스트 글</div>
            <div className='comu_best_box_contents'>전도희씨 안녕하세요?</div>
            <div className='comu_best_box_contents'>좋은 일이 생겼어요.</div>
            <div className='comu_best_box_contents'>이글 누르면 여자친구 생긴다.</div>
            <div className='comu_best_box_contents'>콘칩 안에서 이물질이 나왔어요ㅠ</div>
            <div className='comu_best_box_contents'>코딩 재밌어요.</div>
            <div className='comu_best_box_contents'>이찬용팬은 이글 꼭 보세여.</div>
            <div className='comu_best_box_contents'>서울 맛집 빵집 베스트 10위</div>
            <div className='comu_best_box_contents'>이런 사람 조심하세요.</div>
          </div>
        </div>
        <div class="communityspace_animated-title">
          <div class="communityspace_title_track">
            <div class="communityspace_title_content">WE COME TO LOVE NOT BY FINDING A PERFECT PERSON, BUT BY LEARNING TO SEE AN IMPERFECT PERSON PERFECTLY.</div>
          </div>
        </div>
        <div className='communityspace_box_in_box3'>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>💕</div></Link>
              <div className='comu_boxs_title'>썸·연애</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🔥</div></Link>
              <div className='comu_boxs_title'>인기·핫픽</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🎧</div></Link>
              <div className='comu_boxs_title'>음악</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🐩</div></Link>
              <div className='comu_boxs_title'>반려 동물</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🏙</div></Link>
              <div className='comu_boxs_title'>회사 생활</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🏄🏻‍♂️</div></Link>
              <div className='comu_boxs_title'>취미 생활</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🛍</div></Link>
              <div className='comu_boxs_title'>지름·쇼핑</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>💋</div></Link>
              <div className='comu_boxs_title'>패션·뷰티</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>💌</div></Link>
              <div className='comu_boxs_title'>셀소 공간</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🎮</div></Link>
              <div className='comu_boxs_title'>게임</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🗽</div></Link>
              <div className='comu_boxs_title'>여행·맛집</div>
          </Tilt>
          <Tilt options={options} className='comu_boxs'>
              <Link to={'/communitypagelove'}><div className='comu_boxs_icon'>🏋🏻‍♀️</div></Link>
              <div className='comu_boxs_title'>다이어트·헬스</div>
          </Tilt>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default CommunitySpace