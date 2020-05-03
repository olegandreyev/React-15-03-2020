import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api-client";

const login = createAsyncThunk(
  'currentUser/login',
  async (credentials, thunkAPI) => {
    const response = await apiClient.post('/auth', credentials);
    return response.data;
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    user: null,
    isLoading: false
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoading = false;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true
    },
    [login.fulfilled] : (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    }
  }
});

export const { logout } = currentUserSlice.actions;

export { login }

export default currentUserSlice.reducer;



