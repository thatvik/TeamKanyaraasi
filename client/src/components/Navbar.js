import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Team Kanya Raasi
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/members" className="nav-link">
              View Members
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Member
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;