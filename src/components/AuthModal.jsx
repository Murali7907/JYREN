import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ArrowRight, Sparkles, CheckCircle2, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEscapeKey } from '../hooks/useEscapeKey';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    user, 
    isLoggedIn, 
    login, 
    logout, 
    isCartOpen 
  } = useCart();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEscapeKey(() => setIsAuthModalOpen(false), isAuthModalOpen);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: formData.name || (formData.email.split('@')[0] || 'Royal Patron'),
      email: formData.email || 'patron@jyren.com',
      phone: formData.phone || '+91 98765 43210'
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="auth-modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="auth-close-btn"
          onClick={() => setIsAuthModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isLoggedIn ? (
          /* Profile & Account View when logged in */
          <div className="auth-profile-view">
            <div className="auth-header-center">
              <div className="auth-avatar-ring">
                <User size={30} className="gold-icon" />
              </div>
              <span className="auth-vip-badge">ROYAL GUILD PATRON</span>
              <h3 className="auth-title-serif">{user?.name || 'Valued Patron'}</h3>
              <p className="auth-subtitle">{user?.email}</p>
            </div>

            <div className="auth-profile-details-box">
              <div className="detail-item">
                <span className="detail-label">PHONE NUMBER</span>
                <span className="detail-value">{user?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">MEMBERSHIP TIER</span>
                <span className="detail-value tier-gold">✦ 24k Gold Heirloom Patron</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">VIP REWARDS PERKS</span>
                <span className="detail-value">Complimentary Tailoring & Priority Loom Access</span>
              </div>
            </div>

            {isCartOpen && (
              <div className="auth-cart-continue-banner">
                <CheckCircle2 size={16} className="gold-icon" />
                <span>You are verified! You can now proceed to checkout in your bag.</span>
              </div>
            )}

            <div className="auth-actions-row">
              <button 
                type="button" 
                className="btn-gold-fill auth-continue-btn"
                onClick={() => setIsAuthModalOpen(false)}
              >
                {isCartOpen ? 'RETURN TO BAG & CHECKOUT' : 'CONTINUE SHOPPING'}
              </button>
              
              <button 
                type="button" 
                className="auth-logout-btn"
                onClick={logout}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div className="auth-form-view">
            <div className="auth-header-center">
              <div className="logo-badge-wrapper auth-logo-badge">
                <img src="/jyren-logo.jpg" alt="JYREN Logo" className="jyren-logo-img" />
              </div>
              <div className="subhead-badge" style={{ marginTop: '12px' }}>
                <Sparkles size={12} className="gold-icon" />
                <span>JYREN LUXURY GUILD</span>
              </div>
              <h3 className="auth-title-serif">
                {mode === 'login' ? 'Sign In to Your Account' : 'Join the VIP Guild'}
              </h3>
              {isCartOpen && (
                <p className="auth-subtitle">
                  Sign in to complete your purchase and proceed to secure checkout.
                </p>
              )}
            </div>

            {/* Mode Switcher with Smooth Sliding Glider */}
            <div className="auth-mode-tabs">
              <div 
                className="auth-tab-glider"
                style={{
                  transform: mode === 'login' ? 'translateX(0%)' : 'translateX(100%)'
                }}
              />
              <button 
                type="button"
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                SIGN IN
              </button>
              <button 
                type="button"
                className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
              >
                NEW TO JYREN?
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div key={mode} className="auth-form-fields-animated">
                {mode === 'register' && (
                  <div className="auth-field-group">
                    <label className="auth-label">FULL NAME</label>
                    <div className="auth-input-wrapper">
                      <User size={16} className="auth-field-icon" />
                      <input 
                        type="text" 
                        placeholder="e.g. Samyuktha Menon"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={mode === 'register'}
                        className="auth-text-input"
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field-group">
                  <label className="auth-label">EMAIL ADDRESS</label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} className="auth-field-icon" />
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="auth-text-input"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="auth-field-group">
                    <label className="auth-label">WHATSAPP / MOBILE NUMBER</label>
                    <div className="auth-input-wrapper">
                      <Phone size={16} className="auth-field-icon" />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="auth-text-input"
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field-group">
                  <label className="auth-label">PASSWORD</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="auth-text-input"
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                  <span>{mode === 'login' ? 'SIGN IN & PROCEED' : 'CREATE VIP ACCOUNT'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
