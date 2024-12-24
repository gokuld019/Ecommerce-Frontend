import React from 'react';


const products = [
  { id: 1, name: 'Angry Hoodie', price: '999', discount: '50%', image: '/Assets/Rhoodie1.jpg' },
  { id: 2, name: 'Calm Hoodie', price: '999', discount: '50%', image: '/Assets/Rhoodie2.jpg' },
  { id: 3, name: 'Dream Hoodie', price: '999', discount: '50%', image: '/Assets/Rhoodie3.jpg' },
  { id: 4, name: 'Peace Hoodie', price: '999', discount: '50%', image: '/Assets/Rhoodie4.jpg' },
  { id: 5, name: 'Smile Hoodie', price: '999', discount: '50%', image: '/Assets/Rhoodie5.jpg' },
];

const RecommendedProducts = () => {
  return (
    <div className="recommended-container">
      <h2>More items you may like in apparel</h2>
      <div className="recommended-products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="product-price">
              <span className="discount">{product.discount}</span> ₹{product.price}
            </p>
            <p>FREE Delivery by Amazon</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;