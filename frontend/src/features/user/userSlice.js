// frontend/src/features/user/userSlice.js (update with async logic)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../auth';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await login(credentials);
  return response.token;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: { token: null },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
