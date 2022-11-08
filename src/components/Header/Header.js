import React, { useEffect } from 'react';
import apiConfig from '../../api/apiConfig';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGenres,
  fetchMovies,
  getMoviesStatus,
  selectAllMovies,
} from '../../features/movies/moviesSlice';

import dateFormat from 'dateformat';
import { AiFillStar } from 'react-icons/ai';
import { fetchTv, getTvStatus, selectAllTv } from '../../features/tv/tvSlice';

export default function Header() {
  const dispatch = useDispatch();
  let movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);

  let tv = useSelector(selectAllTv);
  const tvStatus = useSelector(getTvStatus);

  useEffect(() => {
    if (moviesStatus === 'idle') {
      dispatch(fetchMovies());
      dispatch(fetchGenres());
    }

    if (tvStatus === 'idle') {
      dispatch(fetchTv());
    }
  }, [moviesStatus, dispatch, tvStatus]);

  if (moviesStatus === 'succeeded') {
    movies = movies.slice(2, 5);
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="border-0 ${className}"></span>`;
    },
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <Swiper
        pagination={pagination}
        effect={'fade'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        modules={[EffectFade, Autoplay, Pagination]}
      >
        {movies.map((item, i) => {
          const background = apiConfig.originalImage(
            item.backdrop_path ? item.backdrop_path : item.poster_path
          );

          const date = dateFormat(item.release_date, 'mmm dd, yyyy');
          return (
            <SwiperSlide key={i}>
              <div className="w-full h-[50vh] relative">
                <div className="bg-[#0006] absolute w-full h-[50vh]"></div>
                <img
                  className="absolute w-full h-[50vh] object-top object-cover -z-[10] "
                  src={background}
                  alt=""
                />
                <div className="h-[50vh] transform translate-y-[70%] text-gray-50 mx-4 lg:max-w-5xl lg:mx-auto">
                  <span className="flex gap-3 items-center text-yellow-400 mb-1">
                    <AiFillStar /> <p>{item.vote_average?.toFixed(1)} / 10</p>
                  </span>
                  <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                  <div className="flex">
                    <p className=" text-sm md mb-3 text-slate-50">{date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
