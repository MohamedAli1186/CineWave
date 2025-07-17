import { useParams } from "react-router-dom";
import {
  getMovie,
  getMovieCast,
  getMovieVideos,
  getSimilarMovies,
} from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovie, IMovieCast, IMovies, IVideo } from "../types/movies";
import Cast from "../components/movieTvPageComponents/Cast";
import ProductionCompanies from "../components/movieTvPageComponents/ProductionCompanies";
import MoviesImages from "../components/MoviesImages";
import BtnsResources from "../components/movieTvPageComponents/BtnsResources";
import SimilarMovies from "../components/movieTvPageComponents/SimilarMovies";
import Trailers from "../components/movieTvPageComponents/Trailers";

const MoviePage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<IMovie>();
  const [cast, setCast] = useState<IMovieCast>();
  const [similarMovies, setSimilarMovies] = useState<IMovies[]>();
  const [trailer, setTrailer] = useState<IVideo[]>();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(+id!);
      setMovieData(res);
      const castRes = await getMovieCast(+id!);
      setCast(castRes);
      const similarMoviesRes = await getSimilarMovies(+id!);
      setSimilarMovies(similarMoviesRes.results);
      const trailerRes = await getMovieVideos(+id!);
      setTrailer(trailerRes.results);
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
            <BtnsResources
              showId={movieData?.id}
              homePage={movieData?.homepage}
            />
          </div>
          {movieData?.tagline && (
            <p className="text-lg italic md:text-start text-center text-gray-300">
              {movieData?.tagline}
            </p>
          )}
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

      {/* Trailers */}
      {trailer && <Trailers trailer={trailer} />}

      {/* Similar Movies */}
      <SimilarMovies similar={similarMovies} />
    </main>
  );
};

export default MoviePage;
