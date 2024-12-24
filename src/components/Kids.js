import React from "react";

const Kids = ({ category }) => {
    const kidscollections = {
        kids: (
            
            <div className="dropdown-Kids">
                    <h4>Kids Wear</h4>
                    <ul>
                        <li><a href="#Tshirts">Tshirts</a></li>
                        <li><a href="#Shorts">Shorts</a></li>
                        <li><a href="#Trousers">Trousers</a></li>
                    </ul>
                </div>

        )
    };

    return (
        <div className="dropdown-menu">
            { kidscollections[category] }
        </div>
    );
};



export default Kids;