import React, { Children } from "react";
import FirstLayout from "./layout/FirstLayout";
import Login from "./components/LoginSection/Login";
import ForgetPassword from "./components/LoginSection/ForgetPassword";
import ResetPassword from "./components/LoginSection/ResetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyOtp from "./components/LoginSection/VerifyOtp";
import Home from "./components/HomeSection/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
