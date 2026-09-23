import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle2, Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { StarRating } from './common/StarRating';

export const CustomerReviews = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple the array for seamless infinite looping
  const loopedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  // Initialize track to the middle set for seamless bidirectional scrolling
  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      const singleSetWidth = track.scrollWidth / 3;
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = singleSetWidth;
      track.style.scrollBehavior = '';
    }
  }, []);

  // Listen to scroll to wrap around seamlessly and update active index
  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const singleSetWidth = track.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    // Boundary check for infinite wrapping
    if (track.scrollLeft >= singleSetWidth * 2 - 10) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft -= singleSetWidth;
      track.style.scrollBehavior = '';
    } else if (track.scrollLeft <= 10) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft += singleSetWidth;
      track.style.scrollBehavior = '';
    }

    // Calculate active review index (0 to REVIEWS.length - 1)
    const card = track.querySelector('.single-line-card');
    const cardWidth = card ? card.offsetWidth + 24 : 380;
    const relativeScroll = (track.scrollLeft % singleSetWidth);
    const idx = Math.round(relativeScroll / cardWidth) % REVIEWS.length;
    setActiveIndex(idx);
  };

  // Continuous auto-advancing loop timer (paused on hover/touch)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (trackRef.current) {
        const card = trackRef.current.querySelector('.single-line-card');
        const cardWidth = card ? card.offsetWidth + 24 : 380;
        trackRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.single-line-card');
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const jumpToReview = (targetIndex) => {
    if (trackRef.current) {
      const track = trackRef.current;
      const card = track.querySelector('.single-line-card');
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      const singleSetWidth = track.scrollWidth / 3;
      track.scrollTo({
        left: singleSetWidth + (targetIndex * cardWidth),
        behavior: 'smooth'
      });
      setActiveIndex(targetIndex);
    }
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container">
        
        <div className="section-header-center">
          <div className="subhead-badge">
            <Sparkles size={14} className="gold-icon" />
            <span>VOICES OF ROYALTY</span>
          </div>
          <h2 className="section-heading-serif">Client Reflections</h2>
          <p className="section-subtext">
            Over 10,000+ patrons, brides, and families draped in our handcrafted silks and couture worldwide.
          </p>
        </div>

        {/* Single-Line Infinite Looping Carousel */}
        <div 
          className="reviews-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button 
            type="button" 
            className="carousel-nav-btn prev-btn" 
            onClick={() => scroll('left')}
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <div 
            className="reviews-single-line-track" 
            ref={trackRef}
            onScroll={handleScroll}
          >
            {loopedReviews.map((review, index) => (
              <div 
                key={`${review.id}-loop-${index}`} 
                className="luxury-review-card single-line-card premium-scroll-card"
                style={{ '--card-index': index % 3 }}
              >
                <Quote size={28} className="quote-watermark" />
                
                <StarRating rating={review.rating} maxStars={review.rating} size={14} className="review-stars-row" />

                <h4 className="review-title">"{review.title}"</h4>
                <p className="review-comment">{review.comment}</p>

                <div className="review-author-footer">
                  <div className="author-avatar-monogram">
                    {review.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <div className="author-name-line">
                      <span className="author-name">{review.name}</span>
                      {review.verified && (
                        <span className="verified-badge-pill" title="Verified Purchase">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      )}
                    </div>
                    <span className="author-role">{review.role}</span>
                    <span className="reviewed-product-tag">Apparel: {review.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            className="carousel-nav-btn next-btn" 
            onClick={() => scroll('right')}
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dynamic Infinite Loop Dots Indicator */}
        <div className="reviews-loop-indicators">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`reviews-loop-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => jumpToReview(i)}
              aria-label={`Jump to review ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
