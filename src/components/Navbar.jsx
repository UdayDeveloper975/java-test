import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Heart color="#ff6b66" size={24} />
          <span>DateMatch</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-user" className="nav-link">Add User</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;