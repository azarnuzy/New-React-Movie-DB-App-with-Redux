import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';

import { useWindowWidth } from '@react-hook/window-size';

import {
  fetchMovies,
  getMoviesError,
  getMoviesStatus,
  selectAllMovies,
} from '../../features/movies/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
export default function MoviesList({ category }) {
  let movies = useSelector(selectAllMovies);

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
    <div className="w-full ml-3 relative">
      <div className="absolute right-0 h-[110%] -top-2 z-10 bg-white opacity-90 w-6"></div>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        className="mySwiper"
        modules={[Autoplay]}
      >
        {movies.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
