import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

const initialState = {
  movies: [],
  status: 'idle',
  loadingStatus: 'idle',
  page: 1,
  total_pages: 0,
  error: null,
};

export const fetchMoviesByCatalog = createAsyncThunk(
  'movies/fetchMoviesByCatalog',
  async ({ type, category }) => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(`${apiConfig.baseUrl}/${type}/${category}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const loadMoreFetchMoviesByCatalog = createAsyncThunk(
  'movies/loadMoreFetchMoviesByCatalog',
  async ({ type, category, page }) => {
    try {
      let response = null;
      response = await axios.get(`${apiConfig.baseUrl}/${type}/${category}`, {
        params: { api_key: apiConfig.apiKey, page: page + 1 },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const moviesSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesByCatalog.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesByCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.page = 1;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchMoviesByCatalog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadMoreFetchMoviesByCatalog.pending, (state, action) => {
        state.loadingStatus = 'loading';
      })
      .addCase(loadMoreFetchMoviesByCatalog.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.movies = [...state.movies, ...action.payload.results];
        state.page += 1;
      })
      .addCase(loadMoreFetchMoviesByCatalog.rejected, (state, action) => {
        state.loadingStatus = action.error.message;
      });
  },
});

export const selectCatalogMovies = (state) => state.catalog.movies;
export const getMoviesStatus = (state) => state.catalog.status;
export const getMoviesError = (state) => state.catalog.error;

export const getLoadMoreStatus = (state) => state.catalog.loadingStatus;

export const getPage = (state) => state.catalog.page;
export const getTotalPages = (state) => state.catalog.total_pages;

export default moviesSlice.reducer;
