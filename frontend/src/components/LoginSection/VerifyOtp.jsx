import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await otpVerify({ verificationOTP: otp, dispatch });
      if (result.status === "Success") {
        toast.success(result.message);
      }
      navigate("/");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter the OTP sent to your email or phone
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              className="w-2/3 px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300"
          >
            Verify
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Didn’t receive the OTP?{" "}
          <button className="text-blue-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
