import React from "react";

const Header = () => {
    return (
        <div className="Header">
            <h1>T-shirt Shop</h1>
            <div className="search-container">
                <input type="text" placeholder="search" name="search" />
                <button type="submit">Submit</button>
                <div className="cart-icon">
                    <i className="fa fa-shopping-cart"></i> 
                </div>
            </div> 
        </div>
    );
};

export default Header;
