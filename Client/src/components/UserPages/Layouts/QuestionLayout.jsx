import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/SidebarModal";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const contentWrapperStyle = {
  display: "flex",
  flex: 1,
};

const navBarStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  width: "100%",
  backgroundColor: "#fff",
};

const QuestionLayout = () => {
  return (
    <div style={layoutStyle}>
      <NavBar />
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div
          className="container-fluid content d-flex align-items-center"
          style={contentWrapperStyle}
        >
          <div className="col-md-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionLayout;
