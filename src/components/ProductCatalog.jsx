import React, { useMemo, useRef, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { matchesProductSearch } from '../utils/search';

export const ProductCatalog = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeColorFilter,
    setActiveColorFilter,
    searchQuery,
    wishlist
  } = useCart();

  const tabsContainerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isFading, setIsFading] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'churidars', label: 'Churidars' },
    { id: 'menswear', label: 'Menswear' },
    { id: 'kidswear', label: 'Kids Wear' },
    { id: 'girlswear', label: 'Girls Wear' },
    { id: 'family-sets', label: 'Family Sets' },
  ];

  // Map any subcategory slugs (e.g. ladieswear, anarkali-sets, palazzo-suits) to their parent tab
  const activeTabId = useMemo(() => {
    if (activeCategory === 'ladieswear' || activeCategory === 'anarkali-sets' || activeCategory === 'palazzo-suits') {
      return 'churidars';
    }
    return activeCategory || 'all';
  }, [activeCategory]);

  // Apple Camera-inspired smooth pill indicator transition
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector(`.catalog-tab-btn[data-id="${activeTabId}"]`);
      if (activeBtn) {
        const containerRect = tabsContainerRef.current.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: btnRect.left - containerRect.left,
          width: btnRect.width,
          opacity: 1
        });
      }
    }
  }, [activeTabId]);

  // Ensure all cards in the catalog immediately reveal and show their images on tab/category changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        const cards = catalogEl.querySelectorAll('.premium-scroll-card');
        cards.forEach((card) => {
          card.classList.add('scroll-in-view');
        });
      }
    }, 70);
    return () => clearTimeout(timer);
  }, [activeCategory, activeColorFilter]);

  const handleTabChange = (tabId) => {
    setIsFading(true);
    setActiveCategory(tabId);
    setTimeout(() => {
      setIsFading(false);
    }, 60);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category / Department tab filter
      if (activeCategory && activeCategory !== 'all') {
        const cat = activeCategory.toLowerCase();
        if (cat === 'churidars') {
          if (product.department !== 'churidars') return false;
        } else if (cat === 'anarkali-sets') {
          if (product.id !== 'jyr-ch02' && product.id !== 'jyr-ch01' && !product.name.toLowerCase().includes('anarkali')) return false;
        } else if (cat === 'palazzo-suits') {
          if (product.id !== 'jyr-ch04' && product.id !== 'jyr-k01-coral' && !product.name.toLowerCase().includes('kurti')) return false;
        } else if (cat === 'ladieswear') {
          if (product.id !== 'jyr-ch03' && product.category !== 'ladieswear' && !product.name.toLowerCase().includes('coord') && !product.name.toLowerCase().includes('kurti')) return false;
        } else if (product.category !== activeCategory && product.department !== activeCategory) {
          return false;
        }
      }

      // Color filter
      if (activeColorFilter !== 'All Colors' && product.colorName !== activeColorFilter) {
        return false;
      }

      // Search Query filter using unified search matcher
      if (searchQuery && !matchesProductSearch(product, searchQuery)) {
        return false;
      }

      return true;
    });
  }, [activeCategory, activeColorFilter, searchQuery]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="section-container">
        
        {/* Section Header with border below Best Sellers */}
        <div className="section-header-center header-with-bottom-border">
          <h2 className="section-heading-serif">Best Sellers</h2>
          <div className="bestsellers-title-border" />
          <p className="bestsellers-quote-italic">
            "Elegance is an heirloom — woven with passion, crafted for every celebration."
          </p>
        </div>

        {/* Filter Navigation Tabs - Apple Camera Inspired Smooth Segmented Switcher */}
        <div className="catalog-filter-bar">
          <div className="apple-camera-tabs-track" ref={tabsContainerRef}>
            {/* Smooth gliding sliding indicator pill */}
            <div 
              className="apple-camera-indicator-pill" 
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }} 
            />

            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                data-id={tab.id}
                className={`catalog-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Filter Indicators with Minimal Reset All */}
          {(activeColorFilter !== 'All Colors' || activeCategory !== 'all') && (
            <div className="active-filter-chips">
              <span className="filters-label">
                <SlidersHorizontal size={13} /> Active:
              </span>
              {activeColorFilter !== 'All Colors' && (
                <button 
                  className="filter-chip"
                  onClick={() => {
                    setIsFading(true);
                    setActiveColorFilter('All Colors');
                    setTimeout(() => setIsFading(false), 60);
                  }}
                >
                  Color: {activeColorFilter} <X size={12} />
                </button>
              )}
              {activeCategory !== 'all' && (
                <button 
                  className="filter-chip"
                  onClick={() => handleTabChange('all')}
                >
                  Category: {filterTabs.find(t => t.id === activeCategory)?.label || filterTabs.find(t => t.id === activeTabId)?.label || activeCategory} <X size={12} />
                </button>
              )}
              <button 
                className="minimal-reset-btn"
                onClick={() => {
                  setIsFading(true);
                  setActiveColorFilter('All Colors');
                  setActiveCategory('all');
                  setTimeout(() => setIsFading(false), 60);
                }}
                title="Reset all active filters"
              >
                <RotateCcw size={11} className="minimal-reset-icon" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid with 1s Smooth Fade-in */}
        {filteredProducts.length > 0 ? (
          <div className={`products-responsive-grid ${isFading ? 'grid-fade-active' : 'grid-fade-done'}`}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <p className="empty-title">No drapes found matching your current filter.</p>
            <p className="empty-sub">Try selecting another color or reset your category filters.</p>
            <button 
              className="btn-gold-outline"
              onClick={() => {
                setActiveColorFilter('All Colors');
                setActiveCategory('all');
              }}
            >
              View All Drapes
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
