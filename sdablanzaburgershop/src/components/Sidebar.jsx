import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="sidebar">
      <ul className="sidebar-main">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/products">All Products</Link></li>
        <li><Link to="/cart">Shopping Cart</Link></li>
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
      </ul>
      <div id="auth-links" className="sidebar-auth-links" style={{ marginTop: 'auto', padding: '12px 20px' }}>
        {isLoggedIn ? (
          <div>
            <button onClick={logout} className="btn">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

