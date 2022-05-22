import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./_ProductSlider.module.scss";
import {Pagination, Navigation} from "swiper";
import {ProductCardComponent} from "../index";


export function ProductSliderComponent(props) {

    return (
        <div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                style={{padding: "4rem 2rem"}}
                // navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"

            >
                {props.productData && props.productData.map((item) => {
                    return (
                        <SwiperSlide>
                            <ProductCardComponent
                                image={item.thumbnail}
                                price={item.price}
                                name={item.name}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
}

