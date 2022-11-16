import React from 'react';
import { useSelector } from 'react-redux';
import { category } from '../api/tmdbApi';
import Header from '../components/Header/Header';
import GenreMovies from '../components/Movies/GenresMovies';
import ListBox from '../components/Movies/ListBox';
import MovieList from '../components/Movies/MovieList';
import { selectFilterBy } from '../features/movies/moviesSlice';
import TvList from '../components/Tv/TvList';
import { selectFilterTvBy } from '../features/tv/tvSlice';
import ListBoxTv from '../components/Tv/ListBox';
import GenresTv from '../components/Tv/GenresTv';
import Trailer from '../components/Trailer/Trailer';

function Home() {
  const titleSectionMovies = useSelector(selectFilterBy).split('_');
  const titleSectionTv = useSelector(selectFilterTvBy).split('_');

  function getTitle(movies) {
    let title = '';
    for (let i = 0; i < movies.length; i++) {
      title += movies[i].charAt(0).toUpperCase() + movies[i].slice(1) + ' ';
    }

    return title;
  }

  const moviesTitle = getTitle(titleSectionMovies);
  const tvTitle = getTitle(titleSectionTv);

  return (
    <div>
      <Header />
      <div
        className={`flex items-center text-lg mt-[82vh] mb-4 justify-between mx-3 font-semibold `}
      >
        <h2 className="text-xl">{`${moviesTitle}`} Movies</h2>
        <ListBox />
      </div>
      <MovieList category={category.movie} />
      <h2 className="text-xl font-semibold mt-3 mx-3">Genres Movie</h2>
      <GenreMovies />
      <Trailer />
      <div
        className={`flex items-center text-lg mb-4 mt-5 justify-between mx-3 font-semibold `}
      >
        <h2 className="text-xl">{`${tvTitle}`} Tv</h2>
        <ListBoxTv />
      </div>
      <TvList category={category.tv} />
      <h2 className="text-xl font-semibold mt-3 mx-3">Genres TV</h2>
      <GenresTv />
    </div>
  );
}

export default Home;
