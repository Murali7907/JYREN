import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, Feather, Scissors } from 'lucide-react';

export const CraftsmanshipStory = () => {
  const steps = [
    {
      number: '01',
      title: 'Sericulture & Pure Silk Yarn',
      description: 'We source exclusively Grade-A Mulberry and Katan silk cocoons. Each yarn undergoes natural degumming to achieve that signature liquid-drape luster.',
      icon: Feather
    },
    {
      number: '02',
      title: '28-Day Handloom Jacquard',
      description: 'Master weavers in Varanasi and Kanchipuram weave warp and weft meticulously, intertwining tested electroplated gold zari into heirloom motifs.',
      icon: Scissors
    },
    {
      number: '03',
      title: 'Fair Loom-to-Wardrobe Pricing',
      description: 'By bypassing third-party wholesalers, luxury boutique distributors, and high street showrooms, JYREN delivers royal opulence at honest, affordable prices.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="craftsmanship-section" id="craftsmanship">
      <div className="craft-ambient-glow"></div>
      
      <div className="section-container">
        
        <div className="craft-layout-grid">
          
          {/* Left Narrative Block */}
          <div className="craft-text-column">
            <div className="subhead-badge">
              <Sparkles size={14} className="gold-icon" />
              <span>THE SOUL OF THE WEAVE</span>
            </div>
            
            <h2 className="section-heading-serif">
              Master Handcrafted Couture & Tailored Elegance
            </h2>

            <p className="craft-lead-p">
              Every JYREN ensemble carries the devotion of master artisans and generational tailoring excellence. From regal wedding ensembles to everyday luxury sets, we bring authentic bespoke fashion directly to your wardrobe without luxury retail markups.
            </p>

            <div className="craft-metrics-row">
              <div className="metric-box">
                <span className="metric-number">28+</span>
                <span className="metric-label">Days Per Ensemble</span>
              </div>
              <div className="metric-separator"></div>
              <div className="metric-box">
                <span className="metric-number">100%</span>
                <span className="metric-label">Tested Pure Zari</span>
              </div>
              <div className="metric-separator"></div>
              <div className="metric-box">
                <span className="metric-number">₹0</span>
                <span className="metric-label">Middleman Markup</span>
              </div>
            </div>

            <div className="craft-guarantee-card">
              <ShieldCheck size={28} className="gold-seal-icon" />
              <div>
                <h4 className="seal-title">Silk Mark Certified Guarantee</h4>
                <p className="seal-desc">
                  Each saree is accompanied by an authentic Silk Mark tag confirming 100% genuine natural silk fibers tested under national textile laboratory standards.
                </p>
              </div>
            </div>

          </div>

          {/* Right Steps Progression */}
          <div className="craft-steps-column">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div key={step.number} className="craft-step-card">
                  <div className="step-badge-circle">
                    <span className="step-num">{step.number}</span>
                  </div>
                  <div className="step-content">
                    <div className="step-header-wrap">
                      <IconComp size={18} className="step-mini-icon" />
                      <h3 className="step-title">{step.title}</h3>
                    </div>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
