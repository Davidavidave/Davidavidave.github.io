import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <section className="auth-page">
      <h1>User Sign Up</h1>
      <div className="auth-container">
        <main>
          <form id="signupForm" className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required placeholder="" />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required placeholder="" />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="" />

            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" name="mobile" required placeholder="" />

            <label htmlFor="address">Home Address</label>
            <textarea id="address" name="address" required placeholder=""></textarea>

            <button type="submit" className="btn">Register</button>
          </form>

          <Link to="/login">Back to Login</Link>
        </main>
      </div>
    </section>
  );
}

