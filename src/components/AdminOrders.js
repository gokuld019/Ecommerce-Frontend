import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/admin/carts'); 
        setCarts(response.data.carts);  // Update state with the fetched carts
        setLoading(false);  // Set loading to false when data is fetched
      } catch (err) {
        setError('Error fetching cart data');
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);  // Empty dependency array means this effect runs only once after the component mounts

  // Render loading or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render the list of carts
  return (
    <div>
      <h1>Admin - All Cart Items</h1>
      <table>
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {carts.map(cart => (
            <tr key={cart._id}>
              <td>{cart._id}</td>
              <td>{cart.userId.name}</td>  {/* Assuming user data is populated */}
              <td>{cart.userId.email}</td>
              <td>
                {cart.items.map((item, index) => (
                  <div key={index}>
                    <p>{item.title} - {item.quantity} x Rs.{item.price}</p>
                  </div>
                ))}
              </td>
              <td>
                {/* Calculate total price */}
                Rs.{cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
