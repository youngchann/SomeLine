import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Matching = () => {
  return (
    <div className='matching_bg'>
        <div>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide className='box1 mat_box'>Slide 1</SwiperSlide>
                <SwiperSlide className='box2 mat_box'>Slide 2</SwiperSlide>
                <SwiperSlide className='box3 mat_box'>Slide 3</SwiperSlide>
                <SwiperSlide className='box4 mat_box'>Slide 4</SwiperSlide>
                <SwiperSlide className='box5 mat_box'>Slide 5</SwiperSlide>
                <SwiperSlide className='box6 mat_box'>Slide 6</SwiperSlide>
                <SwiperSlide className='box7 mat_box'>Slide 7</SwiperSlide>
                <SwiperSlide className='box8 mat_box'>Slide 8</SwiperSlide>
                <SwiperSlide className='box9 mat_box'>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default Matching