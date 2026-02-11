import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section>
      <h2>About Our Got'em Burger Shop</h2>
      <p>
        We are Got'em Burger, established in 1986 at Tomas Morato, Quezon City.
        We have served delicious burgers since the 1980s and now have over
        356 branches worldwide.
      </p>

      <h2>About Franchise</h2>
      <p>
        Interested in franchising? Visit our{' '}
        <Link to="/contact" className="btn">Contact Page</Link>.
      </p>
    </section>
  );
}

