// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from '../../utils/parseJwt';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);

      // Decode and store the token payload
      if (action.payload) {
        try {
          const decodedToken = decodeToken(action.payload);
          state.user = decodedToken; // Assuming decodedToken contains role and other details
        } catch (error) {
          console.error("Invalid token", error);
          state.user = null;
        }
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, clearUser } = authSlice.actions;
export default authSlice.reducer;
