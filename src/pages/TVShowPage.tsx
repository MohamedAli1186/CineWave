import { useEffect, useState } from "react";
import PosterCard from "../components/PosterCard";
import { getTVShows } from "../services/tmdb";
import type { ITVShow, INode } from "../types/movies";

const genres = [
  "All Genres",
  "Adventure",
  "Sci-Fi",
  "Drama",
  "Thriller",
  "Mystery",
  "Fantasy",
  "Documentary",
  "Romance",
  "Family",
];
const ratings = ["All Ratings", "9+", "8+", "7+", "6+"];
const years = ["All Years", "2025", "2024", "2023", "2022", "2021"];

const TVShowPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All Ratings");
  const [year, setYear] = useState("All Years");
  const [pageNo, setPageNo] = useState(1);
  const [tvShows, setTvShows] = useState<INode<ITVShow[]>>();

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows(pageNo);
      const filtered = res?.results.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.overview.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filtered);
      setTvShows({
        page: pageNo,
        results: filtered,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
      });
    };
    fetchTVShows();
  }, [pageNo, search]);

  console.log(tvShows);

  return (
    <main className="min-h-screen bg-[#1f1414] w-full flex flex-col items-center p-container pt-8">
      {/* Search Bar */}
      <div className="w-full mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for tvShows, TV shows, people..."
          className="w-full bg-[#2d1e1e] text-white px-5 py-3 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#E8B5B8] shadow-md"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 w-full justify-start">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-[#40292B] text-white cursor-pointer px-4 py-2 rounded-xl focus:outline-none"
        >
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="bg-[#40292B] text-white cursor-pointer px-4 py-2 rounded-xl focus:outline-none"
        >
          {ratings.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#40292B] text-white cursor-pointer px-4 py-2 rounded-xl focus:outline-none"
        >
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Movie Poster Grid */}
      {tvShows?.results?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div>No results found</div>
        </div>
      )}
      {tvShows && tvShows?.results?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mb-8">
            {tvShows?.results?.map((tvShow, i) => (
              <PosterCard
                key={tvShow.id + i}
                image={tvShow.poster_path}
                title={tvShow.name}
                subtitle={tvShow.overview}
              />
            ))}
          </section>

          <div className="flex items-center gap-2 mb-10">
            <button
              onClick={() => setPageNo((p) => Math.max(1, p - 1))}
              disabled={pageNo === 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
                pageNo === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#40292B]"
              }`}
            >
              {"<"}
            </button>
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPageNo(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-8 h-8 rounded-full flex items-center cursor-pointer justify-center ${
                  pageNo === i + 1
                    ? "bg-[#E8B5B8] text-[#1F1414]"
                    : "text-white hover:bg-[#40292B]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setPageNo((p) => Math.min(tvShows!.total_pages, p + 1))
              }
              disabled={pageNo === tvShows?.total_pages}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
                pageNo === tvShows?.total_pages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#40292B]"
              }`}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default TVShowPage;
