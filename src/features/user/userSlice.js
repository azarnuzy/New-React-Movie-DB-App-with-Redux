import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  login: [],
  register: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginWithFireBase: (state, action) => {
      state.login = action.payload;
      state.status = 'success';
      console.log(state.status);
    },
  },
  extraReducers(builder) {},
});

export const selectLogin = (state) => state.user.login;
export const selectLoginStatus = (state) => state.user.status;
export const getLoginError = (state) => state.user.error;

export const { loginWithFireBase } = userSlice.actions;

export default userSlice.reducer;
