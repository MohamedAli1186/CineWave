import { Link, useParams } from "react-router-dom";
import {
  addToWatchlist,
  getMovie,
  getMovieCast,
  getSimilarMovies,
} from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovie, IMovieCast, IMovies } from "../types/movies";
import PosterCard from "../components/PosterCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cast from "../components/Cast";
import ProductionCompanies from "../components/ProductionCompanies";
import MoviesImages from "../components/MoviesImages";
import { showToast } from "../components/global/Toast";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};
const MoviePage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<IMovie>();
  const [cast, setCast] = useState<IMovieCast>();
  const [similarMovies, setSimilarMovies] = useState<IMovies[]>();

  const sessionId = localStorage.getItem("session_id");

  const addToWatchlists = async (media_type: string, movieId: number) => {
    if (!sessionId) {
      console.log("No session ID found");
      return;
    }
    try {
      const res = await addToWatchlist(sessionId, media_type, movieId);
      if (res.success) {
        showToast({ message: "Added to Watchlist!" });
      } else {
        showToast({ message: "Something went wrong.", type: "error" });
      }
    } catch (err) {
      showToast({
        message: "Failed to add movie to watchlist.",
        type: "error",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(+id!);
      setMovieData(res);
      const castRes = await getMovieCast(+id!);
      setCast(castRes);
      const similarMoviesRes = await getSimilarMovies(+id!);
      setSimilarMovies(similarMoviesRes.results);
    };
    fetchMovie();
  }, [id]);

  if (!movieData || !cast || !similarMovies)
    return <p className="text-white p-8">Loading...</p>;

  return (
    <main className="pb-20 w-full flex flex-col items-start pt-8">
      {/* Backdrop */}
      <div className="w-full relative mb-10 pt-8  p-container">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieData?.backdrop_path}`}
          alt={movieData?.title}
          className="w-full max-h-[600px] object-cover object-top rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#1f1414] to-transparent w-full h-40 rounded-b-lg" />
      </div>

      {/* Main Info Section */}
      <section className="flex flex-col lg:flex-row w-full gap-10 p-container">
        {/* Poster */}
        {movieData?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
            alt={movieData?.title}
            className="md:w-auto h-80 w-48 rounded-lg shadow-lg  mx-auto"
          />
        )}

        {/* Movie Info */}
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col justify-between gap-4">
            <h1 className="text-4xl font-bold md:text-start text-center">
              {movieData?.title}
            </h1>
            <div className="flex gap-4">
              <Link to={movieData?.homepage} className="btn" target="_blank">
                See More
              </Link>
              <button
                type="button"
                className="pink-btn"
                onClick={() => {
                  addToWatchlists("movie", movieData.id);
                }}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
          {movieData?.tagline && (
            <p className="text-lg italic md:text-start text-center text-gray-300">
              {movieData?.tagline}
            </p>
          )}
          {movieData?.video &&
            (console.log(movieData?.video),
            (
              <p className="text-lg italic md:text-start text-center text-gray-300">
                {movieData?.video}
              </p>
            ))}

          <div className="text-sm flex gap-6 text-gray-400">
            <p>🗓️ {movieData?.release_date}</p>
            <p>⏱️ {movieData?.runtime} min</p>
            <p>
              ⭐ {movieData?.vote_average} ({movieData?.vote_count} votes)
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
            {movieData?.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-[#40292B] rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-base md:text-start text-center leading-relaxed mt-4">
            {movieData?.overview}
          </p>

          {/* Budget and Revenue */}
          <div className="text-sm flex gap-6 text-gray-400">
            {movieData?.budget > 0 && (
              <p>💰 Budget: ${movieData?.budget.toLocaleString("en-US")}</p>
            )}
            {movieData?.revenue > 0 && (
              <p>💰 Revenue: ${movieData?.revenue.toLocaleString("en-US")}</p>
            )}
          </div>
        </div>
      </section>
      <MoviesImages id={+id!} />

      {/* Production Companies */}
      <ProductionCompanies
        production_companies={movieData?.production_companies}
      />

      {/* Cast */}
      <Cast cast={cast} />

      {/* Similar Movies */}
      {similarMovies?.length > 0 && (
        <section className="mt-12 w-full p-container" key={id}>
          <h2 className="text-3xl md:text-start text-center font-semibold mb-6">
            Similar Movies
          </h2>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            keyBoardControl={true}
            transitionDuration={500}
            containerClass=""
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="sm:p-5 p-3"
          >
            {similarMovies?.map((movie) => (
              <PosterCard
                key={movie.id}
                id={movie.id}
                type="movie"
                image={movie.poster_path}
                title={movie.title}
                subtitle={movie.overview}
              />
            ))}
          </Carousel>
        </section>
      )}
    </main>
  );
};

export default MoviePage;
