import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, Ruler, Move3d, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { StarRating } from './common/StarRating';
import { formatDiscountBadge } from '../utils/pricing';
import { scrollToSection } from '../utils/navigation';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice
  } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.image);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : 'Standard');
      const firstOpt = quickViewProduct.customOptions ? quickViewProduct.customOptions[0].label : 'Standard (Included)';
      setSelectedOption(firstOpt);
      setQuantity(1);
      setShowSizeGuide(false);
    }
  }, [quickViewProduct]);

  useEscapeKey(() => setQuickViewProduct(null), Boolean(quickViewProduct));

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const displayImage = selectedImage || quickViewProduct.image;

  const currentOptions = quickViewProduct.customOptions || [
    { label: 'Standard Stitched (Included)', surcharge: 0 },
    { label: 'Custom Tailored to Fit', surcharge: 699 }
  ];

  const currentOptObj = currentOptions.find(o => o.label === selectedOption) || currentOptions[0] || { surcharge: 0 };
  const unitPrice = quickViewProduct.priceINR + (currentOptObj.surcharge || 0);

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      option: selectedOption,
      quantity,
      surcharge: currentOptObj.surcharge || 0,
      size: selectedSize
    });
    setQuickViewProduct(null);
  };

  const isMens = quickViewProduct.department === 'menswear';
  const isKids = quickViewProduct.department === 'kidswear';
  const isFamily = quickViewProduct.department === 'family-sets';

  const optionHeading = isMens 
    ? 'Select Styling & Churidar Option:' 
    : isKids 
      ? 'Select Fit & Comfort Option:' 
      : isFamily 
        ? 'Select Family Ensemble Customization:' 
        : 'Select Stitching & Blouse Option:';

  return (
    <div className="quick-view-overlay" onClick={() => setQuickViewProduct(null)}>
      <div 
        className="quick-view-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="dialog-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close Preview"
        >
          <X size={20} />
        </button>

        <div className="dialog-body-layout">
          
          {/* Gallery Media Column */}
          <div className="dialog-media-column">
            <div className="dialog-main-image-wrap">
              <img src={displayImage} alt={quickViewProduct.name} className="dialog-featured-img" />
              {quickViewProduct.badge && (
                <span className="dialog-badge-tag">{quickViewProduct.badge}</span>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="dialog-thumbnails-row">
              <button 
                type="button" 
                className={`thumb-box ${displayImage === quickViewProduct.image ? 'active' : ''}`}
                onClick={() => setSelectedImage(quickViewProduct.image)}
              >
                <img src={quickViewProduct.image} alt="Front View" />
              </button>
              {quickViewProduct.hoverImage && (
                <button 
                  type="button" 
                  className={`thumb-box ${displayImage === quickViewProduct.hoverImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(quickViewProduct.hoverImage)}
                >
                  <img src={quickViewProduct.hoverImage} alt="Editorial View" />
                </button>
              )}
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="dialog-info-column">
            
            <div className="dialog-department-badge">
              <span>{quickViewProduct.department ? quickViewProduct.department.toUpperCase() : 'ROYAL ATELIER'}</span>
            </div>

            <h2 className="dialog-product-title">{quickViewProduct.name}</h2>
            {quickViewProduct.fabric && (
              <p className="dialog-fabric-subtitle" style={{ color: 'var(--jyren-gold)', fontSize: '0.84rem', fontWeight: 600, letterSpacing: '0.04em', margin: '2px 0 6px 0' }}>
                {quickViewProduct.fabric}
              </p>
            )}

            <div className="dialog-rating-strip">
              <StarRating rating={quickViewProduct.rating} size={14} className="stars-row" />
              <span className="rating-score">{quickViewProduct.rating}</span>
              <span className="rating-count">({quickViewProduct.reviewsCount} verified reviews)</span>
            </div>

            <div className="dialog-price-row">
              <span className="dialog-price-now">{formatPrice(unitPrice)}</span>
              {quickViewProduct.originalPriceINR && (
                <span className="dialog-price-was">{formatPrice(quickViewProduct.originalPriceINR + (currentOptObj.surcharge || 0))}</span>
              )}
              <span className="dialog-discount-chip">
                {quickViewProduct.discount || formatDiscountBadge(quickViewProduct.originalPriceINR, quickViewProduct.priceINR)}
              </span>
            </div>

            <p className="dialog-description">{quickViewProduct.description}</p>

            {/* Specs Mini Grid */}
            <div className="dialog-specs-box">
              {quickViewProduct.badge && (
                <div className="spec-row">
                  <span className="spec-name">Artisan Edition:</span>
                  <span className="spec-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--jyren-gold-light)', fontWeight: 600 }}>
                    <Sparkles size={13} style={{ color: 'var(--jyren-gold)' }} />
                    {quickViewProduct.badge}
                  </span>
                </div>
              )}
              <div className="spec-row">
                <span className="spec-name">Fabric & Dupatta:</span>
                <span className="spec-val">{quickViewProduct.fabric}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Zari & Neckline:</span>
                <span className="spec-val">{quickViewProduct.zari}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Color:</span>
                <span className="spec-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {quickViewProduct.colorHex && (
                    <span 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: quickViewProduct.colorHex,
                        border: '1px solid rgba(255,255,255,0.3)',
                        display: 'inline-block'
                      }}
                    />
                  )}
                  {quickViewProduct.colorName}
                </span>
              </div>
            </div>

            {/* Extra Garment & Comfort Details matching Lookbook */}
            {quickViewProduct.features && quickViewProduct.features.length > 0 && (
              <div className="dialog-features-highlights-box">
                <div className="features-header-bar">
                  <span className="features-sparkle-icon">✨</span>
                  <label className="block-section-label">
                    EXTRA DETAILS & COMFORT CRAFT
                  </label>
                </div>
                <div className="features-chips-grid">
                  {quickViewProduct.features.map((feat, idx) => (
                    <div key={idx} className="feature-detail-chip">
                      <Check size={14} className="feature-check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector for Mens, Kids & Ladies */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="size-selector-block" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="block-section-label" style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: 'var(--jyren-gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {isKids ? 'Select Age Bracket:' : 'Select Size:'}
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setShowSizeGuide(!showSizeGuide)} 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--jyren-gold)', textDecoration: 'underline' }}
                  >
                    <Ruler size={13} /> {showSizeGuide ? 'Hide Measurements' : 'Size Guide'}
                  </button>
                </div>

                {showSizeGuide && (
                  <div style={{ background: 'rgba(197, 155, 104, 0.12)', border: '1px solid var(--jyren-gold)', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', fontSize: '0.75rem', color: 'var(--jyren-cream)' }}>
                    {isKids ? (
                      <p><strong>Kids Size Chart:</strong> 2Y–3Y (Height 92cm), 4Y–5Y (Height 104cm), 6Y–7Y (Height 116cm), 8Y–9Y (Height 128cm), 10Y–12Y (Height 140cm). Includes +2" inside margins.</p>
                    ) : isMens ? (
                      <p><strong>Mens Size Chart:</strong> 38 (Chest 38"), 40 (Chest 40"), 42 (Chest 42"), 44 (Chest 44"), 46 (Chest 46"). Relaxed royal silhouette.</p>
                    ) : (
                      <p><strong>Ladieswear Size Chart:</strong> XS (Bust 32"), S (Bust 34"), M (Bust 36"), L (Bust 38"), XL (Bust 40"). Sarees include 0.8m unstitched blouse.</p>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: selectedSize === sz ? '1.5px solid var(--jyren-gold-light)' : '1px solid rgba(197, 155, 104, 0.25)',
                        background: selectedSize === sz ? 'rgba(197, 155, 104, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        color: selectedSize === sz ? '#FFF' : 'var(--jyren-cream-muted)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Options Selector */}
            <div className="blouse-customizer-block">
              <label className="block-section-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--jyren-gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {optionHeading}
              </label>

              <div className="blouse-options-list">
                {currentOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={`blouse-opt-card ${selectedOption === opt.label ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(opt.label)}
                  >
                    <div className="radio-circle">
                      {selectedOption === opt.label && <Check size={12} />}
                    </div>
                    <div className="blouse-opt-text">
                      <div className="opt-title-line">
                        <strong>{opt.label}</strong>
                        {opt.surcharge > 0 && <span className="surcharge-tag">+{formatPrice(opt.surcharge)}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="dialog-actions-row">
              <div className="qty-control-stepper">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="dialog-add-btn" onClick={handleAdd}>
                <ShoppingBag size={17} />
                <span>Add To Luxury Bag</span>
              </button>

              <button 
                className={`dialog-wish-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct.id)}
                title="Save to Wishlist"
              >
                <Heart size={18} className={isWishlisted ? 'heart-active-fill' : ''} />
              </button>
            </div>

            {/* Delivery and Trust strip */}
            <div className="dialog-trust-bullets">
              <div className="trust-bullet">
                <Truck size={14} className="gold-icon" />
                <span>Express Worldwide Shipping (3-5 Days)</span>
              </div>
              <div className="trust-bullet">
                <RotateCcw size={14} className="gold-icon" />
                <span>7-Day Hassle-Free Exchange & Alterations</span>
              </div>
            </div>

            {/* 3D Drape Interactive Simulator Link */}
            <button 
              type="button"
              className="dialog-view-3d-btn"
              onClick={() => {
                setQuickViewProduct(null);
                setTimeout(() => {
                  scrollToSection('drape-3d');
                }, 100);
              }}
            >
              <Move3d size={15} />
              <span>Inspect Weave in 3D WebGL Studio ✦</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
