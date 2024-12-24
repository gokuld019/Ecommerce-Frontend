import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/user/buy'); // Replace with your API endpoint for fetching orders
        setOrders(response.data.orders); // Assuming the response contains orders in 'orders' key
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Render loading state or orders
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Orders</h1>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders available</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>{order.productName}</td>
                <td>${order.productPrice}</td>
                <td>{new Date(order.purchaseDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserProduct;
