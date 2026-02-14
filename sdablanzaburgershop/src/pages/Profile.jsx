import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn || !user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <section>
      <h1>User Profile</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile Number:</strong> {user.mobile}</p>
      <p><strong>Home Address:</strong> {user.address}</p>
    </section>
  );
}