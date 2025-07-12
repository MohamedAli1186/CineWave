import { Link } from "react-router-dom";
import logo from "../../public/CineWave.png";
import profile from "../../public/profile.png";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <nav className="flex justify-between items-center px-4 md:px-10 py-3 border-b border-gray-100 relative z-30 w-full">
        {/* Left: Logo & Hamburger */}
        <div className="flex items-center gap-4 md:gap-10">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white text-3xl mr-2 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-8 h-1 bg-white mb-1 rounded"></span>
            <span className="block w-8 h-1 bg-white mb-1 rounded"></span>
            <span className="block w-8 h-1 bg-white rounded"></span>
          </button>
          <Link to="/" className="text-xl font-bold">
            <img
              src={logo}
              alt="CineWave Logo"
              className="w-32 md:w-36 h-auto"
            />
          </Link>
          {/* Nav Links: hidden on mobile */}
          <ul className="hidden md:flex space-x-4 pt-2">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-gray-200">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/tv-shows" className="hover:text-gray-200">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className="hover:text-gray-200">
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
        {/* Right: Search/Profile/Signup */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Link
              to="/signup"
              className="btn"
              onClick={() => setIsLoggedIn(true)}
            >
              Signup
            </Link>
          ) : (
            <div className="relative flex items-center gap-4">
              <input
                type="text"
                placeholder="Search"
                className="w-32 md:w-64 btn pl-10 rounded-xl!"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <img src={profile} alt="Profile" className="w-10 h-auto" />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
