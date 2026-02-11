import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	return (
		<nav className="sidebar">
			<ul className="sidebar-main">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About Us</Link></li>
				<li><Link to="/contact">Contact Us</Link></li>
				<li><Link to="/products">All Products</Link></li>
				<li><Link to="/cart">Shopping Cart</Link></li>
			</ul>
			<div id="auth-links" className="sidebar-auth-links" style={{ marginTop: 'auto', padding: '12px 20px' }}>
				<Link to="/login" className="btn">Login</Link>
			</div>
		</nav>
	);
}


