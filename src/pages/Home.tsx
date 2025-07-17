import SearchMulti from "../components/global/SearchMulti";
import Trends from "../components/Trends";
import PopularTvSeries from "../components/PopularTvSeries";
import PopularMovies from "../components/PopularMovies";
import HomeMarketing from "../components/HomeMarketing ";
import TrendingActor from "../components/TrendingActor";

const Home = () => {
  return (
    <main className="p-container mt-16">
      <Trends />
      <HomeMarketing />
      <SearchMulti />
      <PopularMovies />
      <PopularTvSeries />
      <TrendingActor />
    </main>
  );
};

export default Home;
