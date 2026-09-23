import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StarRating } from './common/StarRating';
import { calculateDiscountPercentage } from '../utils/pricing';

export const ProductCard = ({ product, index = 0 }) => {
  const {
    addToCart,
    formatPrice,
    setQuickViewProduct
  } = useCart();

  return (
    <div 
      className="luxury-product-card premium-scroll-card"
      style={{ '--card-index': index % 4 }}
    >
      {/* Product Image Stage */}
      <div 
        className="card-media-stage"
        onClick={() => setQuickViewProduct(product)}
        title="Click to view details"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-main-img" 
          loading="eager"
        />
      </div>

      {/* Product Metadata Details */}
      <div className="card-content-area">
        <div className="card-rating-strip">
          <StarRating rating={product.rating} size={12} className="stars-cluster" />
          <span className="rating-num-text">{product.rating}</span>
          <span className="reviews-tally">({product.reviewsCount})</span>
        </div>

        <h3 
          className="product-card-title"
          onClick={() => setQuickViewProduct(product)}
        >
          {product.name}
        </h3>

        <div className="product-card-pricing">
          <span className="price-active">{formatPrice(product.priceINR)}</span>
          {product.originalPriceINR && (
            <span className="price-original">{formatPrice(product.originalPriceINR)}</span>
          )}
          <span className="price-discount-tag">
            {calculateDiscountPercentage(product.originalPriceINR, product.priceINR)}% OFF
          </span>
        </div>

        {/* Add to Bag CTA Button */}
        <button 
          className="add-to-bag-card-btn"
          onClick={() => addToCart(product, product.customOptions?.[0]?.label || 'Standard Fit (Included)', 1)}
        >
          <ShoppingBag size={15} />
          <span>ADD TO BAG</span>
        </button>
      </div>

    </div>
  );
};
