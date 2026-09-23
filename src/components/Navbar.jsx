import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CURRENCIES, OFFICIAL_INSTAGRAM_URL } from '../data/products';
import { InstagramIcon } from './common/InstagramIcon';
import { scrollToSection as smoothScroll } from '../utils/navigation';

export const Navbar = () => {
  const {
    currency,
    setCurrency,
    setIsCartOpen,
    totalCartCount,
    setActiveCategory,
    activeCategory,
    isLoggedIn,
    user,
    setIsAuthModalOpen
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Handle scroll spy and header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Dynamic active indicator based on scroll position
      const scrollY = window.scrollY + 140;
      const contactEl = document.getElementById('contact');
      const catalogEl = document.getElementById('catalog');
      const craftEl = document.getElementById('craftsmanship');
      const heroEl = document.getElementById('hero');

      if (contactEl && scrollY >= contactEl.offsetTop) {
        setActiveNav('contact');
      } else if (catalogEl && scrollY >= catalogEl.offsetTop) {
        setActiveNav('bestsellers');
      } else if (craftEl && scrollY >= craftEl.offsetTop) {
        setActiveNav('about');
      } else if (heroEl) {
        setActiveNav('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, navKey) => {
    setMobileMenuOpen(false);
    if (navKey) setActiveNav(navKey);
    smoothScroll(id);
  };

  const handleCategoryNav = (catKey, navKey) => {
    setActiveCategory(catKey);
    setActiveNav(navKey);
    scrollToSection('catalog', navKey);
  };

  return (
    <header className={`navbar-wrapper minimal-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="main-navbar">
        <div className="navbar-container minimal-navbar-container">
          
          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Left Brand Identity: Monogram Badge + Wordmark with HANDPICKED & UNIQUE */}
          <a 
            href="#hero" 
            className="brand-logo-container" 
            onClick={(e) => { 
              e.preventDefault(); 
              scrollToSection('hero', 'home'); 
            }}
          >
            <div className="logo-badge-wrapper">
              <img 
                src="/jyren-logo.jpg" 
                alt="JYREN Logo" 
                className="jyren-logo-img" 
              />
              <div className="logo-halo-ring"></div>
            </div>
            <div className="brand-text-block">
              <span className="brand-wordmark">JYREN</span>
              <span className="brand-tagline">HANDPICKED & UNIQUE</span>
            </div>
          </a>

          {/* Center Minimal Navigation Links with dynamic sliding active indicator bar */}
          <ul className={`nav-links minimal-nav-links ${mobileMenuOpen ? 'nav-links-mobile-active' : ''}`}>
            <li>
              <button 
                className={`nav-link-btn ${activeNav === 'home' ? 'active' : ''}`} 
                onClick={() => scrollToSection('hero', 'home')}
              >
                <span>HOME</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link-btn ${activeNav === 'about' ? 'active' : ''}`} 
                onClick={() => scrollToSection('craftsmanship', 'about')}
              >
                <span>ABOUT US</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link-btn ${activeNav === 'bestsellers' ? 'active' : ''}`} 
                onClick={() => scrollToSection('catalog', 'bestsellers')}
              >
                <span>BEST SELLERS</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-link-btn ${activeNav === 'contact' ? 'active' : ''}`} 
                onClick={() => scrollToSection('contact', 'contact')}
              >
                <span>CONTACT</span>
              </button>
            </li>
          </ul>

          {/* Right Action: Minimal Currency Picker & Brand Logo Badge ONLY (replacing Bag) */}
          <div className="navbar-actions minimal-navbar-actions">
            
            {/* Official Instagram Link */}
            <a 
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="action-pill-btn instagram-nav-pill"
              title="Visit @jyren_the_handpicked on Instagram"
              aria-label="Visit @jyren_the_handpicked on Instagram"
            >
              <InstagramIcon size={14} />
              <span className="ig-nav-text">@jyren_the_handpicked</span>
            </a>

            {/* Currency Selector */}
            <div className="currency-selector-relative">
              <button 
                className="action-pill-btn currency-btn minimal-currency-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                title="Change Currency"
              >
                <Globe size={14} />
                <span className="currency-text">{currency}</span>
                <ChevronDown size={11} className={`dropdown-arrow ${currencyDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {currencyDropdownOpen && (
                <div className="currency-dropdown-menu">
                  {Object.keys(CURRENCIES).map((currCode) => (
                    <button
                      key={currCode}
                      className={`currency-option ${currency === currCode ? 'selected' : ''}`}
                      onClick={() => {
                        setCurrency(currCode);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      {CURRENCIES[currCode].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Login Button (Logo Only - No text required) */}
            <button 
              className={`navbar-bag-only-btn navbar-user-btn ${isLoggedIn ? 'is-logged-in' : ''}`}
              onClick={() => setIsAuthModalOpen(true)}
              aria-label={isLoggedIn ? `Account: ${user?.name || 'User'}` : "Login"}
              title={isLoggedIn ? `Signed in as ${user?.name || user?.email}` : "Login to JYREN"}
            >
              <div className="bag-icon-ring">
                <User size={19} className="header-bag-icon" />
                {isLoggedIn && <span className="auth-status-dot" />}
              </div>
            </button>

            {/* Shopping Bag Button (Bag Logo Only) */}
            <button 
              className="navbar-bag-only-btn" 
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <div className="bag-icon-ring">
                <ShoppingBag size={19} className="header-bag-icon" />
                {totalCartCount > 0 && (
                  <span className="navbar-cart-badge">{totalCartCount}</span>
                )}
              </div>
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
};
