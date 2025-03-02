import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import AddUser from './pages/AddUser';
import Recommendations from './pages/Recommendations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserDetails />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/recommendations/:userId" element={<Recommendations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;