import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from './components/pages/LoginPage';
import SearchPage from './components/pages/SearchPage';
import MatchPage from './components/pages/MatchPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>

  )
}

export default App
