import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("jwttoken");

const initialState = {
  user: null,
  isAuthenticate: !!token, // it return the boolean value that if token is there it return -- true and if the token is not then return false
  loading: false,
  isVerified: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuthenticate = true;
      state.isVerified = user.isVerified;
      state.error = null;
    },
    verifyotpsuccess(state) {
      state.isVerified = true;
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    authFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticate = false;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  logoutSuccess,
  authFailure,
  verifyotpsuccess,
} = authSlice.actions;

export default authSlice.reducer;
