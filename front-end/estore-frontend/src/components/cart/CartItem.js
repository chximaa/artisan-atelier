import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();

  // ✅ Correct fields from backend
  const price = Number(item.unitPrice) || 0;
  const total = Number(item.subtotal) || price * item.quantity;
  const imgSrc = item.productImage;

  return (
    <div className="cart-item">
      <img
        className="cart-item-img"
        src={imgSrc}
        alt={item.productName}
      />

      <div className="cart-item-info">
        <p className="cart-item-name">{item.productName}</p>
        <p className="cart-item-price">
          ${price.toFixed(2)} each
        </p>
      </div>

      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={() => updateItem(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>

        <span className="qty-value">{item.quantity}</span>

        <button
          className="qty-btn"
          onClick={() => updateItem(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <p className="cart-item-total">
        ${total.toFixed(2)}
      </p>

      <button
        className="cart-item-remove"
        onClick={() => removeItem(item.id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;