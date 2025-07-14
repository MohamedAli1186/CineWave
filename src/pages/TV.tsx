import { useParams } from "react-router-dom";
import { getTvShow, getTVShowCast } from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovieCast, ITVShows } from "../types/movies";
import broken from "../../public/broke.webp";

const TVPage = () => {
  const { id } = useParams();
  const [tvShowData, setTvShowData] = useState<ITVShows>();
  const [cast, setCast] = useState<IMovieCast>();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getTvShow(+id!);
      setTvShowData(res);
      const castRes = await getTVShowCast(+id!);
      setCast(castRes);
    };
    fetchMovie();
  }, [id]);

  if (!tvShowData || !cast) return <p className="text-white p-8">Loading...</p>;

  return (
    <main className="pb-20 w-full flex flex-col items-start p-container pt-8">
      {/* Backdrop */}
      <div className="w-full relative mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w1280${tvShowData?.backdrop_path}`}
          alt={tvShowData?.name}
          className="w-full max-h-[600px] object-cover object-top mx-auto rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#1f1414] to-transparent w-full h-40 rounded-b-lg" />
      </div>

      {/* Main Info Section */}
      <section className="flex flex-col lg:flex-row w-full gap-10">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${tvShowData?.poster_path}`}
          alt={tvShowData?.name}
          className="md:w-64 w-48 rounded-lg shadow-lg  mx-auto "
        />

        {/* Movie Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold md:text-start text-center">
            {tvShowData?.name}
          </h1>
          {tvShowData?.tagline && (
            <p className="text-lg italic md:text-start text-center text-gray-300">
              {tvShowData?.tagline}
            </p>
          )}

          <div className="text-sm flex justify-center md:justify-start gap-6 flex-wrap text-gray-400 text-nowrap">
            <p>🗓️ {tvShowData?.first_air_date}</p>
            <p>⏱️ {tvShowData?.episode_run_time} min</p>
            <p>
              ⭐ {tvShowData?.vote_average} ({tvShowData?.vote_count} votes)
            </p>
            <p
              className={`text-white px-2 py-1 rounded-full ${
                tvShowData?.status === "Ended" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {tvShowData?.status}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
            {tvShowData?.genres.map((genre) => (
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
            {tvShowData?.overview}
          </p>

          {/* Budget and Revenue */}
          <div className="text-sm text-center md:text-start text-gray-400">
            {tvShowData?.number_of_episodes && (
              <p>
                total number of episodes is {tvShowData?.number_of_episodes}
              </p>
            )}
            {tvShowData?.number_of_seasons && (
              <p>total number of seasons is {tvShowData?.number_of_seasons}</p>
            )}
            <p>
              last time aired was {tvShowData?.last_air_date} in episode{" "}
              {tvShowData?.last_episode_to_air.name}
            </p>
            {tvShowData?.next_episode_to_air && (
              <p>next episode airs on {tvShowData?.next_episode_to_air}</p>
            )}
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
      {tvShowData?.production_companies.length > 0 && (
        <section className="mt-12 w-full">
          <h2 className="text-3xl md:text-start text-center font-semibold mb-6">
            Production Companies
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            {tvShowData?.production_companies.map((company) => (
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

export default TVPage;
