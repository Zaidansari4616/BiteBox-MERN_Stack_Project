import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalCart, isLoggedIn, currentUser, logout, setSearchTerm } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    alert("Logged out successfully!");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          setMenu("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <i className="bi bi-box-seam">BiteBox</i>
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Home
        </Link>
        <a href="#about">About</a>
        <a href="#footer">Contact</a>
        <a href="#explore-menu">Menu</a>
      </ul>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search food..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <i className="bi bi-search"></i>
        </div>

        {/* Cart */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <i className="bi bi-cart3"></i>
          </Link>
          <div className={getTotalCart() === 0 ? "" : "dot"}></div>
        </div>

        {/* AUTH */}
        {isLoggedIn ? (
          <div className="navbar-profile">
            <div
              className="navbar-profile-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <i className="bi bi-person-circle"></i>
              <span>{currentUser?.name}</span>
            </div>

            {showDropdown && (
              <div className="navbar-dropdown">
                <div className="dropdown-item">
                  <i className="bi bi-envelope"></i>
                  <span>{currentUser?.email}</span>
                </div>

                {/* ✅ ADMIN DASHBOARD INSIDE DROPDOWN */}
                {currentUser?.role === "admin" && (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/admin");
                      setShowDropdown(false);
                    }}
                  >
                    <i className="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                  </div>
                )}

                <div className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
