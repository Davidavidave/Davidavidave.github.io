import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('burgerUser') || 'null');
    } catch (e) {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('burgerLoggedIn') === 'true';
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('burgerUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('burgerUser');
      }
    } catch (e) {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('burgerLoggedIn', isLoggedIn ? 'true' : 'false');
    } catch (e) {
      // ignore
    }
  }, [isLoggedIn]);

  const signup = (userData) => {
    setUser(userData);
    setIsLoggedIn(false); // signup doesn't log in immediately
  };

  const login = (email, password) => {
    if (user && user.email === email && user.password === password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}