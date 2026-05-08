import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { getProductById } from '../../services/api';
import '../catalog/ProductDetail.css';

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  const { user } = useAuth();
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback({ type: '', msg: '' }), 3200);
  };

  const handleAddToCart = async (goCart = false) => {
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    const res = await addItem(product.id, quantity);
    setAdding(false);
    if (res.success) {
      if (goCart) navigate('/cart');
      else showFeedback('success', 'Added to your cart ✓');
    } else {
      showFeedback('error', res.error || 'Could not add to cart');
    }
  };

  const wished = product ? isWished(product.id) : false;

  if (loading) return (
    <div className="detail-page">
      <div className="detail-loading">
        <div className="spinner" />
      </div>
    </div>
  );

  if (!product) return (
    <div className="detail-page">
      <div className="detail-error">
        <span style={{ fontSize: 48 }}>🔍</span>
        <h2>Product not found</h2>
        <p>This piece may no longer be available.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Collection</button>
      </div>
    </div>
  );

  const inStock = product.availableQuantity > 0;
  const imgSrc  = product.imageUrl || `https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=1000&fit=crop&auto=format`;

  return (
    <div className="detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-images">
          <img className="detail-main-img" src={imgSrc} alt={product.name} />
        </div>

        {/* Info */}
        <div className="detail-info">
          {product.categoryName && (
            <span className="detail-category">{product.categoryName}</span>
          )}

          <h1 className="detail-name">{product.name}</h1>

          {product.averageRating > 0 && (
            <div className="detail-rating">
              <div className="detail-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`detail-star${i >= Math.floor(product.averageRating) ? ' empty' : ''}`}>★</span>
                ))}
              </div>
              <span className="detail-rating-text">
                {product.averageRating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>
          )}

          <div className="detail-price">${Number(product.price).toFixed(2)}</div>

          <div className="detail-divider" />

          {product.description && (
            <>
              <p className="detail-desc-label">About</p>
              <p className="detail-desc">{product.description}</p>
            </>
          )}

          {/* Stock */}
          <div className={`detail-stock${!inStock ? ' oos' : ''}`}>
            <div className={`stock-indicator${!inStock ? ' oos' : ''}`} />
            {inStock ? `${product.availableQuantity} available` : 'Out of stock'}
          </div>

          {inStock && (
            <>
              <span className="qty-label">Quantity</span>
              <div className="qty-row">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.availableQuantity, q + 1))} disabled={quantity >= product.availableQuantity}>+</button>
              </div>

              {feedback.msg && (
                <div className={feedback.type === 'success' ? 'success-msg' : 'error-msg'}>
                  {feedback.msg}
                </div>
              )}

              <div className="detail-actions">
                <div className="action-row">
                  <button
                    className="btn btn-outline"
                    onClick={() => toggle(product)}
                    style={{ gap: 8 }}
                  >
                    <HeartIcon filled={wished} />
                    {wished ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(false)}
                    disabled={adding}
                  >
                    {adding ? 'Adding…' : 'Add to Cart'}
                  </button>
                </div>
                <button
                  className="btn btn-honey"
                  onClick={() => handleAddToCart(true)}
                  disabled={adding}
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;