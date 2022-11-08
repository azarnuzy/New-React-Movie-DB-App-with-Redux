import { useWindowWidth } from '@react-hook/window-size';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swiper, { Autoplay } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { selectAllGenres } from '../../features/movies/moviesSlice';

export function GenreList() {
  const width = useWindowWidth();
  const genres = useSelector(selectAllGenres);

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
    <div className="w-full mx-2">
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        className="mySwiper"
        modules={[Autoplay]}
      >
        {genres.map((item, i) => (
          <SwiperSlide key={i}>
            <Link
              to={`/movie/genres/${item.id}`}
              className="flex justify-center py-3 px-1  rounded-full border text-slate-200 bg-darkGrey whitespace-nowrap overflow-hidden"
            >
              {item.name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
