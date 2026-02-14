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
    <section className="profile-container">
      <h1>Welcome, {user.firstName}!</h1>
      
      <div className="profile-card" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h3>User Information</h3>
        <hr />
        <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Shipping Address:</strong> {user.address}</p>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ marginTop: "20px", backgroundColor: "#ff4d4d", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Logout
      </button>
    </section>
  );
}