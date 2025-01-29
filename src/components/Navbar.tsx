import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../utils/fetchAPI';
import { motion } from "framer-motion";
import './styles/Navbar.css'



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
    <motion.nav
    initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className='navbar'
    >
      <h2>Fetch Dog Search</h2>
      <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
        Logout
      </button>
    </motion.nav>
  )
}

export default Navbar