import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { useCart } from './CartContext'; // Assuming CartContext is used for global state management
import axios from 'axios';
import { Useridcontext } from './Useridcontext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
  const { setUserId } = useContext(Useridcontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Perform login
      const loginResponse = await axios.post('http://localhost:1000/api/user/login', { email, password });
  
      if (loginResponse.status === 200) {
        const userId = loginResponse.data.user.id; // Assuming the response contains userId
        setUserId(userId); // Store the userId in CartContext
        alert('Login Successfully');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    }
  };
  
  // // Fetch user's cart
  // const fetchCart = async (userId) => {
  //   if (userId) {
  //     try {
  //       // Fetch the cart using the userId
  //       const response = await axios.get(`http://localhost:1000/api/cart/${userId}`);
  //       console.log("Fetching cart for user:", userId);
  //       if (response.status === 200 && response.data.cart) {
  //         setCartItems(response.data.cart); // Update state with cart items
  //       }

  //     } catch (err) {
  //       console.error('Error fetching cart:', err);
  //       setError('Failed to fetch cart items.');
  //     }
  //   }
  // };

  return (
    <div className="signup-container">
      <h1>Login Page</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error if any */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
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

        <button type="submit" className="submit-button">Login</button>
      </form>

      <p className="terms-text">
        By creating an account or logging in, you agree to Website's <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default LoginPage;
