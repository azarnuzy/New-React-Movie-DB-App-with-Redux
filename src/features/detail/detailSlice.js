import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';
import { category as cate } from '../../api/tmdbApi';

const initialState = {
  detail: [],
  casts: [],
  similar: [],
  status: 'idle',
  error: null,
};

export const fetchDetailMovie = createAsyncThunk(
  'detail/fetchDetailMovie',
  async ({ category, id }) => {
    try {
      let response = null;
      console.log(category);
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(
        `${apiConfig.baseUrl}${cate[category]}/${id}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  'detail/fetchSimilarMovies',
  async ({ id, category }) => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(
        `${apiConfig.baseUrl}/${category}/${id}/similar`,
        {
          params,
        }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchCastsMovie = createAsyncThunk(
  'detail/fetchCastsMovie',
  async ({ category, id }) => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(
        `${apiConfig.baseUrl}${cate[category]}/${id}/credits`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetailMovie.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detail = action.payload;
      })
      .addCase(fetchDetailMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCastsMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.casts = action.payload;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.similar = action.payload.results;
      });
  },
});

export const selectDetail = (state) => state.detail.detail;
export const selectDetailStatus = (state) => state.detail.status;
export const getDetailError = (state) => state.detail.error;

export const selectCasts = (state) => state.detail.casts;
export const selectSimilar = (state) => state.detail.similar;

export default detailSlice.reducer;
