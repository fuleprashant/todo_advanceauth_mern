import React, { useState, useEffect } from "react";
import login from "../../assets/login.webp";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import authRequest from "../../redux/authSlice";
import { signUpUser } from "../../services/auth.services";
import { toast } from "react-toastify";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signUpSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    // dispatch(authRequest());
    try {
      if (isSignUp) {
        const result = await signUpUser(data);
        console.log("the result is", result);
        toast.success(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full justify-center px-6 py-12 lg:px-8 sm:mt-20 md:mt-32 gap-6 lg:gap-0">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={login}
            alt="login illustration"
            className="h-[250px] w-[250px] lg:h-[550px] lg:w-[550px]"
          />
        </div>

        {/* Form Section */}
        <div className="px-4 py-10 md:px-0 space-y-6 shadow-lg rounded-lg lg:rounded-l-none">
          <h2 className="text-center font-bold text-2xl lg:text-3xl">
            {isSignUp ? "Create Your Account" : "Login to Your Account"}
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-x-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {isSignUp && (
                  <div className="">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="w-full"
                          placeholder="Name"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </div>
                )}
                <div className="space-y-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        placeholder="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                  <div className="relative">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="w-full"
                          placeholder="Password"
                          type={showpassword ? "text" : "password"}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                      )}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                      onClick={() => setShowpassword(!showpassword)}
                    >
                      {showpassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {!isSignUp && (
                    <p className="text-blue-700">Forget password?</p>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    className="w-full p-[25px] h-14"
                  >
                    {isSignUp ? "SignUp" : "Login"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    className="w-full h-14"
                  >
                    Sign In With Google
                  </Button>
                  <p>
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <NavLink
                      className="text-blue-700"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? " SignIn" : " Create Your Account"}
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
