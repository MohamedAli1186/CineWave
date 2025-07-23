import { useParams } from "react-router-dom";
import {
  getSimilarTVShows,
  getTvShow,
  getTVShowCast,
  getTVShowVideos,
} from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovieCast, ITVShow, ITVShows, IVideo } from "../types/movies";
import Cast from "../components/movieTvPageComponents/Cast";
import ProductionCompanies from "../components/movieTvPageComponents/ProductionCompanies";
import TVImages from "../components/TVImages";
import SimilarMovies from "../components/movieTvPageComponents/SimilarMovies";
import Trailers from "../components/movieTvPageComponents/Trailers";
import { useLoader } from "../hooks/useLoader";
import BtnsResources from "../components/movieTvPageComponents/BtnsResources";

const TVPage = () => {
  const { id } = useParams();
  const [tvShowData, setTvShowData] = useState<ITVShows>();
  const [cast, setCast] = useState<IMovieCast>();
  const [similar, setSimilar] = useState<ITVShow[]>();
  const [trailer, setTrailer] = useState<IVideo[]>();
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchMovie = async () => {
      startLoading();
      const res = await getTvShow(+id!);
      setTvShowData(res);
      const castRes = await getTVShowCast(+id!);
      setCast(castRes);
      const similarRes = await getSimilarTVShows(+id!);
      setSimilar(similarRes.results);
      const trailerRes = await getTVShowVideos(+id!);
      setTrailer(trailerRes.results);
      stopLoading();
    };
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!tvShowData || !cast || !similar)
    return <p className="text-white p-8">Loading...</p>;

  return (
    <main className="pb-20 w-full flex flex-col items-start pt-16">
      {/* Backdrop */}
      <div className="w-full relative mb-10 p-container">
        <img
          src={`https://image.tmdb.org/t/p/w1280${tvShowData?.backdrop_path}`}
          alt={tvShowData?.name}
          className="w-full max-h-[600px] object-cover object-top mx-auto rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#1f1414] to-transparent w-full h-40 rounded-b-lg" />
      </div>

      {/* Main Info Section */}
      <section className="flex flex-col lg:flex-row w-full gap-10 p-container">
        {/* Poster */}
        {tvShowData?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShowData?.poster_path}`}
            alt={tvShowData?.name}
            className="md:w-auto h-80 w-48 rounded-lg shadow-lg mx-auto"
          />
        )}

        {/* series Info */}
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col justify-between gap-4">
            <h1 className="text-4xl font-bold md:text-start text-center">
              {tvShowData?.name}
            </h1>
            <BtnsResources
              showId={tvShowData?.id}
              homePage={tvShowData?.homepage}
            />
          </div>
          {tvShowData?.tagline && (
            <p className="text-lg italic md:text-start text-center text-gray-300">
              {tvShowData?.tagline}
            </p>
          )}

          <div className="text-sm flex justify-center items-center md:justify-start gap-6 flex-wrap text-gray-400 text-nowrap">
            <p>🗓️ {tvShowData?.first_air_date}</p>
            {tvShowData?.episode_run_time.length > 0 && (
              <p>⏱️ {tvShowData?.episode_run_time} min</p>
            )}{" "}
            <p>
              ⭐ {tvShowData?.vote_average} ({tvShowData?.vote_count} votes)
            </p>
            <p
              className={`text-white px-2 py-1 rounded-full ${
                tvShowData?.status === "Ended"
                  ? "bg-red-600"
                  : tvShowData?.status === "Canceled"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              }`}
            >
              {tvShowData?.status}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap  gap-2 justify-center md:justify-start mt-2">
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

          {/* series info */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-center md:text-start text-gray-400">
              {tvShowData?.number_of_episodes && (
                <p>
                  total number of episodes is {tvShowData?.number_of_episodes}
                </p>
              )}
              {tvShowData?.number_of_seasons && (
                <p>
                  total number of seasons is {tvShowData?.number_of_seasons}
                </p>
              )}
              {tvShowData?.last_air_date &&
                tvShowData?.last_episode_to_air.name && (
                  <p>
                    last time aired was {tvShowData?.last_air_date} in episode{" "}
                    {tvShowData?.last_episode_to_air.name}
                  </p>
                )}
              {tvShowData?.next_episode_to_air && (
                <p>
                  next episode airs on{" "}
                  {tvShowData?.next_episode_to_air.air_date}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Images */}
      <TVImages id={+id!} />

      {/* Production Companies */}
      <ProductionCompanies
        production_companies={tvShowData.production_companies}
      />

      {/* Cast */}
      <Cast cast={cast} />

      {/* Trailers */}
      {trailer && <Trailers trailer={trailer} />}

      {/* Similar Movies */}
      <SimilarMovies similar={similar} />
    </main>
  );
};

export default TVPage;
