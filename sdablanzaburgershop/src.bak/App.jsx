import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation';
import Payment from './pages/Payment';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-layout">
            <Sidebar />
            <main>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
