import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">

      {/* LEFT */}
      <div className="footer-left">
        <span className="footer-logo">Artisan Atelier</span>
        <p className="footer-tagline">Curated Luxury — thoughtfully chosen.</p>
      </div>

      {/* RIGHT */}
      <div className="footer-right">
        <nav className="footer-links">
          <Link to="/">Shop</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} Artisan Atelier. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;