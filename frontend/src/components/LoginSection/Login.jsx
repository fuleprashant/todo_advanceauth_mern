import React, { useState } from "react";
import login from "../../assets/login.webp";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full justify-center px-6 py-12 lg:px-8  sm:mt-20 md:mt-32 gap-6 lg:gap-0">
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
            <form>
              <div className="space-y-4">
                {isSignUp && (
                  <div className="">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="w-full "
                          placeholder="name"
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
                        placeholder="email"
                      />
                    )}
                  />{" "}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        placeholder="password"
                      />
                    )}
                  />
                  {!isSignUp && (
                    <p className="text-blue-700">forget password</p>
                  )}
                  <Button variant="contained" className="w-full p-[25px] h-14">
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
                      ? "Already have an account ?"
                      : "Don't have account ?"}
                    <NavLink
                      className="text-blue-700"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? "signIn" : " create your account"}
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
