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
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={1500}
              modules={[Autoplay, Pagination, Navigation]}
              id="loading_text_box"
            >
              <SwiperSlide className='box4'>만든 사람들</SwiperSlide>
              <SwiperSlide className='box4'>이 찬용</SwiperSlide>
              <SwiperSlide className='box4'>임 영찬</SwiperSlide>
              <SwiperSlide className='box4'>전 도희</SwiperSlide>
              <SwiperSlide className='box4'>국 지호</SwiperSlide>
              <SwiperSlide className='box4'>Lee.Chanyong</SwiperSlide>
              <SwiperSlide className='box4'>Lim.Youngchan</SwiperSlide>
              <SwiperSlide className='box4'>Jeon.Dohui</SwiperSlide>
              <SwiperSlide className='box4'>Kook.JiHo</SwiperSlide>
              <SwiperSlide className='box4'>이 찬용</SwiperSlide>
              <SwiperSlide className='box4'>임 영찬</SwiperSlide>
              <SwiperSlide className='box4'>전 도희</SwiperSlide>
              <SwiperSlide className='box4'>국 지호</SwiperSlide>
              <SwiperSlide className='box4'>Lee.Chanyong</SwiperSlide>
              <SwiperSlide className='box4'>Lim.Youngchan</SwiperSlide>
              <SwiperSlide className='box4'>Jeon.Dohui</SwiperSlide>
              <SwiperSlide className='box4'>Kook.JiHo</SwiperSlide>
              <SwiperSlide className='box4'>Thank You.</SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default TeamMember;