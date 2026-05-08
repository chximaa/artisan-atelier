import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import './CategoryFilter.css';

/* Category emoji map */
const CATEGORY_ICONS = {
  default:     '🏷️',
  electronics: '⚡',
  clothing:    '👗',
  accessories: '💎',
  beauty:      '🌸',
  home:        '🏡',
  sports:      '🏋️',
  books:       '📚',
  toys:        '🎮',
  food:        '🍃',
  shoes:       '👟',
  watches:     '⌚',
  bags:        '👜',
  kitchenware: '🔪',
  all:         '✦',
};

function getCatIcon(name = '') {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return val;
  }
  return CATEGORY_ICONS.default;
}

const CategoryFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch {
        /* silently degrade */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const select = (id) => {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    onCategorySelect?.(next);
  };

  return (
    <aside className="category-sidebar">
      <p className="sidebar-heading">Collections</p>

      {loading ? (
        <div className="cat-skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="cat-skel-row shimmer" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      ) : (
        <ul className="category-list">
          {/* All */}
          <li
            className={`category-item${selectedId === null ? ' active' : ''}`}
            onClick={() => select(null)}
          >
            <div className="cat-icon">{CATEGORY_ICONS.all}</div>
            <span className="cat-label">All Products</span>
          </li>

          {categories.map(cat => (
            <li
              key={cat.id}
              className={`category-item${selectedId === cat.id ? ' active' : ''}`}
              onClick={() => select(cat.id)}
            >
              <div className="cat-icon">{getCatIcon(cat.name)}</div>
              <span className="cat-label">{cat.name}</span>
            </li>
          ))}
        </ul>
      )}
      

      {/* Price Range Visual */}
      <div className="sidebar-section">
        <span className="sidebar-section-title">Price Range</span>
        <div className="price-slider-wrap">
          <div className="price-track">
            <div className="price-fill" />
          </div>
          <div className="price-labels">
            <span>$0</span>
            <span>$1 000+</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategoryFilter;