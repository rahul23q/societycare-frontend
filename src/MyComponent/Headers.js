import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const themeColors = {
    bgMint: "#d1e7e5",
    teal: "#2a9d8f",
    textMuted: "#5d717a",
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{ backgroundColor: themeColors.bgMint }}
    >
      <div className="container-fluid px-lg-5">

        {/* Brand / Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fw-bold text-dark"
          style={{ fontSize: "1.4rem" }}
        >
          <div
            className="me-2 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: themeColors.teal,
              padding: "6px",
              borderRadius: "10px",
            }}
          >
            <img
              src="https://img.icons8.com/ios-filled/22/ffffff/company.png"
              alt="logo"
            />
          </div>
          SocietyCare
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Center Links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                to="/#features"
                className="nav-link px-3"
                style={{ color: themeColors.textMuted, fontWeight: 500 }}
              >
                Features
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/#how-it-works"
                className="nav-link px-3"
                style={{ color: themeColors.textMuted, fontWeight: 500 }}
              >
                How It Works
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link px-3"
                style={{ color: themeColors.textMuted, fontWeight: 500 }}
              >
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="d-flex align-items-center">
            <NavLink
              to="/login"
              className="nav-link me-4 text-dark fw-medium"
            >
              Sign In
            </NavLink>

            <Link
              to="/login"
              className="btn px-4 shadow-sm"
              style={{
                backgroundColor: themeColors.teal,
                color: "white",
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
