import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
    const [selectedtype, setSelectedType] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

    // Update filters whenever selections change
    useEffect(() => {
        onFilterChange({
            type: selectedtype,
            brand: selectedBrands,
            priceRanges: selectedPriceRanges,
        });
    }, [selectedtype, selectedBrands, selectedPriceRanges]);

    const handleCheckboxChange = (event, setSelectedFunction) => {
        const value = event.target.value;
        setSelectedFunction((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    return (
        <div className="filters">
            <h2>Filters</h2>
            <div className="filter-section">
                <h3>Dress type</h3>
                {["Bodycon Dress", "Wrap Dress", "asymmetrical Dress", "Staright Dress" , "Shirt" , "sweatshirts" ].map((type) => (
                    <label key={type}>
                        <input
                            type="checkbox"
                            value={type}
                            checked={selectedtype.includes(type)}
                            onChange={(e) => handleCheckboxChange(e, setSelectedType)}
                        />
                        {type}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <h3>Brands</h3>
                {["LOV", "Wardrobe", "Nuon", "Colebrook"].map((brand) => (
                    <label key={brand}>
                        <input
                            type="checkbox"
                            value={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => handleCheckboxChange(e, setSelectedBrands)}
                        />
                        {brand}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <h3>Price Range</h3>
                {["0-500", "500-1000", "1000-1500", "1500-2000"].map((range) => (
                    <label key={range}>
                        <input
                            type="checkbox"
                            value={range}
                            checked={selectedPriceRanges.includes(range)}
                            onChange={(e) => handleCheckboxChange(e, setSelectedPriceRanges)}
                        />
                        {range}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
