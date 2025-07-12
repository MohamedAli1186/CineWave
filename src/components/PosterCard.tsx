import React from "react";

interface PosterCardProps {
  image: string;
  title: string;
  subtitle?: string;
}

const PosterCard: React.FC<PosterCardProps> = ({ image, title, subtitle }) => {
  return (
    <div className="bg-[#40292B] rounded-xl overflow-hidden shadow-lg flex flex-col items-center p-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
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
    </div>
  );
};

export default PosterCard;
