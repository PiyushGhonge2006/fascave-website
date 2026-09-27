import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navbar.css';

const navItems = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Blog",
  "Contact us",
];

const routes = {
  Home: "/",
  About: "/about-us",
  Blog: "/blog",
};

const Navbarr = () => {
  const { pathname } = useLocation();

  const isActive = (item) => {
    if (item === "Home") return pathname === "/";
    return routes[item] ? pathname === routes[item] : false;
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Logo */}
        <div className="brand">
          <div className="logo-box">
            <span>F</span>
          </div>

          <div className="brand-name">
            <span>IT SOLUTIONS</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          {navItems.map((item) =>
            routes[item] ? (
              <Link
                to={routes[item]}
                key={item}
                className={isActive(item) ? "nav-link active" : "nav-link"}
              >
                {item}
              </Link>
            ) : (
              <a
                href={`#${item.toLowerCase()}`}
                key={item}
                className="nav-link"
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* CTA */}
        <button className="consultation-btn">
          <span>Book a Free Consultation</span>

          <span className="arrow-circle">
            <span>→</span>
          </span>
        </button>

      </nav>
    </header>
  );
};

export default Navbarr;