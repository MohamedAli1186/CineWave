import { Link } from "react-router-dom";
import { showToast } from "../global/Toast";
import { addToWatchlist } from "../../services/tmdb";
import { getSessionId } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";

import { useEffect, useState } from "react";
import {
  addMovieToLocalWatchlist,
  isMovieInLocalWatchlist,
} from "../../utils/localWatchlist";

const BtnsResources = ({
  showId,
  homePage,
  isMovie,
}: {
  showId: number;
  homePage: string;
  isMovie?: boolean;
}) => {
  const { isLoggedIn } = useAuth();
  const sessionId = getSessionId();
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);

  useEffect(() => {
    setIsAlreadyInWatchlist(isMovieInLocalWatchlist(showId));
  }, [showId]);

  const addToWatchlists = async (media_type: string, movieId: number) => {
    if (!sessionId) return;

    if (isMovieInLocalWatchlist(movieId)) {
      showToast({ message: "Already added to Watchlist!", type: "info" });
      return;
    }

    try {
      const res = await addToWatchlist(sessionId, media_type, movieId);
      if (res.success) {
        addMovieToLocalWatchlist(movieId);
        setIsAlreadyInWatchlist(true);
        showToast({ message: "Added to Watchlist!", type: "success" });
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

  return (
    <div className="flex gap-4 justify-center items-center md:justify-end">
      <Link to={homePage} className="btn" target="_blank">
        See More
      </Link>
      {isLoggedIn && sessionId && (
        <button
          type="button"
          className="pink-btn disabled:opacity-50"
          disabled={isAlreadyInWatchlist}
          onClick={() => addToWatchlists(isMovie ? "movie" : "tv", showId)}
        >
          {isAlreadyInWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
        </button>
      )}
    </div>
  );
};

export default BtnsResources;
