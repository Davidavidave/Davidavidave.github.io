import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<header>
			<ul>
				<li>
					<Link to="/">
						<img src="/burgershop/logo.png" alt="Company Logo" className="logo" onError={(e) => e.target.style.display = 'none'} />
					</Link>
				</li>
			</ul>
			<h1>Got'em Burger Shop</h1>
		</header>
	);
}
