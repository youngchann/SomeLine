import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Login = () => {

  const [err, setErr] = useState(false);
  const nav = useNavigate();

  // 팝업창을 끄기 위해 만든 함수안에 들어가는 변수를 담기위한 것.-작업자 : 이찬용 
  const [isVisible, setIsVisible] = useState(true);

  
  // main_popup_page_close 안에 들어가는 함수, 팝업창을 끄기 위한 함수.-작업자 : 이찬용
  const closePopup = () => {
      setIsVisible(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav('/matching')
    } catch (err) {
      alert('이메일 혹은 비밀번호가 틀렸습니다!')
      setErr(true);
    }
  };

  return (
    <div className='login_page'>
          <div className={isVisible ? 'main_popup_page' : 'hidden'}>
            <button className='main_popup_page_close' onClick={closePopup}>X</button>
            <div className='main_popup_page_text'>
              <h1>안녕하세요. 반가워요.</h1><br/>
              <p>저희는 <strong>App</strong>반의 <strong>OS</strong>팀입니다. </p>
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
            <form onSubmit={handleSubmit} className="loginbox_in_input_box">
              <input
              className="id_box"
              id="id"
              placeholder="이메일.."
              ></input>
              <input
              className="ps_box"
              id="password"
              type="password"
              placeholder="비밀번호.."
              
              ></input>
              <button className="login_submit_button">Login</button>
            </form>
            {/* <a href='#' className="find_ps_id">비밀번호 찾기 / 아이디 찾기</a> */}
        </div> 
    </div>
  )
}

export default Login;