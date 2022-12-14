import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

const initialState = {
  movies: [],
  genres: [],
  headers: [],
  status: 'idle',
  filterBy: 'popular',
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ type }) => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(`${apiConfig.baseUrl}/movie/${type}`, {
        params,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchMoviesHeader = createAsyncThunk(
  'movies/fetchMoviesHeader',
  async () => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(`${apiConfig.baseUrl}/movie/popular`, {
        params,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  try {
    const params = { api_key: apiConfig.apiKey };
    const response = await axios.get(`${apiConfig.baseUrl}/genre/movie/list`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    filterBy(state, action) {
      state.filterBy = action.payload.cate.toLowerCase().split(' ').join('_');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.page = 1;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMoviesHeader.fulfilled, (state, action) => {
        state.headers = action.payload.results;
      })

      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload.genres;
      });
  },
});

export const selectAllMovies = (state) => state.movies.movies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;
export const SelectcHeaders = (state) => state.movies.headers;
export const selectFilterBy = (state) => state.movies.filterBy;

export const selectAllGenres = (state) => state.movies.genres;

export const { filterBy } = moviesSlice.actions;

export default moviesSlice.reducer;
