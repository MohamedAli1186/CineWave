import { useParams } from "react-router-dom";
import { getMovie, getMovieCast } from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovie, IMovieCast } from "../types/movies";
import broken from "../../public/broke.webp";

const MoviePage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<IMovie>();
  const [cast, setCast] = useState<IMovieCast>();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(+id!);
      setMovieData(res);
      const castRes = await getMovieCast(+id!);
      setCast(castRes);
    };
    fetchMovie();
  }, [id]);

  if (!movieData || !cast) return <p className="text-white p-8">Loading...</p>;

  return (
    <main className="pb-20 w-full flex flex-col items-start p-container pt-8">
      {/* Backdrop */}
      <div className="w-full relative mb-10 pt-8">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieData?.backdrop_path}`}
          alt={movieData?.title}
          className="w-full max-h-[600px] object-cover object-top rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#1f1414] to-transparent w-full h-40 rounded-b-lg" />
      </div>

      {/* Main Info Section */}
      <section className="flex flex-col lg:flex-row w-full gap-10">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
          alt={movieData?.title}
          className="md:w-64 w-48 rounded-lg shadow-lg  mx-auto "
        />

        {/* Movie Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold md:text-start text-center">
            {movieData?.title}
          </h1>
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
            <p>💰 Budget: ${movieData?.budget.toLocaleString("en-US")}</p>
            <p>💰 Revenue: ${movieData?.revenue.toLocaleString("en-US")}</p>
          </div>
        </div>
      </section>

      {/* Cast */}
      {cast?.cast?.length > 0 && (
        <section className="mt-12 w-full">
          <h2 className="text-3xl md:text-start text-center font-semibold mb-6">
            Cast
          </h2>
          <div className="flex justify-center flex-wrap md:gap-10 gap-5">
            {cast?.cast?.map(
              (person, index) =>
                index < 8 && (
                  <div key={person.id} className="flex flex-col items-center ">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                          : broken
                      }
                      alt={person.name}
                      className="md:h-40 h-20 rounded-full"
                    />
                    <span className="md:text-sm text-[10px] mt-2">
                      {person.name}
                    </span>
                    <p className="text-[10px] text-gray-400 w-[100px]">
                      {person.character}
                    </p>
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {/* Production Companies */}
      {movieData?.production_companies.length > 0 && (
        <section className="mt-12 w-full">
          <h2 className="text-3xl md:text-start text-center font-semibold mb-6">
            Production Companies
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            {movieData?.production_companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col items-center gap-3"
              >
                {company.logo_path && (
                  <img
                    src={
                      company.logo_path
                        ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                        : broken
                    }
                    alt={company.name}
                    className="md:h-16 h-12 object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default MoviePage;
