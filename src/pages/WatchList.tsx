import { useEffect, useRef, useState } from "react";
import {
  createToken,
  getAllTrends,
  getMovieWatchlist,
  getTVShowWatchlist,
} from "../services/tmdb";
import type { IMovies, INode, ISearch, ITVShow } from "../types/movies";
import PosterCard from "../components/global/PosterCard";
import Carousel from "react-multi-carousel";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
import Pagination from "../components/global/Pagination";
import { showToast } from "../components/global/Toast";
import { responsive } from "../utils/cursorResponsive";
import WishlistCard from "../components/global/WishlistCard";
import { useAuth } from "../hooks/useAuth";
import { useLoader } from "../hooks/useLoader";

const Watchlist = () => {
  const { sessionId, isLoggedIn, login } = useAuth();
  const movieDirection = useRef(null);
  const lastPageUrl = window.location.href;
  const tvShowDirection = useRef(null);
  const [watchlistMovies, setWatchlistMovies] = useState<INode<IMovies[]>>();
  const [watchlistTVShows, setWatchlistTVShows] = useState<INode<ITVShow[]>>();
  const [moviesPage, setMoviesPage] = useState(1);
  const [tvShowsPage, setTvShowsPage] = useState(1);
  const [featured, setFeatured] = useState<ISearch[]>([]);
  const requestToken = localStorage.getItem("request_token");
  const { startLoading, stopLoading } = useLoader();
  // Fetch featured movies regardless of session
  useEffect(() => {
    const fetchFeatured = async () => {
      startLoading();
      const res = await getAllTrends();
      setFeatured(res.results);
      stopLoading();
    };
    fetchFeatured();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch user watchlist when logged in or when session changes
  useEffect(() => {
    if (!isLoggedIn || !sessionId) {
      setWatchlistMovies(undefined);
      setWatchlistTVShows(undefined);
      return;
    }

    const fetchWatchlist = async () => {
      startLoading();
      try {
        const [moviesRes, tvShowsRes] = await Promise.all([
          getMovieWatchlist(sessionId, moviesPage),
          getTVShowWatchlist(sessionId, tvShowsPage),
        ]);

        setWatchlistMovies({
          page: moviesPage,
          results: moviesRes?.results || [],
          total_pages: moviesRes?.total_pages || 0,
          total_results: moviesRes?.total_results || 0,
        });

        setWatchlistTVShows({
          page: tvShowsPage,
          results: tvShowsRes?.results || [],
          total_pages: tvShowsRes?.total_pages || 0,
          total_results: tvShowsRes?.total_results || 0,
        });
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        showToast({ message: "Failed to load watchlist", type: "error" });
      }
      stopLoading();
    };

    fetchWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, sessionId, moviesPage, tvShowsPage]);

  const fetchSession = async () => {
    const res = await createToken();
    if (res.success) {
      showToast({ message: "Signing up..." });
    } else {
      showToast({ message: "Something went wrong.", type: "error" });
    }
    window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=${lastPageUrl}`;
  };

  return (
    <main className="p-container pt-20 text-white bg-[#1f1414] min-h-screen">
      <section className="mb-10">
        <ShinyText
          text="Top Picks For You"
          disabled={false}
          speed={3}
          className="pt-8 pb-2"
        />
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
          {featured.map((movie) => (
            <PosterCard
              key={movie.id}
              image={movie.poster_path}
              title={movie.title || movie.name}
              id={movie.id}
              type={movie.media_type}
              subtitle={movie.overview}
            />
          ))}
        </Carousel>
      </section>

      <section className="mt-12 pb-20">
        {!isLoggedIn ? (
          <div className="text-center py-10 bg-[#40292B] rounded-xl">
            <p className="text-3xl mb-4 px-2">
              Want to save your favorite movies and shows? <br />
              <span className="text-white text-xl">
                Start exploring with your own space
              </span>
            </p>
            {!requestToken && (
              <button
                type="button"
                onClick={fetchSession}
                className="pink-btn transition hover:scale-105"
              >
                Start Now
              </button>
            )}
            {requestToken && !isLoggedIn && (
              <button
                type="button"
                className="pink-btn transition hover:scale-105"
                onClick={async () => {
                  await login(requestToken!);
                }}
              >
                Create Session
              </button>
            )}
          </div>
        ) : watchlistMovies?.results?.length === 0 ? (
          <p className="text-center text-gray-400">
            You haven’t added anything to your watchlist yet.
          </p>
        ) : (
          <>
            {!watchlistMovies?.results?.length ||
            !watchlistTVShows?.results?.length ? (
              <p className="text-center text-gray-400">
                You haven’t added anything to your watchlist yet.
              </p>
            ) : (
              <>
                {watchlistMovies?.results?.length > 0 && (
                  <>
                    <ShinyText
                      text="Your Movies Watchlist"
                      disabled={false}
                      speed={3}
                      className="pb-8"
                      ref={movieDirection}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                      {watchlistMovies?.results?.map((movie) => (
                        <WishlistCard
                          key={movie.id}
                          image={movie.backdrop_path}
                          title={movie.title}
                          id={movie.id}
                          type="movie"
                          subtitle={movie.overview}
                        />
                      ))}
                    </div>
                    <Pagination
                      pageNo={moviesPage}
                      total_pages={watchlistMovies?.total_pages}
                      setPageNo={setMoviesPage}
                      direction={movieDirection}
                    />
                  </>
                )}
                {watchlistTVShows?.results?.length > 0 && (
                  <>
                    <ShinyText
                      text="Your TV Shows Watchlist"
                      disabled={false}
                      speed={3}
                      className="pb-8"
                      ref={tvShowDirection}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10">
                      {watchlistTVShows?.results?.map((tvShow) => (
                        <WishlistCard
                          key={tvShow.id}
                          image={tvShow.backdrop_path}
                          title={tvShow.name}
                          id={tvShow.id}
                          type="tv"
                          subtitle={tvShow.overview}
                        />
                      ))}
                    </div>
                    <Pagination
                      pageNo={tvShowsPage}
                      total_pages={watchlistTVShows?.total_pages}
                      setPageNo={setTvShowsPage}
                      direction={tvShowDirection}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Watchlist;
