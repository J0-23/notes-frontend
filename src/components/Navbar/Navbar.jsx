import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import LogoImg from "../Navbar/logo.png";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // handle logout (navigates to login page)
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // placeholder search handler
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  // clears search input
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <img
          src={LogoImg}
          alt="Logo"
          className="hidden md:block h-10 w-auto object-contain"
        />
        <span className="block md:hidden">Jorge Notes </span>

        {/* Search bar for filtering notes */}
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        {/* User profile info with logout */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
