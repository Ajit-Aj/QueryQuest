// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const navBarStyle = {
  backgroundColor: '#007bff', 
};

const NavBar = () => {
  return (
    <Navbar style={navBarStyle} variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{ color: '#fff' }}>MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/profile" style={{ color: '#fff' }}>Profile</Nav.Link>
          <Nav.Link as={Link} to="/posts" style={{ color: '#fff' }}>My Posts</Nav.Link>
          <Nav.Link as={Link} to="/settings" style={{ color: '#fff' }}>Settings</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
