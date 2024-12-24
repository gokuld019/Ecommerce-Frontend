import React, { useState } from 'react';

const AdminLogin = () => {
  
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username and password match the hardcoded values
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setErrorMessage("");
      alert("Login successful! Welcome, Admin.");
      
    } else {
      setErrorMessage("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
