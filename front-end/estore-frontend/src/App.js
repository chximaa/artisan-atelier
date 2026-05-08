import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/catalog/ProductList';
import ProductDetail from './components/catalog/ProductDetail';
import Cart from './components/cart/Cart';
import OrderHistory from './components/orders/OrderHistory';
import OrderConfirmation from './components/orders/OrderConfirmation';
import Wishlist from './components/wishlist/Wishlist';
  import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="page-loading">
      <div className="spinner" />
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                              element={<ProductList />} />
      <Route path="/products"                      element={<ProductList />} />
      <Route path="/products/:id"                  element={<ProductDetail />} />
      <Route path="/login"                         element={<Login />} />
      <Route path="/register"                      element={<Register />} />
      <Route path="/cart"                          element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/orders"                        element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
      <Route path="/order-confirmation/:orderId"   element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
      <Route path="/wishlist"                      element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />    
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="app">
              <Header />
              <main className="main-content">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;