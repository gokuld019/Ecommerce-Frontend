import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDel.css'

const AdminDel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for editing a product
  const [editProduct, setEditProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/product/all-products');
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setError('No products found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/product/all-products/${id}`);
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        alert('Product deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Handle product update
  const handleEdit = (product) => {
    // Set the product to edit and prefill the form fields
    setEditProduct(product);
    setUpdatedName(product.name);
    setUpdatedDescription(product.description);
    setUpdatedPrice(product.price);
    setUpdatedImage(product.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
      image: updatedImage,
    };

    try {
      const response = await axios.put(`http://localhost:1000/api/products/:id/${editProduct._id}`, updatedProduct);
      if (response.status === 200) {
        // Update the product in the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product._id === editProduct._id ? response.data : product))
        );
        alert('Product updated successfully');
        setEditProduct(null); // Close the update form
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  // Render loading state, error, or products list
  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Admin Product Page</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="Admin-card">
              <img src={`http://localhost:1000/${product.image}`} alt={product.title} />
              <p>{product.title}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleDelete(product._id)} className="delete-button">
                Delete
              </button>
              <button onClick={() => handleEdit(product)} className="edit-button">
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Product Update Form */}
      {editProduct && (
        <div className="edit-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Product Name:</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={updatedImage}
                onChange={(e) => setUpdatedImage(e.target.value)}
              />
            </div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setEditProduct(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDel;
