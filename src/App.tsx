import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import LoginPage from './components/pages/LoginPage';
import SearchPage from './components/pages/SearchPage';
import MatchPage from './components/pages/MatchPage';
import Navbar from './components/Navbar';
// import { logoutUser } from './utils/fetchAPI';
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <AnimatePresence mode='wait'>
      <Routes>
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
    </Router>

  )
}

export default App
