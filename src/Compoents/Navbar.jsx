import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/small-logo.png";
import menu from "../assets/menu.png";
import user from "../assets/jack.png";
import upload from "../assets/upload.png";
import notification from "../assets/notification.png";
import more from "../assets/more.png";
import searchIcon from "../assets/search.png";

const Navbar = ({ setSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm?.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <nav className="w-full flex items-center md:justify-between md:gap-0  gap-14 justify-auto fixed top-0 z-50 bg-gray-800 text-white md:px-5 px-2   py-4 overflow-hidden">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-3">
        <img
          src={menu}
          alt="Menu"
          className="w-5 h-5 cursor-pointer"
          onClick={() => setSidebar(prev => !prev)}
        />
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-6 h-6 object-top object-cover aspect-auto" />
          <h1 className="text-lg font-bold hidden sm:block">YourTube</h1>
        </Link>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex items-center bg-gray-200 rounded-2xl px-2 py-1 w-[60%] sm:w-[60%] md:w-[400px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search"
          className="w-full px-3 py-1 text-gray-900 font-semibold text-sm outline-none bg-transparent"
        />
        <button onClick={handleSearch}>
          <img src={searchIcon} alt="search" className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Icons */}
      <div className="hidden sm:flex items-center gap-4">
        <img src={upload} alt="Upload" className="w-5 h-5" />
        <img src={notification} alt="Notification" className="w-5 h-5" />
        <img src={more} alt="More" className="w-5 h-5" />
        <img src={user} alt="User" className="w-7 h-7 rounded-full object-cover" />
      </div>
    </nav>
  );
};

export default Navbar;
