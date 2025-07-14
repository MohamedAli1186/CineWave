import { useEffect, useRef, useState } from "react";
import { searchMulti } from "../services/tmdb";
import type { INode, ISearch } from "../types/movies";
import PosterCard from "./PosterCard";
import Pagination from "./Pagination";

const SearchMulti = () => {
  const direction = useRef(null);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [results, setResults] = useState<INode<ISearch[]>>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchSearch = async () => {
        const res = await searchMulti(search, pageNo);
        setResults(res);
      };
      fetchSearch();
    }, 500);
  }, [pageNo, search]);

  return (
    <div className="w-full mb-6">
      <input
        ref={direction}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for movies, TV shows, people..."
        className="w-full bg-[#2d1e1e] text-white px-5 py-3 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#E8B5B8] shadow-md"
      />
      {results.results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full my-8">
          {results.results.map((result, i) => (
            <PosterCard
              id={result.id}
              key={result.id + i}
              image={result.poster_path}
              title={result.name}
              subtitle={result.overview}
            />
          ))}
        </div>
      )}
      {results.results.length > 0 && (
        <Pagination
          pageNo={pageNo}
          setPageNo={setPageNo}
          total_pages={results.total_pages}
          direction={direction}
        />
      )}
    </div>
  );
};

export default SearchMulti;
