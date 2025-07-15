import { Link } from "react-router-dom";

const HomeMarketing = () => {
  return (
    <section className="w-full text-white mb-8">
      <div className="w-full flex flex-col justify-center items-center gap-6 p-container bg-[#1f1414]">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight animate-shine bg-gradient-to-r from-[#E8B5B8] via-white to-[#E8B5B8] bg-clip-text text-transparent bg-[length:200%_100%] bg-no-repeat">
          Discover Movies in a Whole New Way
        </h1>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between w-full">
          <p className="text-lg md:text-xl max-w-2xl text-[#BF9C9E]">
            CineWave brings you the latest, greatest, and hidden gems of the
            film world — all in one place. Filter by genre, year, and explore
            top-rated picks to match your taste.
          </p>
          <Link
            to="/movies"
            type="button"
            className="pink-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeMarketing;
