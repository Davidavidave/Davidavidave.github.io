import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("burgerUser");
    const savedLogin = localStorage.getItem("burgerLoggedIn");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  const signup = (data) => {
    setUser(data);
    localStorage.setItem("burgerUser", JSON.stringify(data));
    setIsLoggedIn(false);
    localStorage.setItem("burgerLoggedIn", "false");
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("burgerUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      setIsLoggedIn(true);
      localStorage.setItem("burgerLoggedIn", "true");
      return true; // Login.jsx needs this to navigate!
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("burgerLoggedIn", "false");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}