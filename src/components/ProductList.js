import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from './CartContext';
import './Product.css';

function ProductList({ filters }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Access the current URL

  const { addToCart } = useCart();

  // Get the category from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    let url = "http://localhost:1000/api/product/all-products";

    // Add category filter to the URL if category is specified
    if (selectedCategory) {
      url = `${url}?category=${selectedCategory}`;
    }

    // Fetch products from backend API based on category
    axios.get(url)
      .then(response => {
        console.log('Fetched Products:', response.data); // Debug log
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setSearch(response.data.products);
        } else {
          setProducts([]);  // Set empty array if no products are returned
        }
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        setProducts([]);  // Set empty array in case of error
      });
  }, [selectedCategory, filters]);  // Re-run when selectedCategory or filters change

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const ForSearch = (e) => {
    if (e.length === 0) {
      setSearch(products);
    } else {
      setSearch(products.filter(f => Object.values(f.title).join('').toLowerCase().includes(e.target.value.toLowerCase())));
    }
  };

  // Apply filters on the products (optional)
  const filteredProducts = search.filter((product) => {
    const { priceRanges , brand , type} = filters;

    console.log('Filters:', filters);  // Debug log

    const typeMatch = !type.length || type.includes(product.type);
    const brandMatch = !brand.length || brand.includes(product.brand);
    const priceMatch = !priceRanges.length || priceRanges.some((range) => {
      const [min, max] = range.split('-').map(Number);
      return product.price >= min && product.price <= max;
    });

    console.log('type Match:', typeMatch);
    console.log('Brand Match:', brandMatch);
    console.log('Price Match:', priceMatch);

    return typeMatch && brandMatch && priceMatch;
  });

  console.log('Filtered Products:', filteredProducts);  // Debug log

  return (
    <>
      <div className="search-bar">
        <input type="text" onChange={ForSearch} className="search-input" placeholder="Search products" />
      </div>

      <div className="Product-gallery">
        {filteredProducts.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="product-card"
            >
              <img src={`http://localhost:1000/${product.image}`} alt={product.title} style={{ width: "500px", height: "300px" }} />
              <h4>{product.title}</h4>
              <p>Rs: {product.price}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProductList;
