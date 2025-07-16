import { useEffect, useRef, useState } from "react";
import PosterCard from "../components/PosterCard";
import { getMovies } from "../services/tmdb";
import type { IMovies, INode } from "../types/movies";
import SearchMulti from "../components/SearchMulti";
import Pagination from "../components/Pagination";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
import MoviesFiltering from "../components/MoviesFiltering";

const Movies = () => {
  const direction = useRef(null);
  const [genre, setGenre] = useState<number>();
  const [year, setYear] = useState<number>();
  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState<INode<IMovies[]>>();

  useEffect(() => {
    setPageNo(1);
  }, [genre, year]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(pageNo, genre, year);
      setMovies({
        page: pageNo,
        results: res?.results,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
      });
    };
    fetchMovies();
  }, [pageNo, genre, year]);

  return (
    <main className="min-h-screen mt-16 bg-[#1f1414] w-full flex flex-col items-center p-container pt-8">
      <SearchMulti />
      <ShinyText
        ref={direction}
        text="Movies"
        disabled={false}
        speed={3}
        className="my-8"
      />
      <MoviesFiltering
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
      />

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
                type="movie"
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
