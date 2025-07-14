import { useEffect, useState } from "react";
import { getTVGenres } from "../services/tmdb";

const TVFiltering = ({
  genre,
  setGenre,
}: {
  genre: number | undefined;
  setGenre: (genre: number | undefined) => void;
}) => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const allGenres = [{ id: -1, name: "All Genres" }, ...genres];

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await getTVGenres();
      setGenres(res?.genres || []);
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-8 w-full justify-start">
      {/* Genre Dropdown */}
      <div className="relative">
        <select
          aria-label="Genre"
          value={genre ?? -1}
          onChange={(e) => {
            const value = +e.target.value;
            setGenre(value === -1 ? undefined : value);
          }}
          className="bg-[#40292B] text-white w-[150px] h-10 text-sm appearance-none cursor-pointer px-4 pr-10 rounded-xl focus:outline-none"
        >
          {allGenres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TVFiltering;
