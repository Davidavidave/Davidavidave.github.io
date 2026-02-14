import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    // 1. PREVENT the browser from trying to find a real "login" page on the server
    e.preventDefault(); 
    setError("");

    // 2. RUN our local logic instead
    const success = login(email, password);

    if (success) {
      navigate("/profile"); 
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <section className="auth-page">
      <h1>User Login</h1>
      {/* Ensure there is NO 'action' attribute here */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </section>
  );
}