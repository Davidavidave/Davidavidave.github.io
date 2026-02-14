import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, mobile, address } = form;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile || !address) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    signup(form);
    navigate("/login");
  };

  return (
    <section className="auth-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <label
              htmlFor={field}
              style={{ display: "block", textTransform: "capitalize" }}
            >
              {field.replace(/([A-Z])/g, " $1")}
            </label>

            {field === "address" ? (
              <textarea
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                autoComplete="street-address"
                required
              />
            ) : (
              <input
                id={field}
                name={field}
                type={field.includes("password") ? "password" : "text"}
                value={form[field]}
                onChange={handleChange}
                autoComplete={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "new-password"
                    : field === "confirmPassword"
                    ? "new-password"
                    : field === "firstName"
                    ? "given-name"
                    : field === "lastName"
                    ? "family-name"
                    : field === "mobile"
                    ? "tel"
                    : "on"
                }
                required
              />
            )}
          </div>
        ))}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
