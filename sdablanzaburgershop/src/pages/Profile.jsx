import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section>
      <h1>User Profile</h1>
      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <button onClick={handleLogout} style={{ marginTop: "20px" }}>Logout</button>
    </section>
  );
}