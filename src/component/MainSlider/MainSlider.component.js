import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import image1 from 'assets/image/jpg/Group-1.jpg'
import image2 from 'assets/image/jpg/Group-2.jpg'
import './_MainSlider.module.scss'


export function MainSliderComponent() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                style={{padding: "0 6rem 0 0 "}}

                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img src={image1}/> </SwiperSlide>
                <SwiperSlide><img src={image2}/> </SwiperSlide>
            </Swiper>
        </>
    );
}
