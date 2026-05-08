import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { createOrder } from '../../services/api';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, loading, emptyCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!user) { navigate('/login'); return; }
    setPlacing(true);
    setError('');
    try {
      const res = await createOrder(user.id);
      const orderId = res.data?.id || res.data?.orderId;
      await emptyCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading"><div className="spinner" /></div>
      </div>
    );
  }

  const items = cart?.items || [];
  const total = cart?.totalAmount || 0;
  const itemCount = cart?.totalItems || 0;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn btn-primary">Browse Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <span className="cart-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({itemCount} items)</span>
            <span>${Number(total).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="summary-free">Free</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${Number(total).toFixed(2)}</span>
          </div>

          {error && <div className="error-msg">{error}</div>}

          
          <div className="cart-actions-row">
  <Link to="/" className="cart-continue">
    ← Continue Shopping
  </Link>

  <button
    className="btn btn-primary btn-checkout"
    onClick={handleCheckout}
    disabled={placing}
  >
    {placing ? 'Placing Order…' : 'Place Order'}
  </button>
</div>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
