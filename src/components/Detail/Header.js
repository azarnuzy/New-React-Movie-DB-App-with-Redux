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
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import CastCard from './CastCard';
import Trailer from './Trailer';
import Similar from './Similar';

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

  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60 || 0;
    const hours = Math.floor(totalMinutes / 60) || 0;

    return `${hours}h ${minutes}m`;
  }

  const navigate = useNavigate();

  return (
    <div className="w-full bg-black">
      <div className="z-[3] h-[100vh] w-full absolute top-0 bg-gradient-to-t to-[#0000000c] from-black"></div>
      {item ? (
        <div className="">
          <img
            src={apiConfig.originalImage(
              item?.backdrop_path || item?.poster_path
            )}
            className="absolute top-0 left-0 w-full h-[100vh] z-[2] object-cover "
            alt={item.name || item.title}
          />
          <div className="relative z-[5]  mt-[45vh]">
            <div className="mx-2 max-w-[1280px] m-auto">
              <span className="flex gap-3 items-center text-yellow-400 mt-1 ">
                <AiFillStar /> <p>{item.vote_average?.toFixed(1)} / 10</p>
              </span>
              <h2 className="text-slate-100 font-bold tracking-wider text-3xl">
                {item.name || item.title}
              </h2>
              <div className="flex gap-3 w-full items-center mt-2 mb-3">
                <span className=" text-sm md text-slate-50 ">{date}</span>
                <span className="h-1 w-1 rounded-full bg-slate-100"></span>
                <p className="text-sm md text-slate-50 ">
                  {toHoursAndMinutes(item.runtime)}{' '}
                </p>
              </div>
              <div className="flex gap-3 mt-3">
                <Swiper
                  slidesPerView={getSlidesPerView()}
                  spaceBetween={20}
                  className="mySwiper  "
                  modules={[Autoplay]}
                >
                  {item.genres?.map((genre, i) => (
                    <SwiperSlide key={i}>
                      <button
                        onClick={() => {
                          navigate(`/${category}/genres/${genre.id}`, {
                            state: { genreName: genre.name },
                          });
                        }}
                        key={genre.id}
                        className="w-full flex justify-center py-2 px-3 rounded-full text-slate-100 border-solid border-2 border-slate-100 text-semibold text-lg whitespace-nowrap overflow-hidden cursor-pointer"
                      >
                        {genre.name}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
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
          <h3 className="mt-[7vh] text-white font-semibold mx-3 text-xl">
            Latest Trailer
          </h3>
          <Trailer item={item} />
          <h3 className="mt-[7vh] text-white font-semibold mx-3 text-xl mb-3">
            Similar Movies
          </h3>
          <Similar category={category} />
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
