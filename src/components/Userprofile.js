import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Useridcontext } from './Useridcontext';

const Userprofile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [mobilenumber, setMobilenumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { userID } = useContext(Useridcontext);
  const [error, setError] = useState(null);
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userID) return;

      try {
        const response = await axios.get(`http://localhost:1000/api/profile/${userID}`);
        
        if (response.status === 200) {
          setUserDetails(response.data.user);
          setMobilenumber(response.data.user.contact);  // Prefill the form
          setName(response.data.user.name);
          setEmail(response.data.user.email);
        } else {
          setError('Error fetching user details');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchUserProfile();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedUser = {
      name,
      email,
      contact: mobilenumber,
    
    };

    try {
      const response = await axios.put(`http://localhost:1000/api/profile/${userID}`, updatedUser);

      if (response.status === 200) {
        alert("Details Saved Successfully!");
        setUserDetails(response.data.user);  // Update local state with updated user details
      } else {
        alert("Failed to save details");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to update details");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-details">
        <p><strong>Id:</strong> {userDetails._id}</p>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Contact:</strong> {userDetails.contact}</p>
      </div>

      <div className="user-profile">
        <h2>Edit details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <div className="mobile-field">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
         
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              value={mobilenumber}
              onChange={(e) => setMobilenumber(e.target.value)}
            />
          </div>
         
          <button type="submit" className="save-button">
            Save details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userprofile;
