import React from 'react';
import { useWishlist } from '../../contexts/WishlistContext';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, toggle } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty</h2>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist ({wishlist.length})</h2>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id || product._id} className="wishlist-card">
            <img src={product.imageUrl} alt={product.name} />

            <h4>{product.name}</h4>
            <p className="wishlist-price">${product.price}</p>

            <div className="wishlist-actions">
              <Link
                className="wishlist-link"
                to={`/products/${product.id || product._id}`}
              >
                View
              </Link>

              <button
                onClick={() => toggle(product)}
                className="wishlist-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;