import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Tag, Sparkles, Truck, CheckCircle2, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { scrollToSection } from '../utils/navigation';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    subtotalINR,
    discountAmountINR,
    shippingINR,
    totalINR,
    freeShippingProgress,
    freeShippingThresholdINR,
    totalCartCount,
    appliedDiscount,
    setAppliedDiscount,
    showToast,
    isLoggedIn,
    user,
    setIsAuthModalOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    name: user?.name || 'Samyuktha Menon',
    phone: user?.phone || '+91 98765 43210',
    address: 'Flat 402, Royal Palms Residency, MG Road',
    city: 'Bangalore',
    pincode: '560001'
  });
  const [orderId, setOrderId] = useState('');

  // Sync user details if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleProceedCheckout = () => {
    if (!isLoggedIn) {
      showToast('🔒 Please log in to your account to proceed to secure checkout.');
      setIsAuthModalOpen(true);
    } else {
      setCheckoutStep('checkout');
    }
  };

  useEscapeKey(() => setIsCartOpen(false), isCartOpen);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = inputCoupon.trim().toUpperCase();
    if (code === 'JYRENROYAL' || code === 'JYREN10') {
      setAppliedDiscount({ code: 'JYRENROYAL', percent: 10 });
      setCouponError('');
      showToast('🎉 Promo code JYRENROYAL applied for 10% off!');
      setInputCoupon('');
    } else if (code === 'FESTIVE15') {
      setAppliedDiscount({ code: 'FESTIVE15', percent: 15 });
      setCouponError('');
      showToast('🎉 Festive 15% discount applied!');
      setInputCoupon('');
    } else {
      setCouponError('Invalid code. Try "JYRENROYAL" or "FESTIVE15"');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `JYR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutStep('success');
    showToast(`👑 Order ${generatedId} placed successfully!`);
    clearCart();
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThresholdINR - subtotalINR);

  return (
    <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside 
        className="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-title-block">
            {checkoutStep === 'checkout' ? (
              <button 
                className="drawer-back-btn" 
                onClick={() => setCheckoutStep('cart')}
                style={{ color: 'var(--jyren-gold)', marginRight: '6px' }}
                title="Back to bag"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <ShoppingBag size={20} className="gold-icon" />
            )}
            
            <h3 className="cart-title">
              {checkoutStep === 'cart' && 'Your Luxury Bag'}
              {checkoutStep === 'checkout' && 'Express Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed'}
            </h3>

            {checkoutStep === 'cart' && (
              <span className="cart-counter-pill">({totalCartCount} items)</span>
            )}
          </div>

          <button 
            className="drawer-close-btn"
            onClick={() => {
              setIsCartOpen(false);
              if (checkoutStep === 'success') setCheckoutStep('cart');
            }}
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {checkoutStep === 'cart' && (
          <>
            {/* Free Shipping Progress Meter */}
            <div className="free-shipping-meter-wrap">
              <div className="meter-label-row">
                <div className="meter-text">
                  <Truck size={14} className="gold-icon" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="free-unlocked">✨ You've unlocked Complimentary Worldwide Shipping!</span>
                  ) : (
                    <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping</span>
                  )}
                </div>
                <span className="meter-percent">{freeShippingProgress}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Item List */}
            <div className="cart-items-scrollable">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="cart-item-thumbnail" 
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-title-row">
                        <h4 className="item-name">{item.product.name}</h4>
                        <button 
                          className="item-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove from bag"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="item-blouse-option">
                        <strong>Blouse:</strong> {item.blouseOption}
                      </p>

                      <div className="item-price-qty-row">
                        <span className="item-price-calc">
                          {formatPrice((item.unitPriceINR || item.product.priceINR) * item.quantity)}
                        </span>

                        <div className="cart-qty-stepper">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart-state">
                  <div className="empty-cart-icon-wrap">
                    <ShoppingBag size={40} className="empty-bag-icon" />
                  </div>
                  <h4 className="empty-bag-title">Your shopping bag is empty</h4>
                  <p className="empty-bag-desc">
                    Immerse yourself in our heirloom drapes and select a timeless creation for your wardrobe.
                  </p>
                  <button 
                    className="btn-gold-filled"
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('catalog');
                    }}
                  >
                    Explore Saree Atelier
                  </button>
                </div>
              )}
            </div>

            {/* Cart Summary & Action */}
            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                
                {/* Promo Code Box */}
                <form className="coupon-form" onSubmit={handleApplyCoupon}>
                  <div className="coupon-input-wrapper">
                    <Tag size={15} className="coupon-tag-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter Promo Code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="submit" className="coupon-apply-btn">Apply</button>
                  </div>
                  {appliedDiscount && (
                    <div className="coupon-applied-pill">
                      <Sparkles size={12} />
                      <span>Code <strong>{appliedDiscount.code}</strong> applied ({appliedDiscount.percent}% OFF)</span>
                      <button 
                        type="button" 
                        className="coupon-remove-x" 
                        onClick={() => setAppliedDiscount(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {couponError && <p className="coupon-error-text">{couponError}</p>}
                </form>

                {/* Price Calculations */}
                <div className="cart-summary-calculations">
                  <div className="calc-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotalINR)}</span>
                  </div>
                  {discountAmountINR > 0 && (
                    <div className="calc-row discount-row">
                      <span>VIP Discount ({appliedDiscount?.percent}%)</span>
                      <span>−{formatPrice(discountAmountINR)}</span>
                    </div>
                  )}
                  <div className="calc-row">
                    <span>Worldwide Express Shipping</span>
                    <span>{shippingINR === 0 ? <strong className="green-free">FREE</strong> : formatPrice(shippingINR)}</span>
                  </div>
                  <div className="calc-divider"></div>
                  <div className="calc-row total-calc-row">
                    <strong>Estimated Total</strong>
                    <strong className="final-price">{formatPrice(totalINR)}</strong>
                  </div>
                </div>

                {/* Checkout Trigger - Requires Login */}
                <button 
                  className="proceed-checkout-btn"
                  onClick={handleProceedCheckout}
                >
                  <span>{isLoggedIn ? 'PROCEED TO SECURE CHECKOUT' : 'LOGIN TO PROCEED TO CHECKOUT'}</span>
                  <ArrowRight size={17} />
                </button>

                <div className="checkout-trust-icons">
                  <span className="trust-item"><ShieldCheck size={13} /> 256-Bit SSL Encryption</span>
                  <span className="trust-item">•</span>
                  <span className="trust-item">Silk Mark Authenticity</span>
                </div>

              </div>
            )}
          </>
        )}

        {/* STEP 2: INTERACTIVE CHECKOUT DETAILS & PAYMENT */}
        {checkoutStep === 'checkout' && (
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ background: 'rgba(45, 8, 17, 0.5)', border: '1px solid var(--jyren-card-border)', borderRadius: '12px', padding: '14px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--jyren-gold-light)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>1.</span> Delivery Information
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Recipient Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 155, 104, 0.3)', borderRadius: '8px', padding: '10px 12px', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 155, 104, 0.3)', borderRadius: '8px', padding: '10px 12px', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Complete Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 155, 104, 0.3)', borderRadius: '8px', padding: '10px 12px', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 155, 104, 0.3)', borderRadius: '8px', padding: '10px 12px', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
                    />
                    <input 
                      type="text" 
                      placeholder="Pincode / ZIP"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 155, 104, 0.3)', borderRadius: '8px', padding: '10px 12px', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ background: 'rgba(45, 8, 17, 0.5)', border: '1px solid var(--jyren-card-border)', borderRadius: '12px', padding: '14px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--jyren-gold-light)', marginBottom: '12px' }}>
                  <span>2.</span> Select Payment Mode
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', background: paymentMethod === 'upi' ? 'rgba(197, 155, 104, 0.2)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${paymentMethod === 'upi' ? 'var(--jyren-gold)' : 'rgba(197, 155, 104, 0.2)'}`, color: '#FFF', fontSize: '0.8rem', textAlign: 'left' }}
                  >
                    <Smartphone size={16} className="gold-icon" />
                    <span style={{ flex: 1 }}>Instant UPI / GPay / PhonePe (Fastest)</span>
                    {paymentMethod === 'upi' && <span style={{ color: '#48BB78', fontSize: '0.75rem', fontWeight: 700 }}>✓ Selected</span>}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', background: paymentMethod === 'card' ? 'rgba(197, 155, 104, 0.2)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${paymentMethod === 'card' ? 'var(--jyren-gold)' : 'rgba(197, 155, 104, 0.2)'}`, color: '#FFF', fontSize: '0.8rem', textAlign: 'left' }}
                  >
                    <CreditCard size={16} className="gold-icon" />
                    <span style={{ flex: 1 }}>Credit / Debit Cards (Visa, Mastercard, Amex)</span>
                    {paymentMethod === 'card' && <span style={{ color: '#48BB78', fontSize: '0.75rem', fontWeight: 700 }}>✓ Selected</span>}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', background: paymentMethod === 'cod' ? 'rgba(197, 155, 104, 0.2)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${paymentMethod === 'cod' ? 'var(--jyren-gold)' : 'rgba(197, 155, 104, 0.2)'}`, color: '#FFF', fontSize: '0.8rem', textAlign: 'left' }}
                  >
                    <Building2 size={16} className="gold-icon" />
                    <span style={{ flex: 1 }}>Cash on Delivery / NetBanking</span>
                    {paymentMethod === 'cod' && <span style={{ color: '#48BB78', fontSize: '0.75rem', fontWeight: 700 }}>✓ Selected</span>}
                  </button>
                </div>
              </div>

            </div>

            {/* Place Order Sticky Footer */}
            <div className="cart-drawer-footer">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ color: 'var(--jyren-cream-muted)', fontSize: '0.85rem' }}>Amount Payable:</span>
                <strong style={{ color: 'var(--jyren-gold-bright)', fontSize: '1.2rem' }}>{formatPrice(totalINR)}</strong>
              </div>

              <button type="submit" className="proceed-checkout-btn">
                <span>PLACE LUXURY ORDER</span>
                <Sparkles size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMED CELEBRATION */}
        {checkoutStep === 'success' && (
          <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(72, 187, 120, 0.15)', border: '2px solid #48BB78', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <CheckCircle2 size={36} color="#48BB78" />
            </div>

            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--jyren-gold)', fontWeight: 700 }}>CONGRATULATIONS</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFF', margin: '8px 0' }}>Your Heirlooms Await</h3>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--jyren-cream-muted)', lineHeight: '1.6', maxWidth: '320px', marginBottom: '20px' }}>
              Order <strong style={{ color: 'var(--jyren-gold-bright)' }}>{orderId}</strong> is confirmed. Our master atelier has started preparing your silks with the Silk Mark certificate and personalized care package.
            </p>

            <div style={{ background: 'rgba(45, 8, 17, 0.6)', border: '1px solid var(--jyren-card-border)', borderRadius: '12px', padding: '14px 20px', width: '100%', marginBottom: '24px', textAlign: 'left', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--jyren-gold)' }}>Tracking Status:</span>
                <span style={{ color: '#48BB78', fontWeight: 700 }}>Preparing for Dispatch</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--jyren-gold)' }}>Estimated Delivery:</span>
                <span style={{ color: '#FFF' }}>3-4 Business Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--jyren-gold)' }}>Concierge WhatsApp:</span>
                <span style={{ color: '#FFF' }}>Sent to {formData.phone}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-gold-filled"
              onClick={() => {
                setCheckoutStep('cart');
                setIsCartOpen(false);
              }}
              style={{ width: '100%' }}
            >
              Continue Exploring JYREN Atelier
            </button>
          </div>
        )}

      </aside>
    </div>
  );
};
