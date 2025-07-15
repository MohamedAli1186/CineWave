import { Link, useParams } from "react-router-dom";
import { getSimilarTVShows, getTvShow, getTVShowCast } from "../services/tmdb";
import { useEffect, useState } from "react";
import type { IMovieCast, ITVShow, ITVShows } from "../types/movies";
import Carousel from "react-multi-carousel";
import PosterCard from "../components/PosterCard";
import Cast from "../components/Cast";
import ProductionCompanies from "../components/ProductionCompanies";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const TVPage = () => {
  const { id } = useParams();
  const [tvShowData, setTvShowData] = useState<ITVShows>();
  const [cast, setCast] = useState<IMovieCast>();
  const [similar, setSimilar] = useState<ITVShow[]>();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getTvShow(+id!);
      setTvShowData(res);
      const castRes = await getTVShowCast(+id!);
      setCast(castRes);
      const similarRes = await getSimilarTVShows(+id!);
      setSimilar(similarRes.results);
    };
    fetchMovie();
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
            <Link
              to={tvShowData?.homepage}
              className="pink-btn text-nowrap h-fit"
            >
              See More
            </Link>
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
      {/* Production Companies */}
      <ProductionCompanies
        production_companies={tvShowData.production_companies}
      />
      {/* Cast */}
      <Cast cast={cast} />

      {/* Similar Movies */}
      {similar?.length > 0 && (
        <section className="mt-12 w-full p-container">
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
            removeArrowOnDeviceType={["mobile"]}
            itemClass="p-5"
          >
            {similar?.map((tvShow) => (
              <PosterCard
                key={tvShow.id}
                id={tvShow.id}
                type="tv"
                image={tvShow.poster_path}
                title={tvShow.name}
                subtitle={tvShow.overview}
              />
            ))}
          </Carousel>
        </section>
      )}
    </main>
  );
};

export default TVPage;
