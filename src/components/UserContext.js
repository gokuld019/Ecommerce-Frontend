import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Attempt to load user from localStorage
    const savedUser = localStorage.getItem('userID');
    return savedUser ? savedUser : null; // If there is a userID, return it as a string
  });

  // Login function
  const login = (userData) => {
    setUser(userData); // userData is assumed to be a string or an ID
    localStorage.setItem('userID', userData); // Store userID in localStorage as a plain string
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('userID'); // Remove the userID from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
