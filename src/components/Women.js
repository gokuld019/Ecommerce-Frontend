import React from "react";

const Women = ({ category }) => {
    const womencollections = {
        women: (
            
             <div className="dropdown-women">
                    <h4>Dresses</h4>
                    <ul>
                        <li><a href="#Casual Dresses">Casual Dresses</a></li>
                        <li><a href="#Evening Gowns">Evening Gowns</a></li>
                        <li><a href="#Work Wear">Work Wear</a></li>
                    </ul>
                </div>

        )
    };

    return (
        <div className="dropdown-menu">
            { womencollections[category] }
        </div>
    );
};



export default Women;