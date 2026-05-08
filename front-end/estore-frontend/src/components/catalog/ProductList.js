import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { getProducts, searchProducts, getProductsByCategory } from '../../services/api';
import './ProductList.css';
import { useLocation } from 'react-router-dom';

function SkeletonGrid() {
  return (
    <div className="products-loading">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="skeleton-img shimmer" />
          <div className="skeleton-body">
            <div className="skel-line short shimmer" />
            <div className="skel-line long shimmer" />
            <div className="skel-line med shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

function sortProducts(products, sort) {
  const arr = [...products];
  switch (sort) {
    case 'price_asc': return arr.sort((a, b) => a.price - b.price);
    case 'price_desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating': return arr.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    default: return arr;
  }
}

const ProductList = () => {
  const location = useLocation(); // ✅ FIX

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedCatName, setSelectedCatName] = useState('');
  const [sort, setSort] = useState('default');

  // ✅ READ SEARCH FROM URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setActiveSearch(q);
    setSelectedCat(null);
  }, [location.search]);

  // ✅ FETCH DATA
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let res;

      if (activeSearch?.trim()) {
        res = await searchProducts(activeSearch.trim());
      } else if (selectedCat) {
        res = await getProductsByCategory(selectedCat);
      } else {
        res = await getProducts();
      }

      setProducts(res.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [activeSearch, selectedCat]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategorySelect = (id, name) => {
    setSelectedCat(id);
    setSelectedCatName(name || '');
    setActiveSearch('');
  };

  const clearSearch = () => {
    setActiveSearch('');
  };

  const clearCategory = () => {
    setSelectedCat(null);
    setSelectedCatName('');
  };

  const sorted = sortProducts(products, sort);

  return (
    <div className="products-page">

      {/* HERO */}
      <div className="products-hero">
        <div className="products-hero-top">
          <h1 className="products-title">
            {selectedCatName || activeSearch ? (
              activeSearch ? `Results for "${activeSearch}"` : selectedCatName
            ) : 'Our Collection'}
          </h1>

          {!loading && (
            <span className="products-count">
              {sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}
            </span>
          )}
        </div>

        {!selectedCatName && !activeSearch && (
          <p className="products-subtitle">
            Thoughtfully curated — each piece chosen with care.
          </p>
        )}
      </div>

      {/* TOOLBAR */}
      <div className="products-toolbar">
        <div className="toolbar-left">
          {activeSearch && (
            <span className="filter-pill">
              🔍 {activeSearch}
              <button className="filter-pill-remove" onClick={clearSearch}>×</button>
            </span>
          )}

          {selectedCatName && (
            <span className="filter-pill">
              {selectedCatName}
              <button className="filter-pill-remove" onClick={clearCategory}>×</button>
            </span>
          )}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* LAYOUT */}
      <div className="products-layout">
        <CategoryFilter onCategorySelect={handleCategorySelect} />

        <section className="products-area">
          {loading ? (
            <SkeletonGrid />
          ) : sorted.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🧺</div>
              <h3>Nothing found</h3>
              <p>We couldn't find any products matching your selection.</p>
              <button className="btn btn-outline" onClick={clearCategory}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {sorted.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

    </div>
  );
};

export default ProductList;