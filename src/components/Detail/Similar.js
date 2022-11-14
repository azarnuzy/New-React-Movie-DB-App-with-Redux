import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useWindowWidth } from '@react-hook/window-size';
import {
  fetchSimilarMovies,
  selectDetailStatus,
  selectSimilar,
} from '../../features/detail/detailSlice';
import MovieCard from '../Movies/MovieCard';
import { useParams } from 'react-router-dom';

export default function Similar() {
  let movies = useSelector(selectSimilar);
  const moviesStatus = useSelector(selectDetailStatus);

  const width = useWindowWidth();

  const { category, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSimilarMovies({ category, id }));
  }, [category, dispatch, id]);

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
    <div className="w-full overflow-hidden flex items-center relative pb-10">
      <div className="absolute right-0 h-[110%] -top-2 z-10 bg-black opacity-80 blur-sm w-3"></div>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        className="mySwiper transform translate-x-[12px]"
        modules={[Autoplay]}
      >
        {movies?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              {moviesStatus === 'succeeded' ? (
                <MovieCard item={item} category={category} />
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
