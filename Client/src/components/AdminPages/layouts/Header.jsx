import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../../../assets/images/logos/Logo_white.svg";
import user1 from "../../../assets/images/users/user1.jpg";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const { name, clearAuthInfo, profileImage } = useContext(AuthContext);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar
      style={{ backgroundColor: "#3F77F3" }}
      dark
      expand="md"
      // className="bg-gradient"
    >
      <div className="d-flex align-items-center">
        <NavbarBrand href="/admin" className="d-lg-none">
          <img src={LogoWhite} alt="Logo" />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="md"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/admin/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <span className="text-white mx-1">
          {" Hi,"}
          {name}
        </span>{" "}
        {/* Display the username */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={`http://localhost:4000/${profileImage}`}
              alt="profile"
              className="rounded-circle"
              style={{ objectFit: "cover" }}
              width={45}
              height={45}
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={clearAuthInfo}>Logout</DropdownItem>{" "}
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
// } from "reactstrap";
// import { ReactComponent as LogoWhite } from "../../../assets/images/logos/Logo_white.svg";
// import user1 from "../../../assets/images/users/user1.jpg";

// const Header = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   return (
//     <Navbar
//       style={{ backgroundColor: "#3F77F3" }}
//       dark
//       expand="md"
//       className="bg-gradient"
//     >
//       <div className="d-flex align-items-center">
//         <NavbarBrand href="/" className="d-lg-none">
//           <LogoWhite />
//         </NavbarBrand>
//         <Button
//           color="primary"
//           className=" d-lg-none"
//           onClick={() => showMobilemenu()}
//         >
//           <i className="bi bi-list"></i>
//         </Button>
//       </div>
//       <div className="hstack gap-2">
//         <Button
//           color="primary"
//           size="sm"
//           className="d-sm-block d-md-none"
//           onClick={Handletoggle}
//         >
//           {isOpen ? (
//             <i className="bi bi-x"></i>
//           ) : (
//             <i className="bi bi-three-dots-vertical"></i>
//           )}
//         </Button>
//       </div>

//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="me-auto" navbar>
//           <NavItem>
//             <Link to="/starter" className="nav-link">
//               Starter
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link to="/about" className="nav-link">
//               About
//             </Link>
//           </NavItem>
//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle caret nav>
//               DD Menu
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>Option 1</DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>
//         <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//           <DropdownToggle color="transparent">
//             <img
//               src={user1}
//               alt="profile"
//               className="rounded-circle"
//               width="30"
//             ></img>
//           </DropdownToggle>
//           <DropdownMenu>
//             <DropdownItem header>Info</DropdownItem>
//             <DropdownItem>My Account</DropdownItem>
//             <DropdownItem>Edit Profile</DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem>My Balance</DropdownItem>
//             <DropdownItem>Inbox</DropdownItem>
//             <DropdownItem>Logout</DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Header;
