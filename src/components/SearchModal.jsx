import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { matchesProductSearch } from '../utils/search';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, formatPrice } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  useEscapeKey(() => setIsSearchOpen(false), isSearchOpen);

  if (!isSearchOpen) return null;

  const results = searchTerm.trim() === '' ? [] : PRODUCTS.filter((item) => matchesProductSearch(item, searchTerm));

  const popularSearches = ['Crimson Silk', 'Banarasi Kadwa', 'Tissue Organza', 'Pure Gold Zari', 'Bridal Red'];

  return (
    <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="search-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-input-header">
          <Search size={22} className="search-bar-icon" />
          <input 
            type="text" 
            placeholder="Search by weave, fabric, color, or collection..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-main-input"
            autoFocus
          />
          <button 
            className="search-close-x-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="search-suggestions-row">
          <span className="sugg-label">Trending:</span>
          {popularSearches.map((term) => (
            <button 
              key={term} 
              className="sugg-chip"
              onClick={() => setSearchTerm(term)}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="search-results-list">
          {searchTerm.trim() !== '' && results.length > 0 && (
            <div className="results-grid">
              {results.map((product) => (
                <div 
                  key={product.id} 
                  className="search-item-row"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuickViewProduct(product);
                  }}
                >
                  <img src={product.image} alt={product.name} className="search-thumb" />
                  <div className="search-meta">
                    <h5 className="search-product-name">{product.name}</h5>
                    <span className="search-product-sub">{product.fabric} • {product.colorName}</span>
                    <span className="search-product-price">{formatPrice(product.priceINR)}</span>
                  </div>
                  <ArrowRight size={16} className="search-arrow" />
                </div>
              ))}
            </div>
          )}

          {searchTerm.trim() !== '' && results.length === 0 && (
            <div className="search-no-results">
              <p>No drapes matched "{searchTerm}". Try "Kanjivaram" or "Banarasi".</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
