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
  fetchMoviesHeader,
  getMoviesStatus,
  SelectcHeaders,
} from '../../features/movies/moviesSlice';

import dateFormat from 'dateformat';
import { AiFillStar } from 'react-icons/ai';
import { fetchGenresTv, fetchTv, getTvStatus } from '../../features/tv/tvSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  fetchTrendingMovies,
  getTrendingStatus,
} from '../../features/trending/trending';
import { Link } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();

  let headers = useSelector(SelectcHeaders);
  const moviesStatus = useSelector(getMoviesStatus);
  const trendingStatus = useSelector(getTrendingStatus);
  const tvStatus = useSelector(getTvStatus);

  useEffect(() => {
    if (moviesStatus === 'idle') {
      dispatch(fetchMovies({ type: 'popular' }));
      dispatch(fetchMoviesHeader());
      dispatch(fetchGenres());
      dispatch(fetchTrendingMovies());
      dispatch(fetchTv({ type: 'popular' }));
      dispatch(fetchGenresTv());
    }
  }, [moviesStatus, dispatch, tvStatus, trendingStatus]);

  if (moviesStatus === 'succeeded') {
    headers = headers.slice(2, 5);
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
        {headers.map((item, i) => {
          const background = apiConfig.originalImage(
            item.backdrop_path ? item.backdrop_path : item.poster_path
          );

          const date = dateFormat(item.release_date, 'mmm dd, yyyy');
          return (
            <SwiperSlide key={i}>
              {moviesStatus === 'succeeded' ? (
                <div className="w-full h-[80vh] relative">
                  <div className="bg-gradient-to-t to-[#0000000c] from-black absolute w-full h-[80vh]"></div>
                  <img
                    className="absolute w-full h-[80vh] object-top object-cover -z-[9] "
                    src={background}
                    alt=""
                  />
                  <Link to={`/movie/${item.id}`}>
                    <div className="h-[80vh] transform translate-y-[62%] text-gray-50 mx-4 lg:max-w-5xl lg:mx-auto">
                      <span className="flex gap-3 items-center text-yellow-400 mb-1">
                        <AiFillStar />{' '}
                        <p>{item.vote_average?.toFixed(1)} / 10</p>
                      </span>
                      <h2 className="text-2xl font-bold mb-1">
                        {item.title.length > 20
                          ? `${item.title.substring(0, 23)}...`
                          : item.title}
                      </h2>
                      <div className="flex">
                        <p className=" text-sm md mb-3 text-slate-50">{date}</p>
                      </div>
                      <p className=" text-md mb-3">
                        {item.overview.length > 100
                          ? `${item.overview.substring(0, 100)}...`
                          : item.overview}
                      </p>
                    </div>
                  </Link>
                </div>
              ) : (
                <SkeletonTheme baseColor="#292929" highlightColor="#444">
                  <p>
                    <Skeleton height={300} />
                    <Skeleton count={2} height={15} />
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
