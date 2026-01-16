import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import "./HomeExtraSections.css";

export default function HomeExtraSections() {
  const { t } = useTranslation();

  return (
    <section className="home-extra">
      <Reveal>
        <div className="impact-section">
          <div className="section-header">
            <h2>{t("impact.title")}</h2>
            <p>{t("impact.subtitle")}</p>
          </div>
          <div className="impact-grid">
            <div className="impact-card" data-count="500">
              <h3>0</h3>
              <p>{t("impact.farmers")}</p>
            </div>
            <div className="impact-card" data-count="20">
              <h3>0</h3>
              <p>{t("impact.districts")}</p>
            </div>
            <div className="impact-card" data-count="10000">
              <h3>0</h3>
              <p>{t("impact.dataPoints")}</p>
            </div>
            <div className="impact-card" data-count="25">
              <h3>1</h3>
              <p>{t("impact.iot")}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="how-section">
          <div className="section-header">
            <h2>{t("how.title")}</h2>
            <p>{t("how.subtitle")}</p>
          </div>
          <div className="how-steps">
            <div className="how-step">
              <div className="step-number">01</div>
              <h3>{t("how.step1.title")}</h3>
              <p>{t("how.step1.desc")}</p>
            </div>
            <div className="how-step">
              <div className="step-number">02</div>
              <h3>{t("how.step2.title")}</h3>
              <p>{t("how.step2.desc")}</p>
            </div>
            <div className="how-step">
              <div className="step-number">03</div>
              <h3>{t("how.step3.title")}</h3>
              <p>{t("how.step3.desc")}</p>
            </div>
            <div className="how-step">
              <div className="step-number">04</div>
              <h3>{t("how.step4.title")}</h3>
              <p>{t("how.step4.desc")}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="products-section">
          <div className="section-header">
            <h2>{t("products.title")}</h2>
            <p>{t("products.subtitle")}</p>
          </div>
          <div className="products-grid">
            <div className="product-placeholder">
              <div className="product-image"></div>
              <h4>{t("products.placeholder1")}</h4>
              <p>₹{t("products.price1")}</p>
            </div>
            <div className="product-placeholder">
              <div className="product-image"></div>
              <h4>{t("products.placeholder2")}</h4>
              <p>₹{t("products.price2")}</p>
            </div>
            <div className="product-placeholder">
              <div className="product-image"></div>
              <h4>{t("products.placeholder3")}</h4>
              <p>₹{t("products.price3")}</p>
            </div>
            <div className="product-placeholder">
              <div className="product-image"></div>
              <h4>{t("products.placeholder4")}</h4>
              <p>₹{t("products.price4")}</p>
            </div>
          </div>
        </div>
      </Reveal>


      <Reveal>
        <div className="sdg-poster-wrapper">
          <div 
            className="sdg-hero-bg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          >
            <div className="sdg-dark-overlay"></div>
          </div>
          
          <div className="sdg-poster-inner">
            <div className="sdg-poster-header">
              <h2>{t("sdg.title")}</h2>
              <p>{t("sdg.desc")}</p>
            </div>
            
            <div className="sdg-goals-grid">
              <div className="sdg-goal-card sdg-goal-2">
                <div className="sdg-goal-number">2</div>
                <span>Zero Hunger</span>
                <p>Ending hunger, achieving food security</p>
              </div>
              
              <div className="sdg-goal-card sdg-goal-8">
                <div className="sdg-goal-number">8</div>
                <span>Decent Work</span>
                <p>Decent work and economic growth</p>
              </div>
              
              <div className="sdg-goal-card sdg-goal-13">
                <div className="sdg-goal-number">13</div>
                <span>Climate Action</span>
                <p>Take urgent action on climate change</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>


      <Reveal>
        <div className="cta-section">
          <div className="cta-content">
            <h2>{t("cta.title")}</h2>
            <p>{t("cta.desc")}</p>
            <div className="cta-buttons">
              <button className="cta-primary">{t("cta.button2")}</button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
