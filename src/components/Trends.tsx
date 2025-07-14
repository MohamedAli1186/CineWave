import { useEffect, useState } from "react";
import { getTrends } from "../services/tmdb";
import type { IMovies } from "../types/movies";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const Trends = () => {
  const [trends, setTrends] = useState<IMovies[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrends = async () => {
      const res = await getTrends();
      setTrends(res.results);
    };
    fetchTrends();
  }, []);

  return (
    <section className="mx-auto mt-5">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay
        infiniteLoop
        interval={7000}
        selectedItem={currentIndex}
        onChange={setCurrentIndex}
        stopOnHover={false}
        swipeable
      >
        {trends.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="w-full max-h-[600px] flex items-end justify-center "
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="inset-0 h-fit w-auto rounded-2xl relative"
              style={{ filter: "brightness(0.70)" }}
            />
            <div className="absolute bottom-0 z-10 p-8 w-full text-start">
              <h2 className="text-lg md:text-2xl lg:text-6xl font-bold mb-2">
                Trending Now: {movie.title}
              </h2>
              <p className="text-xs md:text-lg">
                {movie.overview ? movie.overview.split(".")[0] + "." : ""}
              </p>
            </div>
          </Link>
        ))}
      </Carousel>
      <div className="w-full flex justify-end items-start py-3 bg-transparent text-white text-xs sm:text-sm">
        {trends.length > 0 && (
          <span>
            {currentIndex + 1} / {trends.length}
          </span>
        )}
      </div>
    </section>
  );
};

export default Trends;
