import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { scrollToSection } from '../utils/navigation';

export const NewArrivalsBanner = () => {
  const { setActiveCategory, setQuickViewProduct } = useCart();
  const sectionRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger card reveal animation as user scrolls from top to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDiscover = () => {
    setActiveCategory('all');
    scrollToSection('catalog');
  };

  const newArrivalIds = ['jyr-k01-coral', 'jyr-k02-blue', 'jyr-k03-sage'];
  const newDrapes = newArrivalIds.map((id, index) => {
    const p = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0];
    return {
      id: `fresh-${index + 1}`,
      title: p.name,
      image: p.image,
      product: p,
    };
  });

  return (
    <section className="new-arrivals-section" id="new-arrivals" ref={sectionRef}>
      <div className="section-container">
        
        <div className="new-arrivals-grid-layout">
          
          {/* Left Column Text matching Reel 00:03 */}
          <div className={`new-arrivals-content-left ${isRevealed ? 'text-reveal-active' : 'text-reveal-pending'}`}>
            <h2 className="fresh-weaves-heading">
              Fresh Weaves, <br />
              <span className="serif-italic-grace">Timeless Grace</span>
            </h2>

            <p className="fresh-weaves-desc">
              Simple comfort everyday style. Handcrafted Kurti with Pant sets tailored with breathable cottons, delicate necklines, and relaxed silhouettes for daily elegance.
            </p>

            <button className="btn-discover-arrivals" onClick={handleDiscover}>
              <span>DISCOVER NEW ARRIVALS</span>
              <div className="btn-arrow-wrap">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Right Column: 3 Arched Kurti Cards with Bottom-to-Top Slowmo Fly-In */}
          <div className="new-arrivals-arches-cluster">
            {newDrapes.map((drape, index) => (
              <div 
                key={drape.id} 
                className={`new-drape-arch-card premium-scroll-card ${isRevealed ? 'fly-in-active' : 'fly-in-pending'}`}
                style={{
                  '--card-delay': `${0.15 + index * 1.2}s`,
                  '--details-delay': `${0.65 + index * 1.2}s`,
                  '--card-index': index % 4
                }}
                onClick={() => setQuickViewProduct(drape.product)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${drape.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setQuickViewProduct(drape.product);
                  }
                }}
              >
                {/* Arched Image Frame with Click for More Details button at bottom */}
                <div className="arch-img-frame">
                  <img src={drape.image} alt={drape.title} className="arch-saree-img" />

                  {/* Click for More Details Button placed at the BOTTOM of the card image */}
                  <div className={`arch-bottom-action ${isRevealed ? 'details-reveal-active' : 'details-reveal-pending'}`}>
                    <button 
                      type="button" 
                      className="arch-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(drape.product);
                      }}
                    >
                      <span>Click for More Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
