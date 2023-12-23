// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Ecommerce
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Product Add
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
