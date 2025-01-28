import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import LoginPage from './components/pages/LoginPage';
import SearchPage from './components/pages/SearchPage';
import MatchPage from './components/pages/MatchPage';
import Navbar from './components/Navbar';
import { logoutUser } from './utils/fetchAPI';

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
      <Routes>
      <Route path="/" element={
            isAuthenticated ? <Navigate to="/search" /> : <LoginPage onLogin={handleLogin} />
          } />
        <Route path="/search"element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} />
        <Route path="/match" element={isAuthenticated ? <MatchPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>

  )
}

export default App
