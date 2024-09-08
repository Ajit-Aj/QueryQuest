import { useState } from "react";
import { Button, Nav, NavItem, Collapse } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  const navigation = [
    {
      title: "Dashboard",
      href: "/admin/users",
      icon: "bi bi-speedometer2",
    },
    {
      title: "Members",
      icon: "bi bi-people-fill", // Updated icon for Members section
      children: [
        {
          title: "Members",
          href: "/admin/members",
          icon: "bi bi-person-lines-fill", // Icon representing a list of members
        },
        {
          title: "Add Members",
          href: "/admin/addMembers",
          icon: "bi bi-person-plus-fill", // Icon representing adding a new member
        },
        {
          title: "Edit Members",
          href: "/admin/editMembers",
          icon: "bi bi-pencil-square", // Icon representing editing a member's details
        },
        {
          title: "Member Profile",
          href: "/admin/memberprofile",
          icon: "bi bi-person-badge-fill", // Icon representing a member's profile
        },
      ],
    },

    {
      title: "Components",
      icon: "bi bi-layers",
      children: [
        {
          title: "Alert",
          href: "/admin/alerts",
          icon: "bi bi-bell",
        },
        {
          title: "Badges",
          href: "/admin/badges",
          icon: "bi bi-patch-check",
        },
        {
          title: "Buttons",
          href: "/admin/buttons",
          icon: "bi bi-hdd-stack",
        },
      ],
    },
    {
      title: "Forms",
      href: "/admin/forms",
      icon: "bi bi-textarea-resize",
    },
    {
      title: "Table",
      href: "/admin/table",
      icon: "bi bi-layout-split",
    },
    {
      title: "About",
      href: "/admin/about",
      icon: "bi bi-people",
    },
  ];

  const toggleSubMenu = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-2 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  to={navi.href || "#"}
                  className={
                    location.pathname === navi.href
                      ? "nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                  style={
                    location.pathname === navi.href ? { color: "#3F77F3" } : {}
                  }
                  onClick={() => navi.children && toggleSubMenu(index)}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
                {navi.children && (
                  <i
                    className={`bi ${
                      openSubMenu[index] ? "bi-chevron-up" : "bi-chevron-down"
                    } p-2`}
                    onClick={() => toggleSubMenu(index)}
                  ></i>
                )}
              </div>
              {navi.children && (
                <Collapse isOpen={openSubMenu[index]}>
                  <Nav vertical>
                    {navi.children.map((child, childIndex) => (
                      <NavItem key={childIndex} className="ms-4">
                        <Link
                          to={child.href}
                          className={
                            location.pathname === child.href
                              ? "nav-link py-2"
                              : "nav-link text-secondary py-2"
                          }
                          style={
                            location.pathname === child.href
                              ? { color: "#3F77F3" }
                              : {}
                          }
                        >
                          <i className={child.icon}></i>
                          <span className="ms-2">{child.title}</span>
                        </Link>
                      </NavItem>
                    ))}
                  </Nav>
                </Collapse>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;