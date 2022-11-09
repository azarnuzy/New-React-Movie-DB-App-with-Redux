import { useWindowWidth } from '@react-hook/window-size';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getTvStatus, selectAllGenresTv } from '../../features/tv/tvSlice';

export default function GenresTv() {
  const width = useWindowWidth();
  const genres = useSelector(selectAllGenresTv);
  const tvStatus = useSelector(getTvStatus);

  const getSlidesPerView = () => {
    if (width >= 1280) {
      return 6;
    } else if (width >= 1024) {
      return 5;
    } else if (width >= 768) {
      return 4;
    } else {
      return 3;
    }
  };

  return (
    <div className="w-full overflow-hidden mt-2 relative">
      <div className="absolute right-0 h-[110%] -top-2 z-10 bg-white opacity-90 w-3 blur"></div>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        className="mySwiper  transform translate-x-[12px]"
        modules={[Autoplay]}
      >
        {genres.map((item, i) => (
          <SwiperSlide key={i}>
            {tvStatus === 'succeeded' ? (
              <Link
                to={`/tv/genres/${item.id}`}
                className="flex justify-center py-2 px-1  rounded-full border-2 text-darkRed font-semibold border-solid border-darkRed whitespace-nowrap overflow-hidden"
              >
                {item.name}
              </Link>
            ) : (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                  <Skeleton height={30} circle={true} />
                </p>
              </SkeletonTheme>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
