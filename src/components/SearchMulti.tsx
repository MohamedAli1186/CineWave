import { useEffect, useRef, useState } from "react";
import { searchMulti } from "../services/tmdb";
import type { INode, ISearch } from "../types/movies";
import { Link } from "react-router-dom";
import ActorPopup from "./ActorPopup";

const SearchMulti = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActorPopupOpen, setIsActorPopupOpen] = useState(false);
  const [selectedActor, setSelectedActor] = useState<number>();
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<INode<ISearch[]>>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  // ✅ Debounce
  useEffect(() => {
    if (!search) {
      setResults({ ...results, results: [] });
      return;
    }

    const timer = setTimeout(async () => {
      const res = await searchMulti(search);
      setResults(res);
      setShowResults(true);
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for movies, TV shows..."
        className="w-full bg-[#2d1e1e] text-white px-5 py-3 rounded-2xl text-lg focus:outline-none focus:ring-2 z-10 focus:ring-[#E8B5B8] shadow-md"
        onFocus={() => search && setShowResults(true)}
      />
      {showResults && results.results.length > 0 && (
        <div className="absolute top-14 w-full bg-[#40292B] rounded-xl items-start p-1 flex flex-col gap-2 max-h-[500px] overflow-y-auto z-50 shadow-lg">
          {results.results.map((result, i) => (
            <Link
              key={result.id + i}
              to={
                result.media_type === "movie"
                  ? `/movie/${result.id}`
                  : result.media_type === "tv"
                  ? `/tv/${result.id}`
                  : ""
              }
              onClick={() => {
                if (result.media_type === "person") {
                  setSelectedActor(result.id);
                  setIsActorPopupOpen(true);
                }
                setShowResults(false);
                setSearch("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 hover:bg-[#E8B5B8] p-1 rounded-xl hover:text-black w-full"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${
                  result.poster_path || result.profile_path
                }`}
                alt={result.name || result.title}
                className="w-10 h-10 object-cover rounded-full"
              />
              <p className="text-white font-bold text-start">
                {result.name || result.title}
              </p>
            </Link>
          ))}
        </div>
      )}
      {showResults && search && results.results.length === 0 && (
        <div className="absolute top-14 w-full bg-[#40292B] text-white text-center font-bold p-3 rounded-xl z-50">
          No results found
        </div>
      )}
      {isActorPopupOpen && selectedActor && (
        <ActorPopup
          onClose={() => setIsActorPopupOpen(false)}
          actorId={selectedActor}
        />
      )}
    </div>
  );
};

export default SearchMulti;
