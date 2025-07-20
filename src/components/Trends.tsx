import { useEffect, useState } from "react";
import { getTrends } from "../services/tmdb";
import type { IMovies } from "../types/movies";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 300000, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
const Trends = () => {
  const [trends, setTrends] = useState<IMovies[]>([]);
  useEffect(() => {
    const fetchTrends = async () => {
      const res = await getTrends();
      setTrends(res.results);
    };
    fetchTrends();
  }, []);

  return (
    <section className="mx-auto py-10">
      <Carousel
        swipeable={true}
        draggable={false}
        autoPlay
        infinite
        responsive={responsive}
        ssr={true}
        keyBoardControl={true}
        transitionDuration={500}
        arrows={true}
        removeArrowOnDeviceType={["mobile"]}
      >
        {trends.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="md:max-h-[630px] flex items-end justify-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="inset-0 h-fit w-fit rounded-2xl relative opacity-75"
            />
            <div className="absolute bottom-0 z-10 md:p-8 p-4 w-full text-start">
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
    </section>
  );
};

export default Trends;
