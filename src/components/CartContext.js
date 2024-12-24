import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Useridcontext } from './Useridcontext';

// Create a Cart Context to manage the user's cart state
const CartContext = createContext();

// Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { userID } = useContext(Useridcontext);

    // Fetch the cart items when the component mounts or userID changes
    useEffect(() => {
        if (userID) {
            fetchCart(userID);
        }
    }, [userID]);

    // Fetch cart items from backend
    const fetchCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:1000/api/cart/${userId}`);
            if (response.status === 200 && response.data.cart) {
                setCartItems(response.data.cart); // Update the cart items state
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Add item to cart (or update cart logic as needed)
    const addToCart = async (item) => {
        try {
            const response = await axios.post('http://localhost:1000/api/cart', {
                userId: userID,
                ...item,
            });
            if (response.status === 200 && response.data.cart) {
                setCartItems(response.data.cart); // Update the cart items state after adding an item
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, fetchCart , setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
