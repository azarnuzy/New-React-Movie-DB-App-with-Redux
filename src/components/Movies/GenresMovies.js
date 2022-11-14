import { useWindowWidth } from '@react-hook/window-size';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import {
  getMoviesStatus,
  selectAllGenres,
} from '../../features/movies/moviesSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function GenreMovies() {
  const width = useWindowWidth();
  const genres = useSelector(selectAllGenres);
  const movieStatus = useSelector(getMoviesStatus);

  const navigate = useNavigate();

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
            {movieStatus === 'succeeded' ? (
              <button
                onClick={() => {
                  navigate(`/movie/genres/${item.id}`, {
                    state: { genreName: item.name },
                  });
                }}
                className="w-full flex justify-center py-2 px-1  rounded-full border-2 text-darkRed font-semibold border-solid border-darkRed whitespace-nowrap overflow-hidden cursor-pointer"
              >
                {item.name}
              </button>
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
