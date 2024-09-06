// src/layouts/UserLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const UserLayout = () => {
  return (
    <>
      <NavBar />
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div className="container-fluid content d-flex align-items-center">
          <div className="col-md-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
