import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrailerMovies,
  getTrendingStatus,
  selectTrendingMovies,
} from '../../features/trending/trending';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import apiConfig from '../../api/apiConfig';
import { useWindowWidth } from '@react-hook/window-size';
import ModalTrailer from './ModalTrailer';

export default function Trailer() {
  let trending = useSelector(selectTrendingMovies);
  let trendingStatus = useSelector(getTrendingStatus);

  const dispatch = useDispatch();

  const width = useWindowWidth();

  const getSlidesPerView = () => {
    if (width >= 1280) {
      return 4;
    } else if (width >= 1024) {
      return 3;
    } else if (width >= 768) {
      return 2;
    } else {
      return 1;
    }
  };
  return (
    <div className="w-full overflow-hidden flex items-center relative mt-5">
      <div className="absolute right-0 h-[110%] -top-2 z-10 bg-white opacity-90 w-3 blur"></div>
      <h2 className="absolute z-10 top-0 text-slate-50 text-xl font-semibold mt-3 mx-3">
        Trending Trailers
      </h2>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={0}
        className="mySwiper"
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {trending.map((item, i) => {
          return (
            <SwiperSlide key={i} className="relative">
              {trendingStatus === 'succeeded' ? (
                <div className="relative h-[30vh]">
                  <div className="absolute top-0 left-0 h-[30vh] z-0 bg-gradient-to-r from-darkGrey to-darkGrey w-full opacity-70"></div>
                  <img
                    src={apiConfig.w500Image(
                      item.poster_path || item.backdrop_path
                    )}
                    alt=""
                    className="absolute top-0 left-0 w-full h-[30vh] object-cover object-center -z-10"
                  />
                  <div className="w-full h-[30vh] flex justify-center items-center flex-col">
                    <div
                      className="relative z-10 group"
                      onClick={() => {
                        dispatch(
                          fetchTrailerMovies({
                            type: item.media_type,
                            id: item.id,
                          })
                        );
                      }}
                    >
                      <img
                        src={apiConfig.originalImage(item.backdrop_path)}
                        alt=""
                        className="group-hover:transform group-hover:scale-[1.02] group-hover:transition group-hover:duration-200 relative h-[20vh] object-cover object-top transform rounded-lg mt-10"
                      />
                      <ModalTrailer />
                    </div>
                    <h4 className="relative z-10 text-white mt-2 font-semibold">
                      {item.title || item.name}
                    </h4>
                  </div>
                </div>
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
