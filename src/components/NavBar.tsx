import { Link } from "react-router-dom";
import logo from "../../public/CineWave.png";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import SearchMulti from "./global/SearchMulti";
import { createToken } from "../services/tmdb";
import { showToast } from "./global/Toast";
import { useAuth } from "../hooks/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/tv-shows", label: "TV Shows" },
  { to: "/watchlist", label: "Watchlist" },
];

const Navbar = () => {
  const lastPageUrl = window.location.href;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const requestToken = localStorage.getItem("request_token");
  const { sessionId, isLoggedIn, login, logout } = useAuth();

  const fetchSession = async () => {
    const res = await createToken();
    if (res.success) {
      showToast({ message: "Signing up..." });
    } else {
      showToast({ message: "Something went wrong.", type: "error" });
    }
    window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=${lastPageUrl}`;
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <nav className="flex justify-between items-center px-4 md:px-10 py-3 border-b-[0.1px] bg-[#2b1b1b] border-gray-100  z-50 w-full fixed top-0">
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
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-gray-200"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Search/Profile/Signup */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="relative flex items-center gap-4">
              <SearchMulti />
              <button
                type="button"
                className="pink-btn hidden md:flex"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          ) : !requestToken ? (
            <button
              type="button"
              className="btn"
              onClick={() => fetchSession()}
            >
              Signup
            </button>
          ) : (
            requestToken &&
            !sessionId && (
              <button
                type="button"
                className="pink-btn transition hover:scale-105"
                onClick={async () => {
                  await login(requestToken!);
                }}
              >
                Create Session
              </button>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
