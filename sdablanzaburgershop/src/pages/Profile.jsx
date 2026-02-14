import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h1>User Profile</h1>

      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Address:</strong> {user.address}</p>

      <button onClick={logout}>Logout</button>
    </section>
  );
}
