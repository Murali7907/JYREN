import React from 'react';
import { ArrowRight, ShieldCheck, Award, Crown } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

export const HeroSection = () => {

  const scrollToCatalog = () => {
    scrollToSection('catalog');
  };

  return (
    <section className="hero-section" id="hero">
      {/* Ambient Radial Spotlight Accents */}
      <div className="hero-ambient-glow left-glow" />
      <div className="hero-ambient-glow right-glow" />

      <div className="hero-container">
        
        {/* Left Hero Typography & Actions */}
        <div className="hero-content-left">
          
          <div className="hero-title-wrapper anim-reveal delay-2">
            <h1 className="hero-headline-culture brand-hero-title">
              <span className="brand-letters-wrap" aria-label="JYREN">
                <span className="char-fade-in" style={{ animationDelay: '0.15s' }}>J</span>
                <span className="char-fade-in" style={{ animationDelay: '0.28s' }}>Y</span>
                <span className="char-fade-in" style={{ animationDelay: '0.41s' }}>R</span>
                <span className="char-fade-in" style={{ animationDelay: '0.54s' }}>E</span>
                <span className="char-fade-in" style={{ animationDelay: '0.67s' }}>N</span>
              </span>
              <svg className="hero-swash-underline" viewBox="0 0 540 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  className="draw-swash-path"
                  d="M10 22C110 6 320 4 525 20M15 23C130 12 300 10 510 21" 
                  stroke="url(#goldGradient)" 
                  strokeWidth="2.8" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8C6538" stopOpacity="0.2" />
                    <stop offset="25%" stopColor="#E5C388" />
                    <stop offset="70%" stopColor="#F5DC9F" />
                    <stop offset="100%" stopColor="#C59B68" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </h1>
          </div>

          <h2 className="hero-subtitle anim-reveal delay-3">
            HANDPICKED & UNIQUE
          </h2>

          <p className="hero-description anim-reveal delay-4">
            Where timeless Indian heritage meets contemporary refinement. Handcrafted couture tailored with noble silks, artisanal zari, and regal grace.
          </p>

          {/* Call to Actions */}
          <div className="hero-cta-group anim-reveal delay-5">
            <button className="hero-btn-primary" onClick={scrollToCatalog}>
              <span className="btn-shimmer-text">EXPLORE ALL</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Bottom Trust & Authenticity Badges */}
          <div className="hero-features-strip anim-reveal delay-6">
            <div className="feature-item">
              <Crown size={15} className="feature-icon" />
              <div className="feature-text">
                <strong>ARTISANAL EXCELLENCE</strong>
                <span>Master Weavers & Handcrafted Finesse</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <Award size={15} className="feature-icon" />
              <div className="feature-text">
                <strong>NOBLE TEXTILES</strong>
                <span>Pure Mulberry & Imperial Katan Silks</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <ShieldCheck size={15} className="feature-icon" />
              <div className="feature-text">
                <strong>AUTHENTIC ZARI</strong>
                <span>Certified Gold & Silver Thread Flora</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Hero Visual Showcase (Opulent Arched Palace Frame with Model) */}
        <div className="hero-visual-right">
          <div className="visual-frame-container anim-fade-zoom delay-2">
            
            {/* Ornate Arch Silhouette Backdrop with breathing aura */}
            <div className="arch-silhouette-glow animated-aura"></div>

            <div className="model-portrait-card">
              <img 
                src="/images/hero-royal-model.jpg" 
                alt="JYREN Royal Couture Model in Onion Pink & Gold Zari" 
                className="hero-model-img" 
              />
              <div className="portrait-vignette-overlay"></div>
            </div>

          </div>
        </div>

      </div>

      {/* Decorative Traditional Bottom Scallop Border */}
      <div className="hero-bottom-trim"></div>
    </section>
  );
};
