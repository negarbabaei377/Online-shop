import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import style from './_SliderImage.module.scss'
import {REACT_APP_BASE_URL} from "configs/variables.config";

export function SliderImageComponent(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={false}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className={style.mySwiper}
                style={{width:"100%" , marginBottom: "1rem"}}
            >
                {props.images?.map((image , index) => {
                    return (
                        <SwiperSlide key={index} className={style.imageWrapper}>
                            <img src={REACT_APP_BASE_URL + '/files/' + image}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={style.mySwiper1}
            >
                {props.images?.map((image , index) => {
                    return (
                        <SwiperSlide key={index} className={style.imageWrapper}>
                            <img src={REACT_APP_BASE_URL + '/files/' + image}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}
