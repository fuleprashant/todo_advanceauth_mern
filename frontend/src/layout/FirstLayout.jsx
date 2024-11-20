import React from "react";
import Navbar from "../components/HomeSection/Navbar";
import Footer from "../components/LoginSection/Footer";
import { Outlet } from "react-router-dom";

const FirstLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FirstLayout;
