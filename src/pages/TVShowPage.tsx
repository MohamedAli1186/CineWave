import { useEffect, useRef, useState } from "react";
import PosterCard from "../components/PosterCard";
import { getTVShows } from "../services/tmdb";
import type { ITVShow, INode } from "../types/movies";
import SearchMulti from "../components/SearchMulti";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
import Pagination from "../components/Pagination";
import TVFiltering from "../components/TVFiltering";

const TVShowPage = () => {
  const [genre, setGenre] = useState<number>();
  const [pageNo, setPageNo] = useState(1);
  const [tvShows, setTvShows] = useState<INode<ITVShow[]>>();
  const direction = useRef(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await getTVShows(pageNo, genre);
      setTvShows({
        page: pageNo,
        results: res?.results,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
      });
    };
    fetchTVShows();
  }, [pageNo, genre]);

  return (
    <main className="min-h-screen mt-16 bg-[#1f1414] w-full flex flex-col items-center p-container pt-8">
      {/* Search Bar */}
      <SearchMulti />

      <ShinyText
        ref={direction}
        text="TV Shows"
        className="my-6"
        disabled={false}
        speed={3}
      />

      <TVFiltering genre={genre} setGenre={setGenre} />

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
                type="tv"
                id={tvShow.id}
                key={tvShow.id + i}
                image={tvShow.poster_path}
                title={tvShow.name}
                subtitle={tvShow.overview}
              />
            ))}
          </section>

          <Pagination
            direction={direction}
            pageNo={pageNo}
            setPageNo={setPageNo}
            total_pages={tvShows?.total_pages || 1}
          />
        </>
      )}
    </main>
  );
};

export default TVShowPage;
