import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";  // Assuming CartProvider is correct
import { UserProvider } from './components/UserContext';  // Import UserProvider
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminOrders from "./components/AdminOrders";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import ProductDetail from "./components/ProductDetails";
import AdminDel from "./components/AdminDel";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import UserProfile from "./components/Userprofile";
import UserProduct from "./components/UserProduct";

function App() {
    // Filters state
    const [filters, setFilters] = useState({
        type: [],
        brands: [],
        priceRanges: []
    });

    // Handle filter change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <UserProvider> {/* Wrap your application with UserProvider */}
            <CartProvider> {/* Wrap your application with CartProvider */}
                <Router>
                    <div>
                        <Navbar /> {/* Your Navbar component with user context and cart */}

                        <Routes>
                            {/* Authentication Routes */}
                            <Route path="/AdminLogin" element={<AdminLogin />} />
                            <Route path="/SignUp" element={<SignUpPage />} />
                            <Route path="/signin" element={<LoginPage />} />
                            <Route path="/My Profile" element={<UserProfile />} />

                            {/* Admin Routes */}
                            <Route path="/Admin" element={<AdminAddProduct />} />
                            <Route path="/Admindel" element={<AdminDel />} />
                            <Route path="/userproduct" element={<UserProduct />} />


                            {/* Main Page */}
                            <Route path="/" element={<MainPage />} />
                            <Route path="/cart" element={<Cart />} />

                            {/* Category Routes */}
                            <Route path="/men" element={
                                <>
                                    <Filter onFilterChange={handleFilterChange} />
                                    <ProductList filters={filters} selectedCategory="men" />
                                </>
                            } />
                            <Route path="/women" element={
                                <>
                                    <Filter onFilterChange={handleFilterChange} />
                                    <ProductList filters={filters} selectedCategory="women" />
                                </>
                            } />
                            <Route path="/kids" element={
                                <>
                                    <Filter onFilterChange={handleFilterChange} />
                                    <ProductList filters={filters} selectedCategory="kids" />
                                </>
                            } />

                            {/* Product Detail Route */}
                            <Route path="/product/:id" element={<ProductDetail />} />

                            {/* Admin Orders Route */}
                            <Route path="/admin/orders" element={<AdminOrders />} />
                        </Routes>

                        <Footer /> {/* Your Footer component */}
                    </div>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
