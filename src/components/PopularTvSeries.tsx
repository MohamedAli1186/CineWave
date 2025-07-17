import { useEffect, useRef, useState } from "react";
import Pagination from "./global/Pagination";
import PosterCard from "./global/PosterCard";
import type { INode, ITVSeries } from "../types/movies";
import { getTvSeries } from "../services/tmdb";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";

const PopularTvSeries = () => {
  const [pageNo, setPageNo] = useState(1);
  const [tvSeries, setTvSeries] = useState<INode<ITVSeries[]>>();
  const direction = useRef(null);

  useEffect(() => {
    const fetchTvSeries = async () => {
      const res = await getTvSeries(pageNo);
      setTvSeries({
        page: pageNo,
        results: res?.results,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
      });
    };
    fetchTvSeries();
  }, [pageNo]);
  return (
    <div className="mt-8">
      <ShinyText
        ref={direction}
        text="Top Rated TV Series"
        disabled={false}
        speed={3}
        className="mb-8"
      />{" "}
      {tvSeries?.results?.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div>No results found</div>
        </div>
      )}
      {tvSeries && tvSeries?.results?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mb-8">
            {tvSeries?.results?.map((tvSeries, i) => (
              <PosterCard
                id={tvSeries.id}
                key={tvSeries.id + i}
                image={tvSeries.poster_path}
                title={tvSeries.name}
                subtitle={tvSeries.overview}
              />
            ))}
          </section>

          <Pagination
            direction={direction}
            pageNo={pageNo}
            setPageNo={setPageNo}
            total_pages={tvSeries?.total_pages || 1}
          />
        </>
      )}
    </div>
  );
};

export default PopularTvSeries;
