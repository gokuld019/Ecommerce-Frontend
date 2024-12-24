import React, { useContext } from 'react';
import { useCart } from './CartContext';
import { Useridcontext } from './Useridcontext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, setCartItems,fetchCart } = useCart();
  const { userID } = useContext(Useridcontext);

  // Handle increment (increase the quantity of a specific product)
  const handleIncrement = async (item) => {
       try {
      await axios.post('http://localhost:1000/api/cart/increment', {
        userId : userID,
        title: item.title,
      });
      fetchCart(userID)
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  // Handle decrement (decrease the quantity of a specific product)
  const handleDecrement = async (item) => {
    try {
      await axios.post('http://localhost:1000/api/cart/decrement', {
        userId:userID,
        title:item.title,
      });
      fetchCart(userID)
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  // Handle remove product from cart
  const handleRemove = async (item) => {
    try {
        // Use DELETE method, not POST
        await axios.delete('http://localhost:1000/api/cart/delete', { 
            data: {  // Use `data` instead of `body` for DELETE method in axios
                userId: userID,
                title: item.title,
            }
        });
        fetchCart(userID); // Fetch updated cart
    } catch (err) {
        console.error('Error removing product:', err);
    }
};

  // Calculate the total price dynamically
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h3>Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.productId}>
                <img src={`http://localhost:1000/${item.image}`} alt={item.title} className="main-image" />
              <h4>{item.title}</h4>
              <p>Price: Rs {item.price}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}
          <h4>Total Price: Rs {totalPrice}</h4>
          <button>Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
