import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import tvReducer from '../features/tv/tvSlice';
import trendingReducer from '../features/trending/trending';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tv: tvReducer,
    trending: trendingReducer,
  },
});
