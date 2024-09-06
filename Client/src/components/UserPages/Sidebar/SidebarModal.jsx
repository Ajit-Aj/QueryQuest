// src/components/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const sidebarStyle = {
  width: "250px",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  height: "100vh",
};

const Sidebar = () => {
  return (
    <div
      style={sidebarStyle}
      className="px-3 sticky shadow-sm d-none d-lg-flex"
    >
      <Nav className="flex-column">
        <h3>Questions</h3>
        <Nav.Link as={Link} to="/question/questionforyou">
          Question for you
        </Nav.Link>
        <Nav.Link as={Link} to="/question/answer-request">
          Answer Request
        </Nav.Link>
        <Nav.Link as={Link} to="/question/draft">
          Draft
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
