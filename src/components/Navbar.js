import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing FaUser for the profile icon
import  { useUser } from './UserContext'
import './Navbar.css';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout } = useUser(); // Get user state and logout function from context
  const navigate = useNavigate();

  const toggleDropdown = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };
  const handleLogout = () => {
    logout(); // Log the user out
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Men Section */}
        <li
          className="navbar-item"
          onMouseEnter={() => toggleDropdown("men")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="men?category=men" className="navbar-link">Men</Link>
          {activeDropdown === "men" && (
            <div className="dropdown">
              <div className="dropdown-section">
                <h4>Topwear</h4>
                <ul>
                  <li><Link to="/men/tshirts">T-Shirts</Link></li>
                  <li><Link to="/men/casual-shirts">Casual Shirts</Link></li>
                  <li><Link to="/men/formal-shirts">Formal Shirts</Link></li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Bottomwear</h4>
                <ul>
                  <li><Link to="/men/jeans">Jeans</Link></li>
                  <li><Link to="/men/casual-trousers">Casual Trousers</Link></li>
                  <li><Link to="/men/formal-trousers">Formal Trousers</Link></li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Footwear</h4>
                <ul>
                  <li><Link to="/men/sneakers">sneakers</Link></li>
                  <li><Link to="/men/flip flop">flip flop</Link></li>
                  <li><Link to="/men/formal shoe">Formal shoe</Link></li>
                  <li><Link to="/men/Casual shoe">Casual shoe</Link></li>

                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Women Section */}
        <li
          className="navbar-item"
          onMouseEnter={() => toggleDropdown("women")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="women?category=women" className="navbar-link">Women</Link>
          {activeDropdown === "women" && (
            <div className="dropdown">
              <div className="dropdown-section">
                <h4>Western Wear</h4>
                <ul>
                  <li><Link to="/women/tops">Tops</Link></li>
                  <li><Link to="/women/dresses">Dresses</Link></li>
                  <li><Link to="/women/jumpsuits">Jumpsuits</Link></li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Indian Wear</h4>
                <ul>
                  <li><Link to="/women/sarees">Sarees</Link></li>
                  <li><Link to="/women/kurtas">Kurtas</Link></li>
                  <li><Link to="/women/lehengas">Lehengas</Link></li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Kids Section */}
        <li
          className="navbar-item"
          onMouseEnter={() => toggleDropdown("kids")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="kids?category=kids" className="navbar-link">Kids</Link>
          {activeDropdown === "kids" && (
            <div className="dropdown">
              <div className="dropdown-section">
                <h4>Clothing</h4>
                <ul>
                  <li><Link to="/kids/tshirts">T-Shirts</Link></li>
                  <li><Link to="/kids/shorts">Shorts</Link></li>
                  <li><Link to="/kids/dresses">Dresses</Link></li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Toys</h4>
                <ul>
                  <li><Link to="/kids/action-figures">Action Figures</Link></li>
                  <li><Link to="/kids/educational-toys">Educational Toys</Link></li>
                  <li><Link to="/kids/soft-toys">Soft Toys</Link></li>
                </ul>
              </div>
            </div>
          )}
        </li>



        {/* Sign-In/Sign-Up Section */}
        <li
          className="navbar-item"
          onMouseEnter={() => toggleDropdown("Account")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="navbar-link">Hello, Sign in <br /> Account & Lists</span>
          {activeDropdown === "Account" && (
            <div className="dropdown dropdown-account">
              <Link to="/signin" className="dropdown-item">Sign In</Link>
              <Link to="/signup" className="dropdown-item">New Customer? Start here</Link>
              <div className="dropdown-section">
                <h4>Your Account</h4>
                <ul>
                  <li><Link to="/My Profile">Profile</Link></li>
                  <li><Link to="/orders">Orders</Link></li>
                  <li><Link to="/wishlist">Wish List</Link></li>
                  <li><Link to="/recommendations">Recommendations</Link></li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Profile Icon Section */}
        <li
          className="navbar-item"
          onMouseEnter={() => toggleDropdown("profile")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <FaUser className="profile-icon" />
          {activeDropdown === "profile" && (
            <div className="dropdown dropdown-profile">
              <Link to="/signup" className="dropdown-item">Sign Up</Link>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
          )}
        </li>

        {/* Cart Link */}
        <li className="navbar-item">
          <Link to="/cart" className="navbar-cart">
            <FaShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
