import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ userInfo, onClearSearch, onSearchNote }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    onSearchNote(searchQuery);
  };

  const handleClearSearch = () => {
    onClearSearch();
    setSearchQuery("");
  };

  return (
    <nav className="navbar">
      {location.pathname === "/dashboard" ? (
        <div className="container-fluid d-flex align-items-center flex-nowrap">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a className="navbar-brand fw-bold text-white app-title" href="#">
              NoteSphere
            </a>
          </div>

          {/* Hamburger Menu - for xs screens */}
          <button
            className="btn d-md-none ms-auto"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <GiHamburgerMenu color="white" size={24} />
          </button>

          {/* Search Bar - hidden on xs screens */}
          <div
            className="flex-grow-1 mx-2 d-none d-md-flex"
            style={{ minWidth: "100px" }}
          >
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>
          </div>

          {/* Profile Info - hidden on xs screens */}
          <div className="flex-shrink-0 d-none d-md-block">
            <ProfileInfo onLogOut={onLogOut} userInfo={userInfo} />
          </div>
        </div>
      ) : (
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand" href="#">
            NoteSphere
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
