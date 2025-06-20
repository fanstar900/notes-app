import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/profileInfo";

const Navbar = ({ userInfo, onClearSearch, onSearchNote }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    onSearchNote(searchQuery);
  };
  const handleClearSearch = () => {
    onClearSearch();
    setSearchQuery("");
  };

  return (
    <nav
      className="navbar "
      style={{ minHeight: "70px", backgroundColor: "lightblue" }}
    >
      {location.pathname === "/dashboard" ? (
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a className="navbar-brand display-6 fw-bold text-white" href="#">
              NOTES
            </a>
          </div>

          <div className="d-flex justify-content-center flex-grow-1">
            <div style={{ width: "100%", maxWidth: "500px" }}>
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>
          </div>

          <div className="d-flex align-items-center">
            <ProfileInfo onLogOut={onLogOut} userInfo={userInfo} />
          </div>
        </div>
      ) : (
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand" href="#">
            Notes
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
