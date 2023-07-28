import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

// VanillaTilt 라이브러리를 사용하기 위한, 함수와 변수들 입니다. - 작업자 : 이찬용
function Tilt(props) {

  const { options, ...rest } = props;
  const tilt = useRef(null);
  
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
  
    return <div ref={tilt} {...rest} />;
  }



const Matching = () => {

    //// VanillaTilt 라이브러리를 조절하기 위한 옵션 입니다. -작업자 : 이찬용
    const options = {
        scale: 1.1,
        speed: 1000,
        max: 5
      };

  return (
    <div className='matching_page_bg'>
        <div className="login_bgm_b">
          <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain.mp4' type='video/mp4' />
        </video>
        </div>
        <div className='matching_page_box'>
            <Tilt options={options} className='matching_w_box'>
                <a className='matching_w_photo_box'></a>
                <div></div>
            </Tilt>
            <Tilt options={options} className='matching_m_box'>
                <a className='matching_m_photo_box'></a>
                <div></div>
            </Tilt>
        </div>
    </div>
  )
}

export default Matching