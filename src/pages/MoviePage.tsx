import { useParams } from "react-router-dom";
import { getMovie, getMovieCast } from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovie, IMovieCast } from "../types/movies";

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
      <div className="w-full relative mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieData?.backdrop_path}`}
          alt={movieData?.title}
          className="w-full h-[550px] object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#1f1414] to-transparent w-full h-40 rounded-b-lg" />
      </div>

      {/* Main Info Section */}
      <section className="flex flex-col lg:flex-row w-full gap-10">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
          alt={movieData?.title}
          className="w-64 rounded-lg shadow-lg"
        />

        {/* Movie Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movieData?.title}</h1>
          {movieData?.tagline && (
            <p className="text-lg italic text-gray-300">{movieData?.tagline}</p>
          )}

          <div className="text-sm flex gap-6 text-gray-400">
            <p>🗓️ {movieData?.release_date}</p>
            <p>⏱️ {movieData?.runtime} min</p>
            <p>
              ⭐ {movieData?.vote_average} ({movieData?.vote_count} votes)
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2">
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
          <p className="text-base text-start leading-relaxed mt-4">
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
          <h2 className="text-3xl text-start font-semibold mb-6">Cast</h2>
          <div className="flex flex-wrap gap-6">
            {cast?.cast?.map((person) => (
              <div key={person.id} className="flex items-center gap-3">
                <img
                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                  alt={person.name}
                  className="h-10 object-contain"
                />
                <span className="text-sm">{person.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Companies */}
      {movieData?.production_companies.length > 0 && (
        <section className="mt-12 w-full">
          <h2 className="text-3xl text-start font-semibold mb-6">
            Production Companies
          </h2>
          <div className="flex flex-wrap gap-6">
            {movieData?.production_companies.map((company) => (
              <div key={company.id} className="flex items-center gap-3">
                {company.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-10 object-contain"
                  />
                )}
                <span className="text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default MoviePage;
