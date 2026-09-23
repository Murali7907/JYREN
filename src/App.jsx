import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewArrivalsBanner } from './components/NewArrivalsBanner';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ContactSection } from './components/ContactSection';
import { CraftsmanshipStory } from './components/CraftsmanshipStory';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Sparkles, X, Check, ShoppingBag } from 'lucide-react';

const MainAppContent = () => {
  const { notification, closeNotification, setIsCartOpen } = useCart();
  const [introFinished, setIntroFinished] = useState(false);

  // Scroll-triggered animations: activates as the user scrolls from top to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeCards = () => {
      const cards = document.querySelectorAll('.premium-scroll-card');
      cards.forEach((card, idx) => {
        if (!card.dataset.scrollObserved) {
          card.dataset.scrollObserved = 'true';
          if (!card.style.getPropertyValue('--card-index')) {
            card.style.setProperty('--card-index', idx % 4);
          }
          observer.observe(card);
        }
      });
    };

    observeCards();

    const mutationObserver = new MutationObserver(() => {
      observeCards();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className={`jyren-app-root ${introFinished ? 'intro-completed' : 'intro-active'}`}>
      {/* Opening Cinematic Brand Walk & Shawl Reveal (Shows once per session) */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* Luxury Dynamic Island Floating Notification */}
      {notification && (
        <aside className="dynamic-island-notification" role="status" aria-live="polite">
          <div className="island-inner-capsule">
            {notification.image ? (
              <div className="island-media-thumb">
                <img src={notification.image} alt="" className="island-img" />
                <span className="island-halo-ring" />
              </div>
            ) : (
              <div className="island-icon-badge">
                <Sparkles size={14} className="island-sparkle-icon" />
              </div>
            )}

            <div className="island-info-content">
              <div className="island-meta-row">
                <span className="island-badge-pill">{notification.badge || 'JYREN ATELIER'}</span>
                {notification.price && (
                  <span className="island-price-tag">{notification.price}</span>
                )}
              </div>
              <p className="island-title-text">{notification.title || notification.message}</p>
              {notification.subtitle && (
                <p className="island-sub-text">{notification.subtitle}</p>
              )}
            </div>

            <div className="island-actions-group">
              {notification.actionText && (
                <button 
                  type="button"
                  className="island-action-btn"
                  onClick={() => {
                    closeNotification();
                    setIsCartOpen(true);
                  }}
                >
                  <ShoppingBag size={12} />
                  <span>{notification.actionText}</span>
                </button>
              )}
              <button 
                type="button" 
                className="island-dismiss-btn"
                onClick={closeNotification}
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Opulent Atmospheric Silk Aura Backdrop continuing across all sections */}
      <div className="global-silk-ambient-backdrop" aria-hidden="true">
        <div className="silk-mesh-gradient" />
        <div className="silk-gold-dust-layer" />
        <div className="silk-arch-overlay" />
        <div className="global-gold-particles-container">
          {[...Array(26)].map((_, i) => (
            <span 
              key={i} 
              className="particle-dot"
              style={{
                left: `${(i * 3.8 + 2) % 96}%`,
                top: `${(i * 4.6 + 4) % 94}%`,
                animationDelay: `${(i * 0.35) % 4}s`,
                animationDuration: `${3.8 + (i % 4)}s`,
                transform: `scale(${0.6 + ((i % 3) * 0.35)})`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation matching Reel 00:01 */}
      <Navbar />

      <main>
        {/* 1. Hero Section matching Reel 00:01 & 00:02 */}
        <HeroSection />

        {/* 2. New Arrivals "Fresh Weaves, Timeless Grace" matching Reel 00:03 */}
        <NewArrivalsBanner />

        {/* 3. Explore By Apparel */}
        <CategoryShowcase />

        {/* 4. The Soul of the Weave (Craftsmanship Story & About Us) */}
        <CraftsmanshipStory />

        {/* 5. Best Sellers */}
        <ProductCatalog />

        {/* 6. Verified Reviews (Infinite Loop Client Reflections) */}
        <CustomerReviews />

        {/* 7. Contact Us "We'd Love to Hear From You" */}
        <ContactSection />
      </main>

      {/* Footer with VIP Club & Trust */}
      <Footer />

      {/* Interactive Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <SearchModal />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}

export default App;
