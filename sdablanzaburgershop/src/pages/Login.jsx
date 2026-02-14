import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <section className="auth-page">
      <h1>User Login</h1>
      <div className="auth-container">
        <main>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" className="btn">Login</button>
          </form>

          <p>Don't have an account?</p>
          <Link to="/signup">Create an account</Link>
        </main>
      </div>
    </section>
  );
}

