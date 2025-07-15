import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import PosterCard from "./PosterCard";
import type { INode, IMovies } from "../types/movies";
import { getPopularMovies } from "../services/tmdb";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";

const PopularMovies = () => {
  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState<INode<IMovies[]>>();
  const direction = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getPopularMovies(pageNo);
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
    <div>
      <ShinyText
        ref={direction}
        text="Top Rated Movies"
        disabled={false}
        speed={3}
        className="my-8"
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
                id={movie.id}
                type="movie"
                key={movie.id + i}
                image={movie.poster_path}
                title={movie.title}
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
    </div>
  );
};

export default PopularMovies;
