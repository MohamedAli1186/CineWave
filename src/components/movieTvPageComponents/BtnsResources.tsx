import { Link } from "react-router-dom";
import { showToast } from "../global/Toast";
import { addToWatchlist } from "../../services/tmdb";
import { getSessionId } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
const BtnsResources = ({
  showId,
  homePage,
}: {
  showId: number;
  homePage: string;
}) => {
  const { isLoggedIn } = useAuth();
  const sessionId = getSessionId();
  const addToWatchlists = async (media_type: string, movieId: number) => {
    if (!sessionId) {
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
  return (
    <div className="flex gap-4 ">
      <Link to={homePage} className="btn" target="_blank">
        See More
      </Link>
      {isLoggedIn && sessionId && (
        <button
          type="button"
          className="pink-btn"
          onClick={() => {
            addToWatchlists("movie", showId);
          }}
        >
          Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default BtnsResources;
