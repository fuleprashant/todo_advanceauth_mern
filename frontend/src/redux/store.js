import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../redux/authSlice";

export const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
