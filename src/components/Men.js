import React from "react";
import { Link } from "react-router-dom";

const Men = ({ category }) => {
    const Mencollections = {
        men: (
            
             <div className="dropdown-Men">
                    <div>
                    <h4>Topwear</h4>
                    
                    <Link to="/Tshirts">Tshirts</Link>
                    <br/>
                    <Link to="/Formal Shirts">Formal Shirts</Link>
                    <br/>
                    <Link to="/Sweat Shirts">Sweat Shirts</Link>
                    <br/>
                    <Link to="/Sweaters">Sweaters</Link>
                    <br/>
                    <Link to="/Jackets">Jackets</Link>
                    <br/>
                    <Link to="/Blazers">Blazers</Link>
                    <br/>
                    <Link to="/Suits">Suits</Link>
                    <br/>
                    <Link to="/Rain Jackets">Rain Jackets</Link>
                     
                
                    </div>

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

                    <div>
                    <h4>Foot wear</h4>   
                    <ul>
                   
                    </ul>
                    </div>



                    </div>

        )
    };

    return (
        <div className="dropdown-Men">
            { Mencollections[category] }
        </div>
    );
};



export default Men;