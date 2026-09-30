import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContact } from "../contact/Contactbutton";

const Navbar = () => {
  const { openContact } = useContact();
  const navigate = useNavigate();

  const handlePortfolio = (event) => {
    event.preventDefault();

    if (window.location.pathname === "/") {
      document
        .getElementById("portfolio")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("portfolio")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Logo */}
        <div className="brand">
          <Link to="/" className="brand">
            <div className="logo-box">
              <span>F</span>
            </div>

            <div className="brand-name">
              <span>IT SOLUTIONS</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="nav-links">

          {/* Home */}
          <Link
            to="/"
            className="nav-link"
          >
            Home
          </Link>

          {/* About */}
          <Link
            to="/about-us"
            className="nav-link"
          >
            About
          </Link>

          {/* Services */}
          <Link
            to="/features"
            className="nav-link"
          >
            Services
          </Link>

          {/* Portfolio */}
          <a
            href="#portfolio"
            className="nav-link"
            onClick={handlePortfolio}
          >
            Portfolio
          </a>

          {/* Blog */}
          <Link
            to="/blog"
            className="nav-link"
          >
            Blog
          </Link>
          {/* Contact */}
          <a
            href="#contact"
            className="nav-link"
            onClick={(event) => {
              event.preventDefault();
              openContact("navbar");
            }}
          >
            Contact us
          </a>

        </div>

        {/* Consultation */}
        <button
          type="button"
          className="consultation-btn"
          onClick={() => openContact("navbar")}
        >
          <span>Book a Free Consultation</span>
        </button>

      </nav>
    </header>
  );
};

export default Navbar;