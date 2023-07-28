import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Baenner = () => {
  /**해당 배너 에서는 슬라이프라는 라이브러리가 쓰였습니다. */
  /* npm i swiper 로 다운로드 후 {Swiper, SwiperSlide } 로 import 합니다.*/

  return (
    <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='box1'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_05.png'/></SwiperSlide>
        <SwiperSlide className='box2'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_01_m.png'/></SwiperSlide>
        <SwiperSlide className='box3'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_08.png'/></SwiperSlide>
        <SwiperSlide className='box4'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_01_m.png'/></SwiperSlide>
        <SwiperSlide className='box5'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_01_m.png'/></SwiperSlide>
        <SwiperSlide className='box6'><img src = 'https://knto.or.kr/humanframe/theme/kto/assets/image/main/main_visual_01_m.png'/></SwiperSlide>
      </Swiper>
  )
}

export default Baenner