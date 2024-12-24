import React, { useState } from "react";
import axios from "axios";

function ProductSearch() {
    const [query, setQuery] = useState('');  // Search query for the product title or description
    const [category, setCategory] = useState('');  // Selected category (Men, Women, Kids)
    const [products, setProducts] = useState([]);  // State to hold products that match the search
    const [error, setError] = useState('');  // State for error messages

    const handleSearch = async () => {
        try {
            // Construct the search URL with query and category filters
            const url = new URL('http://localhost:1000/api/products/search');
            if (query) url.searchParams.append('query', query);  // Add query parameter
            if (category) url.searchParams.append('category', category);  // Add category filter

            console.log("Request URL:", url.toString());  // Log the URL to the console

            // Send a GET request to the backend
            const response = await axios.get(url.toString());
            console.log("Response data:", response.data);  // Log the response data

            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);  // Update products state with the results
                setError('');  // Clear any previous error messages
            } else {
                setProducts([]);  // In case of unexpected response, clear products
                setError('No products found.');
            }
        } catch (err) {
            console.error("Error fetching products:", err);  // Log any errors that occur
            setProducts([]);  // Clear products
            setError('No products found or there was an error.');
        }
    };

    return (
        <div>
            <div className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}  // Update query
                    placeholder="Search products by title or description"
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)} >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p>{error}</p>}  {/* Display error message if any */}

            <div className="Product-gallery">
                {products.length === 0 ? (
                    <p>No products found</p>  
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img
                                src={`http://localhost:1000/${product.image}`}  // Ensure image URL is correct
                                alt={product.title}
                                style={{ width: "100px" }}
                            />
                            <h4>{product.title}</h4>
                            <p>Rs: {product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductSearch;
