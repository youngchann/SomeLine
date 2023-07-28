import React from 'react'

const Signup = () => {

    // 인풋 안에 글씨를 넣기 위한 이벤트함수입니다. - 작업자 : 이찬용
    const onChange = (e) => {
        console.log(e.target);
    }

  return (
    <div className='sign_up_page'>
        <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
        </div>
        <div className='sign_up_box'>
            <div className="login_box_header_name">
              <h2>Sign Up</h2>
            </div>
            <input
                className="signup_id_box"
                id="signup_id_box"
                name="signup_id_box"
                placeholder="아이디"
                onChange={onChange}
            ></input>
            <input
                className="signup_ps_box"
                id="signup_ps_box"
                name="signup_ps_box"
                type="password"
                placeholder="비밀번호"
                onChange={onChange}
            ></input>
            <input
                className="signup_re_ps_box"
                id="signup_re_ps_box"
                name="signup_re_ps_box"
                type="password"
                placeholder="비밀번호 확인"
                onChange={onChange}
            ></input>
            <input
                className="signup_name_box"
                id="id"
                name="id"
                placeholder="이름"
                onChange={onChange}
            ></input>
            <input
                className="signup_date_box"
                id="id"
                name="id"
                placeholder="생년월일 8자리"
                onChange={onChange}
            ></input>
            <div className='gender_box'>
                <a href="#" className="signup_wan_btn">남성</a>
                <a href="#" className="signup_wan_btn">여성</a>
            </div>
            <a href="#" className="login_wan_btn">가입하기</a>
        </div>
    </div>
  )
}

export default Signup