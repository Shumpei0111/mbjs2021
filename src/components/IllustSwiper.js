import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import * as style from '../styles/module/_illust_swiper.module.scss';

import SwiperCore, { EffectFade, Pagination, Navigation, Autoplay } from 'swiper';
SwiperCore.use([EffectFade, Pagination, Navigation, Autoplay]);

import Image from 'next/image';

export const IllustSwiper = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                "delay": 2500,
                "disableOnInteraction": false
            }}
            pagination={{ "clickable": true }}
            navigation={true}
            className='projectSwiper__wrapper'
        >
            <SwiperSlide>
                <Image
                    src='/images/akashi.jpg'
                    alt='あかしちゃん'
                    width={880/4}
                    height={1200/4}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/darjeeling.jpg'
                    alt='ダージリン'
                    width={1414/4}
                    height={2000/4}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/kimono-date.jpg'
                    alt='着物デート'
                    width={1414/4}
                    height={2000/4}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/nishidaji-marine.jpg'
                    alt='マリン服ペアルック'
                    width={1202/4}
                    height={1500/4}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src='/images/yodaka.jpg'
                    alt='よだかちゃん'
                    width={928/4}
                    height={1300/4}
                />
            </SwiperSlide>
        </Swiper>
    );
};