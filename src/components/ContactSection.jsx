import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OFFICIAL_INSTAGRAM_URL } from '../data/products';
import { InstagramIcon } from './common/InstagramIcon';

export const ContactSection = () => {
  const { showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our bridal styling concierge!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section className="contact-atelier-section" id="contact">
      <div className="section-container">
        
        <div className="contact-editorial-layout">
          
          {/* Left Column: Contact details & Hyderabad Atelier */}
          <div className="contact-details-left">
            <div className="subhead-badge">
              <Sparkles size={13} className="gold-icon" />
              <span>CONTACT US</span>
            </div>

            <h2 className="contact-serif-heading">
              We'd Love to <br />
              <span className="serif-italic-grace">Hear From You</span>
            </h2>

            <p className="contact-intro-text">
              Whether you are selecting a bridal trousseau, booking a private in-store draping consultation, or inquiring about custom border tailoring, our atelier concierges are at your service.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="info-item-label">EMAIL US</span>
                  <a href="mailto:info@jyren.com" className="info-item-value">info@jyren.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="info-item-label">CALL OUR ATELIER</span>
                  <a href="tel:+919876543210" className="info-item-value">+91 98765 43210 / (040) 2355-8900</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <span className="info-item-label">OFFICIAL INSTAGRAM</span>
                  <a 
                    href={OFFICIAL_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-item-value ig-contact-link"
                    title="Visit @jyren_the_handpicked on Instagram"
                  >
                    @jyren_the_handpicked ↗
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="info-item-label">VISIT OUR HYDERABAD ATELIER</span>
                  <p className="info-item-value">Plot No. 42, Road No. 36, Jubilee Hills, Hyderabad - 500033</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-directions-link"
            >
              <span>GET DIRECTIONS</span>
              <span className="arrow-sym">➔</span>
            </a>
          </div>

          {/* Right Column: Saree Models Photo + Interactive Form (Matching Reel 00:08) */}
          <div className="contact-visual-and-form-right premium-scroll-card">
            <div className="contact-models-banner">
              <img 
                src="/images/contact-models.jpg" 
                alt="JYREN Saree Concierge" 
                className="contact-models-img" 
              />
              <div className="contact-banner-scrim">
                <p className="banner-quote">"Every drape we send out carries our blessing of prosperity & timeless joy."</p>
                <span className="banner-signature">— JYREN Master Weavers</span>
              </div>
            </div>

            <form className="contact-luxury-form" onSubmit={handleSubmit}>
              <div className="form-fields-grid">
                <div className="input-group">
                  <label>YOUR NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ananya Sharma" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="ananya@example.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="input-group full-width">
                  <label>PHONE / WHATSAPP</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 00000" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="input-group full-width">
                  <label>HOW CAN WE ASSIST YOU?</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us about your wedding date, drape preference, or styling inquiry..." 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="contact-submit-btn">
                {submitted ? (
                  <>
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>MESSAGE RECEIVED ✦</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>SEND MESSAGE TO ATELIER</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
