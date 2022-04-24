import React from "react";
import "./Skeletons.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

// import Swiper core and required modules
import SwiperCore, { Navigation, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function SkeletonsMovie(props) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
        },
        1023: {
          slidesPerView: 6,
        },
      }}
    >
      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="Home-film-item-Skeleton ">
          <div className="Home-film-img-Skeleton">
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default SkeletonsMovie;
