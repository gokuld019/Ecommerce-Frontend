import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import banner1 from '../Assets/banners1.png';
import banner2 from '../Assets/banner3.png';
import pc1 from '../Assets/hoodie11.jpg';
import pc2 from '../Assets/jean1.jpg';
import pc3 from '../Assets/shirt3.jpg';
import bf1 from '../Assets/dealbanner.jpg';
import bf from '../Assets/modelbanner.webp';

import wb from '../Assets/mainbanner1.webp';
import wb1 from '../Assets/mainbanner2.webp';
import wb2 from '../Assets/mainbanner4.webp';

import mb from '../Assets/manbanner1.webp';
import mb1 from '../Assets/manbanner2.webp';
import mb2 from '../Assets/manbanner3.webp';

import kb1 from '../Assets/kidbanner11.webp';
import kb2 from '../Assets/kidbanner12.webp';

import fw1 from '../Assets/footwear.webp';
import fw2 from '../Assets/footwear1.webp';
import './MainPage.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Import arrow icons

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <FaArrowLeft size={30} color="white" />
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick} >
      <FaArrowRight size={30} color="white" />
    </div>
  );
};

const MainPage = ({ userId }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,  // Set custom previous arrow
    nextArrow: <NextArrow />,  // Set custom next arrow
  };

  const categories = [
    {
      image: pc1,
      title: "Hoodies",
      category: "hoodies",
    },
    {
      image: pc2,
      title: "Jeans",
      category: "jeans",
    },
    {
      image: pc3,
      title: "Shirts",
      category: "shirts",
    },
  ];

  const [popularProducts, setPopularProducts] = useState([]);
  const navigate = useNavigate();  // useNavigate hook for navigation

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/product/MostPurchasedProducts`);
        setPopularProducts(response.data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  const handleProductClick = (category) => {
    navigate(`men?category=men`); 
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); // Navigates to the category page
  };

  const handleBannerClick = (category, sliderIndex) => {
    // If it's the first slider (index 0), navigate to the "women" page
    if (sliderIndex === 0) {
      navigate(`/women?category=women`); // Navigates to women page
    } 

    if (sliderIndex === 1) {
      navigate(`/women?category=women`); // Navigates to women page
    }
  };


  return (
    <div className="carousel-container">
    {/* Slider for the banners */}
    <Slider {...settings}>
      <div onClick={() => handleBannerClick('women', 0)}>
        <img src={wb} alt="Banner 1" className="carousel-image" />
      </div>
        <div  onClick={() => handleBannerClick('women', 0)}>
          <img src={wb1} alt="Banner 1" className="carousel-image" />
        </div>
        <div>
          <img src={wb2} alt="Banner 2" className="carousel-image" />
        </div>
      </Slider>

      <Slider {...settings}>
      <div>
          <img src={mb} alt="Banner 1" className="carousel-image" />
        </div>
        <div>
          <img src={mb1} alt="Banner 1" className="carousel-image" />
        </div>
        <div>
          <img src={mb2} alt="Banner 2" className="carousel-image" />
        </div>
      </Slider>

      <Slider {...settings}>
      <div>
          <img src={kb1} alt="Banner 1" className="carousel-image" />
        </div>
        <div>
          <img src={kb2} alt="Banner 1" className="carousel-image" />
        </div>
      </Slider>

      <Slider {...settings}>
      <div>
          <img src={fw1} alt="Banner 1" className="carousel-image" />
        </div>
        <div>
          <img src={fw2} alt="Banner 1" className="carousel-image" />
        </div>
      </Slider>

     



      <div className="shop-by-category">
        <h2>Shop By Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <img
                src={category.image}
                alt={category.title}
                className="img"
                onClick={() => handleProductClick(category.men)}  
              />
              <div className="category-info">
                <h3>{category.title}</h3>
                
              </div>
            </div>
          ))}
        </div>
      </div>

     
      

      <div className="category-header">
        <h1>Most Popular Products</h1>
      </div>

      <div className="category-section">
        {popularProducts.map(product => (
          <div className='section-card' key={product._id}>
            <img
              src={`http://localhost:1000/${product.image}`}
              className="img"
              alt={product.title}
              onClick={() => navigate(`/product/${product._id}`)}  // Click on product image navigates to the "Men" page
            />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
