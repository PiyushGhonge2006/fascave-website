import React from "react";
import './navbar.css';

const Navbarr = () => {
  const navItems = [
    "Home" ,
    "About" ,
    "Services" ,
    "Portfolio" ,
    "Blog" ,
    "Contact us",
  ];

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
          {navItems.map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              className={item === "Home" ? "nav-link active" : "nav-link"}
            >
              {item}
            </a>
          ))}
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