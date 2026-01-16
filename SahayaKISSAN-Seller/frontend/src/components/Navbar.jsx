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
        <Link to="http://localhost:5173/" className="navbar__logo">
          <img src="/Logo.svg" alt="" />
        </Link>

        <div className="navbar__menu">

          <Link to="/seller/my-sells" className="navbar__link">
            {t("sellerNav.mySells")}
          </Link>

          <Link to="/seller/add-new" className="navbar__link">
            {t("sellerNav.addNew")}
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
          <Link
            to="/seller/my-sells"
            className="navbar__mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {t("sellerNav.mySells")}
          </Link>

          <Link
            to="/seller/add-new"
            className="navbar__mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {t("sellerNav.addNew")}
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
