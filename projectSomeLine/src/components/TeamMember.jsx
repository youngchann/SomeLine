import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TeamMember = () => {
  return (
    <div className='loading_bg'>
        <div className='loading_container'>
            <div className='loading_box'>
                <div className='loading_cube'></div>
            </div>
            <Swiper
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 700,
                disableOnInteraction: false,
              }}
              speed={650}
              modules={[Autoplay, Pagination, Navigation]}
              id="loading_text_box"
            >
              <SwiperSlide className='box4'>만든 사람들!</SwiperSlide>
              <SwiperSlide className='box4'>이찬용</SwiperSlide>
              <SwiperSlide className='box4'>임영찬</SwiperSlide>
              <SwiperSlide className='box4'>전도희</SwiperSlide>
              <SwiperSlide className='box4'>국지호</SwiperSlide>
              <SwiperSlide className='box4'>이찬용</SwiperSlide>
              <SwiperSlide className='box4'>임영찬</SwiperSlide>
              <SwiperSlide className='box4'>전도희</SwiperSlide>
              <SwiperSlide className='box4'>국지호</SwiperSlide>
              <SwiperSlide className='box4'>이찬용</SwiperSlide>
              <SwiperSlide className='box4'>임영찬</SwiperSlide>
              <SwiperSlide className='box4'>전도희</SwiperSlide>
              <SwiperSlide className='box4'>국지호</SwiperSlide>
              <SwiperSlide className='box4'>감사합니다.</SwiperSlide>
            </Swiper>
            <div className='loading_shadow'></div>
        </div>
    </div>
  )
}

export default TeamMember;