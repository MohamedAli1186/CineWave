import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createSessionAuth,
  getSessionId,
  removeSessionId,
} from "../utils/auth";
import { showToast } from "./global/Toast";
import { createToken } from "../services/tmdb";
interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/tv-shows", label: "TV Shows" },
  { to: "/watchlist", label: "Watchlist" },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const sessionId = getSessionId();
  const requestToken = localStorage.getItem("request_token");
  useEffect(() => {
    const checkSessionId = () => {
      if (sessionId) {
        setIsLoggedIn(true);
      }
    };
    checkSessionId();
  }, [sessionId]);

  const fetchSession = async () => {
    const res = await createToken();
    if (res.success) {
      showToast({ message: "Signing up..." });
    } else {
      showToast({ message: "Something went wrong.", type: "error" });
    }
    window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:5173`;
  };
  return (
    <div
      className={`fixed inset-0 z-40 bg-black/75 bg-opacity-40 pt-20 transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <aside
        className={`fixed left-0 top-0 h-full w-64 pt-20 bg-[#253235] shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <nav className="flex flex-col gap-6 mt-16 px-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-lg font-medium hover:text-[#E8B5B8] transition-colors"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && sessionId && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                removeSessionId();
                showToast({ message: "Logged out successfully" });
              }}
            >
              Log out
            </button>
          )}
          {!isLoggedIn && !sessionId && !requestToken && (
            <button
              type="button"
              className="btn"
              onClick={() => fetchSession()}
            >
              Signup
            </button>
          )}
          {requestToken && !sessionId && (
            <button
              type="button"
              className="pink-btn transition hover:scale-105"
              onClick={async () => {
                await createSessionAuth(requestToken!);
                setIsLoggedIn(true);
              }}
            >
              Create Session
            </button>
          )}
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
