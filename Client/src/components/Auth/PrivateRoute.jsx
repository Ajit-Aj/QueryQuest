import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/parseJwt";

const PrivateRoute = ({ element, requiredRole, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const token = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (token) {
    const decodedToken = decodeToken(token);
    
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/error" />;
    }
  }

  return element;
};

export default PrivateRoute;
