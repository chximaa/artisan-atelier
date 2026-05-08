import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Order not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="error-container">
        <h2>Order Not Found</h2>
        <p>The order you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/orders')} className="btn btn-primary">
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          
          <div className="order-details">
            <div className="detail-row">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">#{order.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">
                {new Date(order.orderDate).toLocaleString()}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value status">{order.status}</span>
            </div>
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {order.items.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.productName}</span>
                    <span className="item-quantity">x {item.quantity}</span>
                  </div>
                  <div className="item-price">${item.subtotal.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total Amount:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
            <button onClick={() => navigate('/orders')} className="btn btn-secondary">
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;