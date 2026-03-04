import React from "react";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css"

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();          // remove JWT from localStorage
    navigate("/login");     // redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;