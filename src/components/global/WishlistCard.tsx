import React from "react";
import { Link } from "react-router-dom";
import broken from "../../../public/broke.webp";

interface WishlistCardProps {
  image: string;
  title: string;
  subtitle?: string;
  id: number;
  type?: string;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  image,
  title,
  subtitle,
  id,
  type,
}) => {
  return (
    <Link
      to={type === "movie" ? `/movie/${id}` : `/tv/${id}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-[#40292B] rounded-xl overflow-hidden shadow-lg h-full flex flex-col items-center pb-2 cursor-pointer"
    >
      <img
        src={image ? `https://image.tmdb.org/t/p/w500${image}` : broken}
        alt={title}
        className="w-full h-[150px] object-cover mb-3 hover:scale-105 transition-transform duration-200"
      />
      <h3 className="text-lg font-semibold mb-1 text-white text-center truncate w-full px-3">
        {title}
      </h3>
      <p className="text-sm text-[#E8B5B8] truncate text-center w-full px-3">
        {subtitle}
      </p>
    </Link>
  );
};

export default WishlistCard;
