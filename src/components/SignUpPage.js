import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:1000/api/user/SignUp', {
        name,
        email,
        password,
      });

      if (response.data) {
        alert('User Registration Successful!');
      } else {
        setErrorMessage(response.data.message); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error: ' + (error.response?.data?.message || error.message)); 
    }
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>

        
        <div className="form-group">
          <label>Email Id</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Id"
            required
          />
        </div>

        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

    
      {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

      <p className="signin-link">
        Already have an account?{' '}
        <Link to="/signin" className="dropdown-item">
          Sign In
        </Link>
      </p>

      <p className="terms-text">
        By creating an account or logging in, you agree to Website's{' '}
        <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignUpPage;
