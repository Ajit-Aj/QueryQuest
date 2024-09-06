import React from "react";
import { Outlet } from "react-router-dom"; // Correctly import Outlet as a named export
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Navbar/Navbar";

const SettingLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default SettingLayout;
