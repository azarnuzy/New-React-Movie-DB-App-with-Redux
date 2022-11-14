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
  'catalog/fetchMoviesByCatalog',
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
  'catalog/loadMoreFetchMoviesByCatalog',
  async ({ type, category, page, keyword }) => {
    try {
      let response = null;
      response = await axios.get(`${apiConfig.baseUrl}/${type}/${category}`, {
        params: { api_key: apiConfig.apiKey, page: page + 1, query: keyword },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchMoviesByInput = createAsyncThunk(
  'catalog/fetchMoviesByInput',
  async ({ keyword }) => {
    try {
      const params = { api_key: apiConfig.apiKey, query: keyword };
      const response = await axios.get(`${apiConfig.baseUrl}search/multi`, {
        params,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
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
      })
      .addCase(fetchMoviesByInput.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.page = 1;
        state.total_pages = action.payload.total_pages;
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
