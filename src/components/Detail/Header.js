import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import apiConfig from '../../api/apiConfig';
import {
  selectCasts,
  selectDetail,
  selectDetailStatus,
} from '../../features/detail/detailSlice';
import dateFormat from 'dateformat';
import { Link, useParams } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import CastCard from './CastCard';

export default function Header() {
  const item = useSelector(selectDetail);
  const casts = useSelector(selectCasts).cast;

  const statusDetail = useSelector(selectDetailStatus);
  const { category } = useParams();

  const date = dateFormat(item.release_date, 'mmm dd, yyyy');

  const width = useWindowWidth();

  const getSlidesPerView = () => {
    if (width >= 1280) {
      return 7;
    } else if (width >= 1024) {
      return 6;
    } else if (width >= 768) {
      return 5;
    } else {
      return 4;
    }
  };

  return (
    <div className="w-full">
      <div className="z-0 h-[100vh] w-full absolute top-0 bg-gradient-to-t to-[#0000000c] from-black"></div>
      {item ? (
        <div className="">
          <img
            src={apiConfig.originalImage(
              item?.backdrop_path || item?.poster_path
            )}
            className="absolute top-0 left-0 w-full h-[100vh] -z-10 object-cover "
            alt={item.name || item.title}
          />
          <div className="relative z-[2]  mt-[13vh]">
            <div className="mx-2">
              <span className="flex gap-3 items-center text-yellow-400 mt-1 ">
                <AiFillStar /> <p>{item.vote_average?.toFixed(1)} / 10</p>
              </span>
              <h2 className="text-slate-100 font-bold tracking-wider text-3xl">
                {item.name || item.title}
              </h2>
              <p className=" text-sm md mb-3 text-slate-50 mt-2">{date}</p>
              <div className="flex gap-3 mt-3">
                {item.genres?.map((genre) => (
                  <Link
                    to={`/${category}/genres/${item.id}`}
                    key={genre.id}
                    className="py-1 px-4 rounded-full text-slate-100 border-solid border-2 border-slate-100 text-semibold text-lg whitespace-nowrap overflow-hidden"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              <div className="mt-3 text-white">{item.overview}</div>
            </div>
            <div className="mt-5">
              <h2 className="text-slate-50 font-bold text-2xl mx-2">Casts</h2>
              <div className="w-full overflow-hidden flex items-center relative">
                <Swiper
                  slidesPerView={getSlidesPerView()}
                  spaceBetween={20}
                  className="mySwiper transform translate-x-[12px]"
                  modules={[Autoplay]}
                >
                  {casts?.map((cast, i) => {
                    return (
                      <SwiperSlide key={i}>
                        {statusDetail === 'succeeded' ? (
                          <CastCard cast={cast} />
                        ) : (
                          <SkeletonTheme
                            baseColor="#292929"
                            highlightColor="#444"
                          >
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
            </div>
          </div>
        </div>
      ) : (
        <SkeletonTheme baseColor="#292929" highlightColor="#444">
          <p>
            <Skeleton height={500} />
          </p>
        </SkeletonTheme>
      )}
    </div>
  );
}
