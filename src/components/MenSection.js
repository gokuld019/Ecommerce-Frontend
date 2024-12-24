import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext'; 

const MenSection = () => {
    const [menProducts, setMenProducts] = useState([]);
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchMenProducts = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/product/all-products'); 
                // Make sure response data is an array
                setMenProducts(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching men's products:", error);
                setMenProducts([]); // Set an empty array in case of an error
            }
        };
        fetchMenProducts();
    }, []);

    return (
        <div className="men-products">
            <h1>Men's Products</h1>
            <div className="product-grid">
                {menProducts.length > 0 ? (
                    menProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.img} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">Rs: {product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p> // Message when no products are available
                )}
            </div>
        </div>
    );
};

export default MenSection;
