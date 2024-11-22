import React from "react";
import FirstLayout from "./layout/FirstLayout";
import Login from "./components/LoginSection/Login";
import ForgetPassword from "./components/LoginSection/ForgetPassword";
import ResetPassword from "./components/LoginSection/ResetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyOtp from "./components/LoginSection/VerifyOtp";
import Home from "./components/HomeSection/Home";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

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
      <RouterProvider router={router} />
      {/* Add ToastContainer here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
