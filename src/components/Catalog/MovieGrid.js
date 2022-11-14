import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchMoviesByCatalog,
  getLoadMoreStatus,
  getPage,
  getTotalPages,
  loadMoreFetchMoviesByCatalog,
  selectCatalogMovies,
} from '../../features/catalog/catalogSlice';
import MovieCard from '../Movies/MovieCard';

export default function MovieGrid() {
  const dispatch = useDispatch();
  const { category, type } = useParams();
  const movies = useSelector(selectCatalogMovies);

  const page = useSelector(getPage);
  const totalPage = useSelector(getTotalPages);

  useEffect(() => {
    dispatch(fetchMoviesByCatalog({ type, category }));
  }, [category, dispatch, type]);

  const onLoadMoreClicked = () => {
    dispatch(loadMoreFetchMoviesByCatalog({ type, category, page }));
  };

  const location = useLocation();
  let search = '';
  if (location.state !== null) {
    search = location.state.search;
  }

  return (
    <>
      {search !== null && search.length > 0 && (
        <h3 className="text-center font-bold text-lg -mt-2 -mb-4">
          Search Result "{search}"
        </h3>
      )}

      <div className="grid grid-cols-1 mx-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {movies.map((item, i) => (
          <MovieCard item={item} category={type} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div
          onClick={onLoadMoreClicked}
          className="py-1 px-4 font-semibold flex justify-center mx-auto mt-4 text-lg text-lightRed border-solid border-lightRed border w-fit rounded-full"
        >
          Load More
        </div>
      ) : null}
    </>
  );
}
