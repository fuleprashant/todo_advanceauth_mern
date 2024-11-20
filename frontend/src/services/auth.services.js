import { useDispatch } from "react-redux";
import { authRequest } from "../redux/authSlice";
import axiosInstance from "./axios";
import {
  forgotpassword,
  logIn,
  logout,
  resetpassword,
  signUp,
  verifyotp,
} from "./apiconstant";

const dispatch = useDispatch();

// sign-up api calling
export const signUpUser = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post(signUp, userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// login api calling
export const logInUser = async (userData) => {
  dispatch(authRequest);
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
