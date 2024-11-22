import { authFailure, authRequest, authSuccess } from "../redux/authSlice";
import axiosInstance from "./axios";
import {
  forgotpassword,
  logIn,
  logout,
  resetpassword,
  signUp,
  verifyotp,
} from "./apiconstant";
import { store } from "../redux/store";

const dispatch = store.dispatch;

// sign-up api calling
export const signUpUser = async (userData) => {
  dispatch(authRequest());
  try {
    const headers = {
      "Content-Type": "application/json",
      USER_API_KEY: import.meta.env.API_KEY,
    };
    // console.log(signUp);
    const response = await axiosInstance.post(signUp, userData, { headers });
    console.log("the response is", response);
    dispatch(authSuccess(response.data.newUser));
    return response.data;
  } catch (error) {
    // console.log(error);
    console.log("the error is", error);
    dispatch(authFailure(error));
    throw error.response.data;
  }
};

// login api calling
export const logInUser = async (userData) => {
  dispatch(authRequest());
  try {
    const response = await axiosInstance.post(logIn, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// verify-otp api calling
export const verifyOtpUser = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post(verifyotp, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// forget-password api calling
export const forgetpassword = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post(forgotpassword, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// resert-password api calling
export const resetspassword = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post(resetpassword, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// logout api calling
export const logoutUser = async () => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.get(logout, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
