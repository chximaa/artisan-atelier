import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import './ProductCard.css';

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

function StarRow({ rating = 0, count = 0 }) {
  const full = Math.floor(rating);
  return (
    <div className="card-stars">
      <div className="stars-row">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`star${i >= full ? ' empty' : ''}`}>★</span>
        ))}
      </div>
      {count > 0 && <span className="card-review-count">({count})</span>}
    </div>
  );
}

const ProductCard = ({ product, style }) => {
  const navigate = useNavigate();
  const { toggle, isWished } = useWishlist();
  const { addItem } = useCart();
  const { user } = useAuth();

  const wished = isWished(product.id);
  const inStock = product.availableQuantity > 0;

  const handleWish = (e) => {
    e.stopPropagation();
    toggle(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    if (inStock) addItem(product.id, 1);
  };

  const imgSrc = product.imageUrl ||
    `https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=500&fit=crop&auto=format`;

  return (
    <div
      className="product-card"
      style={style}
      onClick={() => navigate(`/products/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="card-image-wrap">
        <img src={imgSrc} alt={product.name} loading="lazy" />

        {/* Category pill */}
        {product.categoryName && (
          <span className="card-category-pill">{product.categoryName}</span>
        )}

        {/* Wishlist */}
        <button
          className={`card-wish-btn${wished ? ' wished' : ''}`}
          onClick={handleWish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wished} />
        </button>

        {/* Out of stock */}
        {!inStock && (
          <div className="card-oos-overlay">
            <span className="card-oos-badge">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        {product.averageRating > 0 && (
          <StarRow rating={product.averageRating} count={product.reviewCount} />
        )}

        <h3 className="card-name">{product.name}</h3>

        <div className="card-price-row">
          <span className="card-price">${Number(product.price).toFixed(2)}</span>
          {inStock && (
            <button
              className="card-add-btn"
              onClick={handleAddToCart}
              aria-label="Quick add to cart"
            >
              <PlusIcon />
            </button>
          )}
        </div>

        <div className="card-stock">
          <span className={`stock-dot${!inStock ? ' oos' : ''}`} />
          <span className={`stock-text${!inStock ? ' oos' : ''}`}>
            {inStock ? `${product.availableQuantity} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;