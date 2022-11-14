import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import tvReducer from '../features/tv/tvSlice';
import trendingReducer from '../features/trending/trending';
import detailReducer from '../features/detail/detailSlice';
import catalogReducer from '../features/catalog/catalogSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tv: tvReducer,
    trending: trendingReducer,
    detail: detailReducer,
    catalog: catalogReducer,
  },
});
