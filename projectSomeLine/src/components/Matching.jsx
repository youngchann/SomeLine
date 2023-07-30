import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Matching = () => {

  const [isVisiblePopup, setIsVisiblePopup] = useState(true);
  const matClosePopup = () => {
    setIsVisiblePopup(false);
  };

  return (
    <div className='matching_bg'>
        <div className={`mat_popup ${isVisiblePopup ? '' : 'hidden'}`}>
          <button className='mat_popup_close' onClick={matClosePopup}>X</button>
          <div className='mat_popup_text'>
            <h4>💬 알림.</h4>
            <p>이찬용님, 설레이는 새로운 메세지가 도착했어요!</p>
          </div>
        </div>
        <div className="login_bgm_b">
            <video className="login_bgm" autoPlay muted loop>
              <source src='videos/mainmain10.mp4' type='video/mp4' />
            </video>
        </div>
        <div className='matching_in_box'>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름1 이영자</p><p>광주, 56세</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름2</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름3</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름4</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름5</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름6</p><a href='#'>버튼</a></div></div></SwiperSlide>
            <SwiperSlide><div className='mat_info_card'><div className='info_img_box'></div><div className='info_info_box'><p>이름7</p><a href='#'>버튼</a></div></div></SwiperSlide>
          </Swiper>
        </div>
    </div>
  )
}

export default Matching