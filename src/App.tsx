import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import LoginPage from './components/pages/LoginPage';
import SearchPage from './components/pages/SearchPage';
import MatchPage from './components/pages/MatchPage';
import Navbar from './components/Navbar';
// import { logoutUser } from './utils/fetchAPI';
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation()

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/search" /> : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <LoginPage onLogin={handleLogin} />
            </motion.div>
          )
        } />
        <Route path="/search" element={isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <SearchPage />
          </motion.div>
        ) : <Navigate to="/" />} />
        <Route path="/match" element={isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <MatchPage />
          </motion.div>
        ) : <Navigate to="/" />} />
      </Routes>
      </AnimatePresence>
    </>

  )
}

export default App
