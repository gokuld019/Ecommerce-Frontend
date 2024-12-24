import React, { useState } from 'react';
import Filter from './Filter';
import Product from './Product';
import productData from './productData'; // Assuming product data is imported from a JSON file or API

const Sidemenu = () => {
    const [filteredProducts, setFilteredProducts] = useState(productData);

    const handleFilter = (filters) => {
        const { categories, brands, priceRanges } = filters;

        const filtered = productData.filter(product => {
            const matchesCategory = categories.length === 0 || categories.includes(product.category);
            const matchesBrand = brands.length === 0 || brands.includes(product.brand);
            const matchesPriceRange =
                priceRanges.length === 0 ||
                priceRanges.some(range => product.price >= range.min && product.price <= range.max);

            return matchesCategory && matchesBrand && matchesPriceRange;
        });

        setFilteredProducts(filtered);
    };

    return (
        <div className="main-page">
            <Filter onFilter={handleFilter} />
            <div className="product-list">
                {filteredProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Sidemenu;