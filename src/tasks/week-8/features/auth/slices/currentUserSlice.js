import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../../api-client';

// First, create the thunk
const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchCurrentUser',
  async (thunkAPI) => {
    const response = await apiClient.get('/api/users/me');
    return response.data
  },
  {
    condition: () => !!apiClient.defaults.headers['Authorization'],
    dispatchConditionRejection: false
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    user: null,
    isLoading: false
  },
  reducers: {
    signIn(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      state.isLoading = false;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCurrentUser.pending]: (state) => {
      state.loading = true
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      // Add user to the state array
      state.user = action.payload;
    },
    [fetchCurrentUser.rejected]: () => ({ user: null, isLoading: false })
  }
});

export const { logout, signIn } = currentUserSlice.actions;
export { fetchCurrentUser }

export default currentUserSlice.reducer;
