import React, { createContext, useState, useEffect } from "react";
import { decodeToken } from "../utils/parseJwt";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userRole: null,
    name: null,
    id: null,
    profileImage: null,
  });
  const navigate = useNavigate();

  const setAuthInfo = ({ token }) => {
    if (token) {
      const decodedToken = decodeToken(token);
      console.log(decodedToken);
      const { role, name, id, profileImage } = decodedToken;
      setAuthState({ token, userRole: role, name, id, profileImage });
      localStorage.setItem("authToken", token);
    }
  };

  const clearAuthInfo = () => {
    setAuthState({
      token: null,
      userRole: null,
      name: null,
      profileImage: null,
    });

    setTimeout(() => {
      localStorage.removeItem("authToken");
      navigate("/");
    }, 1800);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthInfo({ token: storedToken });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
