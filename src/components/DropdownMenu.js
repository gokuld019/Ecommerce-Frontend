import React from "react";

const DropdownMenu = ({ category }) => {
    const menuContent = {
        men: (
            
            <div className="dropdown-menu">
            <div className="dropdown-column">
                <h4>Topwear</h4>
                <ul>
                    <li><a href="#Tshirts">Tshirts</a></li>
                    <li><a href="#shirts">Shirts</a></li>
                    <li><a href="#Formal Shirts">Formal Shirts</a></li>
                    <li><a href="#Sweat Shirts">Sweat Shirts</a></li>
                    <li><a href="#Sweaters">Sweaters</a></li>
                    <li><a href="#Jackets">Jackets</a></li>
                    <li><a href="#Blazers">Blazers</a></li>
                    <li><a href="#Suits">Suits</a></li>
                    <li><a href="#Rain Jackets">Rain Jackets</a></li>
                </ul>
            </div>
            <div className="dropdown-column">
                <h4>Bottom wear</h4>
                <ul>
                    <li><a href="#Jeans">Jeans</a></li>
                    <li><a href="#Casual Trousers">Casual Trousers</a></li>
                    <li><a href="#Formal Trousers">Formal Trousers</a></li>
                    <li><a href="#Shorts">Shorts</a></li>
                    <li><a href="#Track Pants">Track Pants</a></li>
                </ul>
            </div>
            <div className="dropdown-column">
                <h4>Footwear</h4>
                <ul>
                       <div>
                    <h4>Bottom wear</h4>   
                    <ul>
                    <li><a href="#Jeans">Jeans</a></li>
                    <li><a href="#Casual Trousers">Casual Trousers</a></li>
                    <li><a href="#Formal Trousers">Formal Trousers</a></li>
                    <li><a href="#Shorts">Shorts</a></li>
                    <li><a href="#Track Pants">Track Pants</a></li>
                    </ul>
                    </div>

                </ul>
            </div>
            <div className="dropdown-column">
                <h4>Festive wear</h4>
                <ul>
                    <li><a href="#Kurtas & Kurta Sets">Kurtas & Kurta Sets</a></li>
                    <li><a href="#Sherwanis">Sherwanis</a></li>
                    <li><a href="#Dhotis">Dhotis</a></li>
                </ul>
            </div>
            <div className="dropdown-column">
                <h4>Sportswear</h4>
                <ul>
                    <li><a href="#Sports Shoes">Sports Shoes</a></li>
                    <li><a href="#Active Tshirts">Active Tshirts</a></li>
                    <li><a href="#Track Pants & Shorts">Track Pants & Shorts</a></li>
                    <li><a href="#Tracksuits">Tracksuits</a></li>
                    <li><a href="#Sports Accessories">Sports Accessories</a></li>
                    <li><a href="#Swimwear">Swimwear</a></li>
                </ul>
            </div>
             </div>

        ),

        women: (
            <>
                <div className="dropdown-column">
                    <h4>Dresses</h4>
                    <ul>
                        <li><a href="#Casual Dresses">Casual Dresses</a></li>
                        <li><a href="#Evening Gowns">Evening Gowns</a></li>
                        <li><a href="#Work Wear">Work Wear</a></li>
                    </ul>
                </div>
            </>
        ),
        kids: (
            <>
                <div className="dropdown-column">
                    <h4>Kids Wear</h4>
                    <ul>
                        <li><a href="#Tshirts">Tshirts</a></li>
                        <li><a href="#Shorts">Shorts</a></li>
                        <li><a href="#Trousers">Trousers</a></li>
                    </ul>
                </div>
            </>
        ),
    };

    return (
        <div className="dropdown-menu">
            { menuContent[category] }
        </div>
    );
};

export default DropdownMenu;
