import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../utils/fetchAPI';

const Navbar: React.FC<{onLogout: () => void}> = ({onLogout}) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser();
            onLogout(); 
            navigate("/");
          } catch (error) {
            console.error("Logout failed:", error);
            
          }

    }
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#4a3e3d",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2>Fetch Dog Search</h2>
      <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar