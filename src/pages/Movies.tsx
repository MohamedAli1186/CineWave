import { useEffect, useRef, useState } from "react";
import PosterCard from "../components/PosterCard";
import { getMovies } from "../services/tmdb";
import type { IMovies, INode } from "../types/movies";
import SearchMulti from "../components/SearchMulti";
import Pagination from "../components/Pagination";

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

const Movies = () => {
  const direction = useRef(null);
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All Ratings");
  const [year, setYear] = useState("All Years");
  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState<INode<IMovies[]>>();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(pageNo);
      setMovies({
        page: pageNo,
        results: res?.results,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
      });
    };
    fetchMovies();
  }, [pageNo]);

  return (
    <main className="min-h-screen bg-[#1f1414] w-full flex flex-col items-center p-container pt-8">
      {/* Search Bar */}
      <SearchMulti />
      <h1 className="text-4xl font-bold mb-6" ref={direction}>
        Movies
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 w-full justify-start">
        <select
          aria-label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-[#40292B] text-white cursor-pointer px-4 py-2 rounded-xl focus:outline-none"
        >
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <select
          aria-label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="bg-[#40292B] text-white cursor-pointer px-4 py-2 rounded-xl focus:outline-none"
        >
          {ratings.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <select
          aria-label="Year"
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
      {movies?.results?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div>No results found</div>
        </div>
      )}
      {movies && movies?.results?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mb-8">
            {movies?.results?.map((movie, i) => (
              <PosterCard
                id={movie.id}
                key={movie.original_title + i}
                image={movie.poster_path}
                title={movie.original_title}
                subtitle={movie.overview}
              />
            ))}
          </section>

          <Pagination
            direction={direction}
            pageNo={pageNo}
            setPageNo={setPageNo}
            total_pages={movies?.total_pages || 1}
          />
        </>
      )}
    </main>
  );
};

export default Movies;
