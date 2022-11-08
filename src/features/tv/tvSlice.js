import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

const initialState = {
  tv: [],
  status: 'idle',
  loadingStatus: 'idle',
  page: 1,
  total_pages: 0,
  error: null,
};

export const fetchTv = createAsyncThunk('tv/fetchTv', async () => {
  try {
    let response = null;
    const params = { api_key: apiConfig.apiKey };
    response = await axios.get(`${apiConfig.baseUrl}/tv/popular`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const loadMoreFetchTv = createAsyncThunk(
  'tv/loadMoreFetchTv',
  async (page) => {
    try {
      let response = null;
      response = await axios.get(`${apiConfig.baseUrl}/tv/popular`, {
        params: { api_key: apiConfig.apiKey, page: page + 1 },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTv.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTv.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action.payload.data);
        state.tv = action.payload.results;
        state.page = 1;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchTv.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadMoreFetchTv.pending, (state, action) => {
        state.loadingStatus = 'loading';
      })
      .addCase(loadMoreFetchTv.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        // console.log(action.payload);
        state.tv = [...state.tv, ...action.payload.results];
        // console.log(state.tv);
        state.page += 1;
      })
      .addCase(loadMoreFetchTv.rejected, (state, action) => {
        state.loadingStatus = action.error.message;
      });
  },
});

export const selectAllTv = (state) => state.tv.tv;
export const getTvStatus = (state) => state.tv.status;
export const getTvError = (state) => state.tv.error;

export const getLoadMoreStatus = (state) => state.tv.loadingStatus;

export const getPage = (state) => state.tv.page;
export const getTotalPages = (state) => state.tv.total_pages;

export default tvSlice.reducer;
