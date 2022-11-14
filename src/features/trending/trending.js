import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

const initialState = {
  trending: [],
  trailer: [],
  status: 'idle',
};

export const fetchTrendingMovies = createAsyncThunk(
  'trending/fetchTrendingMovies',
  async () => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(`${apiConfig.baseUrl}trending/all/week`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchTrailerMovies = createAsyncThunk(
  'trending/fetchTrailerMovies',
  async ({ type, id }) => {
    try {
      let response = null;
      const params = { api_key: apiConfig.apiKey };
      response = await axios.get(`${apiConfig.baseUrl}${type}/${id}/videos`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.trending = action.payload.results;
    });
    builder.addCase(fetchTrailerMovies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.trailer = action.payload?.results;
    });
  },
});

export const selectTrendingMovies = (state) => state.trending.trending;
export const selectTrailerMovies = (state) => state.trending.trailer;

export const getTrendingStatus = (state) => state.trending.status;

export default trendingSlice.reducer;
