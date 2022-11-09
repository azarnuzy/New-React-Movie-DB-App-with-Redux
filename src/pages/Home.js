import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { category } from '../api/tmdbApi';
import Header from '../components/Header/Header';
import ListBox from '../components/Movies/ListBox';
import MovieList from '../components/Movies/MovieList';

function Home() {
  return (
    <div>
      <Header />
      <div
        className={`flex items-center text-lg mt-[44vh] mb-4 justify-between mx-3 font-semibold `}
      >
        <h2>Popular Movies</h2>
        <ListBox />
      </div>
      <MovieList category={category.movie} />
    </div>
  );
}

export default Home;
