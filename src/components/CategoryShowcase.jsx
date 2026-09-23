import React, { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

export const CategoryShowcase = () => {
  const { setActiveCategory, setActiveColorFilter } = useCart();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Scroll observer to trigger sequential card appearance as user scrolls from top to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate from Explore Collection directly to All Collections so all images are displayed reliably
    setActiveCategory('all');
    if (setActiveColorFilter) {
      setActiveColorFilter('All Colors');
    }
    scrollToSection('catalog');
  };

  return (
    <section className="categories-section" id="categories" ref={sectionRef}>
      <div className="section-container">
        
        {/* Header celebrating Men, Women, and Kids Apparel */}
        <div className="section-header-center">
          <h2 className="section-heading-serif">EXPLORE BY APPAREL</h2>
          <p className="section-subtext">
            Affordable everyday elegance and contemporary ethnic fashion. Handcrafted Kurti sets, chic coords, and versatile ensembles tailored for simple comfort and timeless grace.
          </p>
        </div>

        <div className="categories-cards-grid">
          {CATEGORIES.map((cat, index) => (
            <div 
              key={cat.id} 
              className={`category-arch-card category-slow-reveal-card ${inView ? 'reveal-active' : ''}`}
              style={{ '--cat-order': index }}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className="category-image-wrap">
                <img src={cat.image} alt={cat.title} className="cat-img" />
                <div className="cat-gradient-overlay"></div>
                
                <div className="cat-content-bottom">
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-subtitle">{cat.subtitle}</p>
                  <div className="cat-explore-link">
                    <span>Explore Collection</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
