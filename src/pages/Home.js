import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { category } from '../api/tmdbApi';
import Header from '../components/Header/Header';
import MoviesList from '../components/Movies/MoviesList';

function Home() {
  return (
    <div>
      <Header />
      <div
        className={`flex text-lg mt-[44vh] mb-4 justify-between mx-3 font-semibold `}
      >
        <h2>What's Popular</h2>
        <Link to={'/movie'}>
          <div className="text-lightRed gap-3 flex items-center">
            <span className="">View More</span> <AiOutlineArrowRight />
          </div>
        </Link>
      </div>
      <MoviesList category={category.movie} />
    </div>
  );
}

export default Home;
