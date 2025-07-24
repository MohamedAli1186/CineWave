import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

const ProfileDropDown = ({ onClose }: { onClose: () => void }) => {
  const { isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animate on appear
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-12 right-0 z-10 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {isLoggedIn && (
        <button
          type="button"
          className="pink-btn"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          Log out
        </button>
      )}
      <Link to="/watchlist" className="pink-btn" onClick={onClose}>
        My Watchlist
      </Link>
    </div>
  );
};

export default ProfileDropDown;
