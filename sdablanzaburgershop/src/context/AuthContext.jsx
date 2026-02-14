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

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("burgerUser", JSON.stringify(user));
    }
  }, [user]);

  
  useEffect(() => {
    localStorage.setItem("burgerLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const signup = (data) => {
    setUser(data);
    setIsLoggedIn(false);
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("burgerUser"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      setIsLoggedIn(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
