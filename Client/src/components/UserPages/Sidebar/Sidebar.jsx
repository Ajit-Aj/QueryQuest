import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../style.css";
import { Nav } from "react-bootstrap";
import Profile from "../../../assets/profile.jpg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      style={{ marginTop: "4%", backgroundColor: "#2E69FF" }}
    >
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Nav className="flex-column ">
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#create-space"
            className="d-flex align-items-center nav-link-custom"
          >
            <FaPlus className="mr-2" />
            <span>Create Space</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#python-coding"
            className="d-flex align-items-center nav-link-custom"
          >
            <img
              src={Profile}
              alt="Python Coding"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Python Coding</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#marvelholics"
            className="d-flex align-items-center nav-link-custom"
          >
            <img
              src={Profile}
              alt="MarvelHolics"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>MarvelHolics</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#get-insta-followers"
            className="d-flex align-items-center nav-link-custom"
          >
            <img
              src={Profile}
              alt="Get Insta Followers"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Get Insta Followers...</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#fruits-health"
            className="d-flex align-items-center  nav-link-custom"
          >
            <img
              src={Profile}
              alt="FRUITS - Health"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>FRUITS - Health...</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#hollywood"
            className="d-flex align-items-center  nav-link-custom"
          >
            <img
              src={Profile}
              alt="Hollywood"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Hollywood</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#artificial-intelligence"
            className="d-flex align-items-center  nav-link-custom"
          >
            <img
              src={Profile}
              alt="Artificial Intelligence"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Artificial Intelligence</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#computer-science"
            className="d-flex align-items-center  nav-link-custom"
          >
            <img
              src={Profile}
              alt="Computer Science"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Computer Science</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#mobile-technology"
            className="d-flex align-items-center nav-link-custom"
          >
            <img
              src={Profile}
              alt="Mobile Technology"
              className="mr-2"
              width="24"
              height="24"
            />
            <span>Mobile Technology</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <Nav className="flex-column">
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#about"
            className="d-flex align-items-center  nav-link-custom"
          >
            <span>About - Careers</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#careers"
            className="d-flex align-items-center nav-link-custom"
          >
            <span>Terms & Services</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#careers"
            className="d-flex align-items-center nav-link-custom"
          >
            <span>Your Ad Choice</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#careers"
            className="d-flex align-items-center nav-link-custom"
          >
            <span>Grievance Offices</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
