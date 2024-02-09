import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      // data = {user: {name: 'Abra', email: 'abra@gmail.com'}, token: 'abrakadabra1223'}  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user; //------------------------------ дані беруться з {data }-----------------------------------------
        state.token = action.payload.token; //---------------------------------дані беруться з {data }------------------------------------------
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user; //-------------------------------------------------------------------------------------------------------------
        state.token = action.payload.token; //-------------------------------------------------------------------------------------------------------------
      })
      .addMatcher(
        isAnyOf(apiRegisterUser.pending, apiLoginUser.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(apiRegisterUser.rejected, apiLoginUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// Генератори екшенів
//export const {} = authSlice.actions;
// Редюсер слайсу
export const authReducer = authSlice.reducer;
