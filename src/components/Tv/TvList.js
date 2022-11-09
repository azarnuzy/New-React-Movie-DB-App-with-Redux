import React from 'react';
import { useSelector } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useWindowWidth } from '@react-hook/window-size';

import MovieCard from '../Movies/MovieCard';
import { getTvStatus, selectAllTv } from '../../features/tv/tvSlice';

export default function TvList({ category }) {
  let tv = useSelector(selectAllTv);
  const tvStatus = useSelector(getTvStatus);

  const width = useWindowWidth();

  const getSlidesPerView = () => {
    if (width >= 1280) {
      return 5;
    } else if (width >= 1024) {
      return 4;
    } else if (width >= 768) {
      return 3;
    } else {
      return 2;
    }
  };

  return (
    <div className="w-full overflow-hidden flex items-center relative">
      <div className="absolute right-0 h-[110%] -top-2 z-10 bg-white opacity-90 w-3 blur"></div>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        className="mySwiper transform translate-x-[12px]"
        modules={[Autoplay]}
      >
        {tv.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              {tvStatus === 'succeeded' ? (
                <MovieCard item={item} category={category} type="tv" />
              ) : (
                <SkeletonTheme baseColor="#292929" highlightColor="#444">
                  <p>
                    <Skeleton height={230} />
                    <Skeleton count={2} />
                  </p>
                </SkeletonTheme>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
