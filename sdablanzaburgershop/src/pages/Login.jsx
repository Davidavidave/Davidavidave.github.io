import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className="auth-page">
      <h1>User Login</h1>
      <div className="auth-container">
        <main>
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label>Email Address</label>
            <input type="email" placeholder="" required />

            <label>Password</label>
            <input type="password" placeholder="" required />

            <button type="submit" className="btn">Login</button>
          </form>

          <p>Don't have an account?</p>
          <Link to="/signup">Create an account</Link>
        </main>
      </div>
    </section>
  );
}

