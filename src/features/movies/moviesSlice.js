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

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
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
});

export const loadMoreFetchMovies = createAsyncThunk(
  'movies/loadMoreFetchMovies',
  async (page) => {
    try {
      let response = null;
      response = await axios.get(`${apiConfig.baseUrl}/movie/popular`, {
        params: { api_key: apiConfig.apiKey, page: page + 1 },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action.payload.data);
        state.movies = action.payload.results;
        state.page = 1;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadMoreFetchMovies.pending, (state, action) => {
        state.loadingStatus = 'loading';
      })
      .addCase(loadMoreFetchMovies.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        // console.log(action.payload);
        state.movies = [...state.movies, ...action.payload.results];
        // console.log(state.movies);
        state.page += 1;
      })
      .addCase(loadMoreFetchMovies.rejected, (state, action) => {
        state.loadingStatus = action.error.message;
      });
  },
});

export const selectAllMovies = (state) => state.movies.movies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;

export const getLoadMoreStatus = (state) => state.movies.loadingStatus;

export const getPage = (state) => state.movies.page;
export const getTotalPages = (state) => state.movies.total_pages;

export default moviesSlice.reducer;
