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

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobile,
      address,
    } = form;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !address
    ) {
      setError("Fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    signup({ firstName, lastName, email, password, mobile, address });

    navigate("/login");
  };

  return (
    <section className="auth-page">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div key={field}>
            <label>{field}</label>
            {field === "address" ? (
              <textarea name={field} value={form[field]} onChange={handleChange} />
            ) : (
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>

      <Link to="/login">Back to login</Link>
    </section>
  );
}
