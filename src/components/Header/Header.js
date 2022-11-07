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
import { TrailerButton } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovies,
  getMoviesError,
  getMoviesStatus,
  selectAllMovies,
} from '../../features/movies/moviesSlice';

import dateFormat from 'dateformat';
import { AiFillStar } from 'react-icons/ai';

export default function Header() {
  const dispatch = useDispatch();
  let movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);
  const moviesError = useSelector(getMoviesError);

  useEffect(() => {
    if (moviesStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [moviesStatus, dispatch]);

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

                  {/* <p className=" text-md mb-3">
                    {item.overview.length > 100
                      ? `${item.overview.substring(0, 100)}...`
                      : item.overview}
                  </p> */}
                  {/* <TrailerButton item={item} /> */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
