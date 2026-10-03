import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { goToPortfolio } from "../../utils/portfolioNavigation";
import { useConsultationModal } from "../consultation/consultationModalContext";
import useScrolledPast from "../../hooks/useScrolledPast";

/* Kept as data so the desktop bar and the mobile sheet render the
   same links, in the same order, from one place. */
const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Services", to: "/features" },
  { label: "Portfolio", to: null },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "Contact us", to: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const scrolled = useScrolledPast(12);
  const { openConsultation } = useConsultationModal();

  const [menuOpen, setMenuOpen] = useState(false);

  /* The sheet covers the page, so stop the body scrolling behind it. */
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  /* Escape closes the sheet, and the viewport growing past the
     breakpoint must not leave an orphaned open menu behind. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth > 850) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handlePortfolio = (event) => {
    /* A tap inside the sheet shouldn't also trigger the in-page jump. */
    if (menuOpen) event.preventDefault();

    closeMenu();
    goToPortfolio(navigate);
  };

  const handleConsultation = () => {
    closeMenu();
    openConsultation();
  };

  return (
    <header
      className={`navbar-wrapper${scrolled ? " is-scrolled" : ""}`}
    >
      <nav className="navbar">

        {/* Logo */}
        <div className="brand">
          <NavLink to="/" className="brand" end onClick={closeMenu}>
            <div className="logo-box">
              <span>F</span>
            </div>

            <div className="brand-name">
              <span>IT SOLUTIONS</span>
            </div>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="nav-links">

          {/* Home */}
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>

          {/* About */}
          <NavLink to="/about-us" className="nav-link">
            About
          </NavLink>

          {/* Services */}
          <NavLink to="/features" className="nav-link">
            Services
          </NavLink>

          {/* Portfolio */}
          <a
            href="#portfolio"
            className="nav-link"
            onClick={handlePortfolio}
          >
            Portfolio
          </a>

          {/* Blog */}
          <NavLink to="/blog" className="nav-link">
            Blog
          </NavLink>

          {/* Careers */}
          <NavLink to="/careers" className="nav-link">
            Careers
          </NavLink>

          {/* Contact */}
          <NavLink to="/contact" className="nav-link">
            Contact us
          </NavLink>

        </div>

        {/* Consultation */}
        <button
          type="button"
          className="consultation-btn"
          onClick={openConsultation}
        >
          <span>Book a Free Consultation</span>
        </button>

        {/* Mobile trigger */}
        <button
          type="button"
          className={`nav-toggle${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>

      </nav>


      {/* =========================================================
          MOBILE SHEET
          ========================================================= */}

      <div
        className={`nav-mobile${menuOpen ? " is-open" : ""}`}
        id="mobile-nav"
        hidden={!menuOpen}
      >
        <ul className="nav-mobile__list">
          {NAV_ITEMS.map((item) =>
            item.to ? (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className="nav-mobile__link"
                  end={item.to === "/"}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href="#portfolio"
                  className="nav-mobile__link"
                  onClick={handlePortfolio}
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className="nav-mobile__cta"
          onClick={handleConsultation}
        >
          Book a Free Consultation
        </button>
      </div>

    </header>
  );
};

export default Navbar;
