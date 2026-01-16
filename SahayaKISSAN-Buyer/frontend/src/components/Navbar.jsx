import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [openBusiness, setOpenBusiness] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); 

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src="/Logo.svg" alt="" />
        </Link>

        <div className="navbar__menu">
          <div
            className="navbar__dropdown"
            onMouseEnter={() => setOpenBusiness(true)}
            onMouseLeave={() => setOpenBusiness(false)}
          >
            <button className="navbar__link">
              {t("business")}
            </button>

            {openBusiness && (
              <div className="navbar__megaMenu">
                
                <Link to="/seeds" className="mega-card">
                  <img src="/images/seeds-card.jpg" alt="Seeds" />
                  <h4>{t("seeds")}</h4>
                  <p>Buy certified seeds from verified farmers & suppliers</p>
                </Link>

                <Link to="/tea" className="mega-card">
                  <img src="/images/tea-card.webp" alt="Tea" />
                  <h4>{t("tea")}</h4>
                  <p>Quality tea saplings and plantation resources</p>
                </Link>

                <Link to="/sensors-iot" className="mega-card">
                  <img src="/images/sensors-iot.webp" alt="IoT" />
                  <h4>{t("sensorsAndIoT")}</h4>
                  <p>Smart sensors & IoT for modern precision farming</p>
                </Link>

              </div>
            )}

          </div>

          <Link to="/schemes" className="navbar__link">
            {t("schemes")}
          </Link>

          <Link to="https://sahaya-kissan-research.vercel.app/" className="navbar__link">
            {t("research")}
          </Link>
        </div>

        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="navbar__language"
        >
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="as">অসমীয়া</option>
        </select>

        <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <div className="navbar__mobile-container">
          <div className="navbar__mobile-business">
            <span className="navbar__mobile-title">{t("business")}</span>

            <Link to="/seeds" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mobile-link-title">{t("seeds")}</span>
              <span className="mobile-link-cta">Buy certified seeds</span>
            </Link>

            <Link to="/tea" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mobile-link-title">{t("tea")}</span>
              <span className="mobile-link-cta">Tea saplings & plantation</span>
            </Link>

            <Link to="/sensors-iot" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mobile-link-title">{t("sensorsAndIoT")}</span>
              <span className="mobile-link-cta">Smart farming devices</span>
            </Link>
          </div>

          
          <Link to="/schemes" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
            {t("schemes")}
          </Link>
          
          <Link to="https://sahaya-kissan-research.vercel.app/" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
            {t("research")}
          </Link>
          
          <select
            value={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              setMobileOpen(false);
            }}
            className="navbar__mobile-language"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="as">অসমীয়া</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
