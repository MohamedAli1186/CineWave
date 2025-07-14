import React from "react";
import { Link } from "react-router-dom";

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
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
