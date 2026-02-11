import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer>
			<p>
				&copy; 2026 Got'em Burger Shop | Contact: gotemburg@gmail.com or{' '}
				<Link to="/contact" className="footer-link">Contact Us</Link>.
			</p>
		</footer>
	);
}

