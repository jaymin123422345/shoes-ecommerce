import './styles/App.css';
import Navbar from './components/Navbar';
import {Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Shoes from './pages/Shoes';
import Accessories from './pages/Accessories';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import AdminProduct from './pages/Product';


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/adminProduct" element={<AdminProduct />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
