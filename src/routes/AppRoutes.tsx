import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MoviePage";
import Signup from "../pages/Signup";
import WatchList from "../pages/WatchList";
import Movies from "../pages/Movies";
import TVShowPage from "../pages/TVShowPage";
import TVPage from "../pages/TV";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/tv/:id" element={<TVPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<TVShowPage />} />
    </Routes>
  );
};
export default AppRoutes;
