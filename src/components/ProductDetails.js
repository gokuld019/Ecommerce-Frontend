import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Useridcontext } from './Useridcontext';
import { useCart } from './CartContext'; 
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL params
    const [product, setProduct] = useState(null); // State to hold the product details
    const [selectedSize, setSelectedSize] = useState(''); // State for the selected size
    const [selectedColor, setSelectedColor] = useState(''); // State for the selected color
    const { userID, userName, userEmail } = useContext(Useridcontext); // Get userID and user data from Useridcontext
    const { addToCart, fetchCart, cartItems } = useCart(); // Using the useCart hook to get cart state and functions
    const navigate = useNavigate(); // Use navigate for redirection

    // Fetch product details based on the product ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/product/single/${id}`);
                if (response.data && response.data.product) {
                    setProduct(response.data.product); // Set the product state
                } else {
                    console.error('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // Fetch the cart when the component mounts or userID changes
    useEffect(() => {
        if (userID) {
            fetchCart(userID); // Fetch the cart after the user logs in
        }
    }, [userID, fetchCart]); // Trigger cart fetch on userID change

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Handle color selection
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    // Add product to cart and send to backend
    const handleAddToCart = async (event) => {
        event.stopPropagation(); // Prevent parent click events

        if (product && selectedSize && selectedColor) {
            const cartData = {
                userId: userID, // Static user ID (replace dynamically if needed)
                title: product.title,
                price: product.price,
                image: product.image,
                selectedSize: selectedSize,
                selectedColor: selectedColor,
                quantity: 1, // Default quantity set to 1
            };

            // Send the cart data to the backend and update the cart
            try {
                const response = await axios.post('http://localhost:1000/api/cart', cartData);
                if (response.data.cart) {
                    fetchCart(userID); // Fetch the updated cart after adding the item
                    alert('Product added to cart!');
                } else {
                    alert('Failed to add product to cart.');
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
                alert('Error adding product to cart.');
            }
        } else {
            alert('Please select size and color before adding to cart.');
        }
    };

    // Handle "Buy Now" and navigate to the cart page
    const handleBuyNow = async (event) => {
        event.stopPropagation(); // Prevent parent click events
        if (product && selectedSize && selectedColor) {
            // Prepare the order data according to the backend format  
            const orderData = {
                name: userName, // Replace with the actual user's name
                email: userEmail, // Replace with the actual user's email
                productId: product._id, // Ensure the product has _id
                size: selectedSize, // Add selected size if necessary
                color: selectedColor, 
            };

            // Send the order data to the backend
            try {
                console.log("Sending Buy Now request with the following data:", orderData); // Debugging
                const response = await axios.post('http://localhost:1000/api/buy', orderData);
                if (response.status === 200) {
                    alert('Order created successfully!');
                    navigate('/cart'); // Redirect to the cart page after placing the order
                } else {
                    alert('Failed to create order');
                }
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Error occurred while placing order');
            }
        } else {
            alert('Please select size and color before buying.');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-images">
                <img src={`http://localhost:1000/${product.image}`} alt={product.title} className="main-image" />
            </div>
            <div className="product-info">
                <h2 className="brand">{product.brand}</h2>
                <p className="product-name">{product.title}</p>
                <p className="product-description">{product.description}</p>

                <div className="pricing">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">MRP ₹{product.mrp}</span>
                </div>

                {/* Size selector */}
                <div className="size-selector">
                    <p>Select Size:</p>
                    <div className="sizes">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <button
                                key={size}
                                className={selectedSize === size ? 'selected' : ''}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color selector */}
                <div className="color-selector">
                    <p>Select Color:</p>
                    <div className="colors">
                        {['Red', 'Blue', 'Black', 'White'].map((color) => (
                            <button
                                key={color}
                                className={selectedColor === color ? 'selected' : ''}
                                onClick={() => handleColorSelect(color)}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="actions">
                    <button className="add-to-bag" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
