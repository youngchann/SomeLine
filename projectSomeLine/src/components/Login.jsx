import React, { useState } from 'react';

const Login = () => {

  // 팝업창을 끄기 위해 만든 함수안에 들어가는 변수를 담기위한 것.-작업자 : 이찬용 
  const [isVisible, setIsVisible] = useState(true);

  // 인풋 내용을 바꾸기 위한 함수 - 작업자 : 이찬용
  const onChange = (e) => {
      console.log(e.target);
  }

  // main_popup_page_close 안에 들어가는 함수, 팝업창을 끄기 위한 함수.-작업자 : 이찬용
  const closePopup = () => {
      setIsVisible(false);
  }

  return (
    <div className='login_page'>
          <div className={`main_popup_page ${isVisible ? '' : 'hidden'}`}>
            <button className='main_popup_page_close' onClick={closePopup}>X</button>
            <div className='main_popup_page_text'>
              <h1>안녕하세요. 반가워요.</h1><br/>
              <p>저희는 App반의 OS팀입니다. </p>
              <p>저희가 제작한 웹서비스는 소개팅 웹입니다.</p>
              <p>AI를 이용하여 취향을 분석한 뒤 딱 맞는 이성에게 매칭해 드립니다.</p>
              <p>사랑해 주셔서 감사합니다.</p><br/>
              <h4>팀원</h4>
              <p>제작  :  이찬용, 전도희, 국지호, 임영찬</p>
            </div>
          </div>
          <div className="login_bgm_b">
            <video className="login_bgm" autoPlay muted loop>
              <source src='videos/mainmain8.mp4' type='video/mp4' />
            </video>
          </div>
          <div className='login_box'>
            <div className="login_box_header_name">
              <h1>Login</h1>
            </div>
            <input
            className="id_box"
            id="id"
            name="id"
            placeholder="아이디.."
            onChange={onChange}
            ></input>

            <input
            className="ps_box"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호.."
            onChange={onChange}
            ></input>
            <a href="#" className="login_wan_btn">Login</a>
            <a href='#' className="find_ps_id">비밀번호 찾기 / 아이디 찾기</a>
        </div> 
    </div>
  )
}

export default Login;