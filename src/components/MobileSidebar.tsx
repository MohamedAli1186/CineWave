import React from "react";
import { Link } from "react-router-dom";
import { showToast } from "./global/Toast";
import { createToken } from "../services/tmdb";
import { useAuth } from "../hooks/useAuth";
import { getCookie } from "../utils/cookies";
interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  username?: string;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/tv-shows", label: "TV Shows" },
  { to: "/watchlist", label: "Watchlist" },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  open,
  onClose,
  username,
}) => {
  const lastPageUrl = window.location.href;
  const { sessionId, isLoggedIn, login } = useAuth();
  const requestToken = getCookie("request_token");

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
        <nav className="flex flex-col gap-6 mt-16 px-8">
          {username && (
            <p className="text-[#E8B5B8] text-lg font-medium mb-10">
              Hola, {username}
            </p>
          )}
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
          {!isLoggedIn && !sessionId && !requestToken && (
            <button
              type="button"
              className="pink-btn"
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
                await login();
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
