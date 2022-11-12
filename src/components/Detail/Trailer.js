import { useWindowWidth } from '@react-hook/window-size';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiConfig from '../../api/apiConfig';
import ModalTrailer from '../Trailer/ModalTrailer';
import {
  fetchTrailerMovies,
  getTrendingStatus,
  selectTrailerMovies,
} from '../../features/trending/trending';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper';
import { useParams } from 'react-router-dom';

export default function Trailer({ item }) {
  const trailer = useSelector(selectTrailerMovies);
  const dispatch = useDispatch();
  const trailerStatus = useSelector(getTrendingStatus);

  const width = useWindowWidth();

  const { category } = useParams();

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

  useEffect(() => {
    dispatch(
      fetchTrailerMovies({
        type: category,
        id: item.id,
      })
    );
  }, [category, dispatch, item.id]);

  return (
    <div className="w-full overflow-hidden flex items-center relative mt-5">
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={30}
        className="mySwiper"
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {trailer?.map((item, i) => {
          return (
            <SwiperSlide key={i} className="relative">
              {trailerStatus === 'succeeded' ? (
                <div className="relative h-[30vh]">
                  <iframe
                    src={`https://www.youtube.com/embed/${item?.key}`}
                    title={item.name}
                    className="w-full h-[30vh]"
                  ></iframe>
                  <div className="w-full h-[30vh] flex justify-center items-center flex-col">
                    <div>
                      <img
                        src={apiConfig.originalImage(item.backdrop_path)}
                        alt=""
                        className="group-hover:transform group-hover:scale-[1.02] group-hover:transition group-hover:duration-200 relative h-[20vh] object-cover object-top transform rounded-lg mt-10"
                      />
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
