import React from "react";


const ProductCard = ({product , onAddToCart }) => {
    return(
        <div className="product-card">
            <img src = {product.image} alt = {product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart (product)}>Add to cart</button>
        </div>
    );
};

export default ProductCard;