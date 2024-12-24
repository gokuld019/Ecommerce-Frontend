import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const BoysSection = () => {
    const [boysProducts, setBoysProducts] = useState([]);
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenProducts = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/product/all-products');
                if (Array.isArray(response.data)) {
                    setBoysProducts(response.data);
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("Error fetching men's products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMenProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="men-products">
            <h1>Men's Products</h1>
            <div className="product-grid">
                {boysProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.img} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">Rs: {product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoysSection;
