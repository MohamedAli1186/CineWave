import SearchMulti from "../components/SearchMulti";
import Trends from "../components/Trends";
import PopularTvSeries from "../components/PopularTvSeries";
import PopularMovies from "../components/PopularMovies";
import HomeMarketing from "../components/HomeMarketing ";

const Home = () => {
  return (
    <main className="p-container mt-16">
      <Trends />
      <HomeMarketing />
      <SearchMulti />
      <PopularTvSeries />
      <PopularMovies />
    </main>
  );
};

export default Home;
