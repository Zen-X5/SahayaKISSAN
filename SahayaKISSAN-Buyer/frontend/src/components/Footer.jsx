import {Link} from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaYoutube,
  FaInstagram 
} from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="agri-footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">🌱</div>
              <span className="logo-text">SahayaKISSAN</span>
            </div>
            <p className="brand-desc">{t('footer.brandDesc')}</p>
            <div className="social-links">
              <a href="#" className="social-link facebook"><FaFacebook /></a>
              <a href="#" className="social-link twitter"><FaTwitter /></a>
              <a href="#" className="social-link youtube"><FaYoutube /></a>
              <a href="#" className="social-link instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>{t('footer.quickLinks')}</h3>
            <ul>
              <li><a href="#home">{t('navbar.home')}</a></li>
              <li><a href="#features">{t('navbar.features')}</a></li>
              <li><a href="#products">{t('navbar.products')}</a></li>
              <li><a href="#about">{t('navbar.about')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t('footer.services')}</h3>
            <ul>
              <li><a href="#">{t('footer.cropMonitoring')}</a></li>
              <li><a href="#">{t('footer.weatherForecast')}</a></li>
              <li><a href="#">{t('footer.govSchemes')}</a></li>
              <li><a href="#">{t('footer.marketPrices')}</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>{t('footer.contact')}</h3>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>support@sahayakissan.com</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>{t('footer.address')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2026 {t('footer.copyright')}</p>
          <div className="footer-lang">
            <select 
              value={i18n.language} 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bottom-lang-select"
            >
              <option value="en">EN</option>
              <option value="hi">हिं</option>
              <option value="as">অৰি</option>
            </select>
          </div>
        </div>
        <Link to="http://localhost:5174/seller/my-sells">Sell</Link>
      </div>
    </footer>
  );
}
