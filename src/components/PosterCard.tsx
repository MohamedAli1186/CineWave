import React from "react";
import { Link } from "react-router-dom";

interface PosterCardProps {
  image: string;
  title: string;
  subtitle?: string;
  id: number;
}

const PosterCard: React.FC<PosterCardProps> = ({
  image,
  title,
  subtitle,
  id,
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      className="bg-[#40292B] rounded-xl overflow-hidden shadow-lg flex flex-col items-center p-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      <img
        src={
          image
            ? `https://image.tmdb.org/t/p/w500${image}`
            : "https://image.tmdb.org/t/p/w500/pqeqlmK1KEBfEfABnPjEr7oXjWL.jpg"
        }
        alt={title}
        className="w-full h-full object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-1 text-white text-center truncate w-full px-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-[#E8B5B8] text-center truncate w-full px-1">
          {subtitle}
        </p>
      )}
    </Link>
  );
};

export default PosterCard;
