import React, { useState } from 'react';
import axios from 'axios';
import './AdminAddProduct.css'

const AdminAddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('type', type);

    try {
      const response = await axios.post('http://localhost:1000/api/product/new', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data) {
        alert('Product added successfully!');
      } else {
        setErrorMessage(response.data.message); // Display error message from response
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error adding product: ' + error.response?.data?.message || error.message); // Display error to user
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <h4>Admin</h4>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />

      <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Product</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
    </form>
    </div>
  );
};

export default AdminAddProduct;
