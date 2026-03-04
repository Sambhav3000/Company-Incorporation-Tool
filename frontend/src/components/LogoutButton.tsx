import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css"

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();          
    navigate("/login");     
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;