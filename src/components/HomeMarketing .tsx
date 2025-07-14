import { Link } from "react-router-dom";

const HomeMarketing = () => {
  return (
    <section className="w-full text-white mb-8">
      <div className="w-full flex flex-col justify-center items-center gap-6 p-container bg-[#1f1414]">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight  animate-shine bg-gradient-to-r from-[#E8B5B8] via-white to-[#E8B5B8] bg-clip-text text-transparent bg-[length:200%_100%] bg-no-repeat">
          Discover Movies in a Whole New Way
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-[#BF9C9E]">
          CineWave brings you the latest, greatest, and hidden gems of the film
          world — all in one place. Filter by genre, year, and explore top-rated
          picks to match your taste.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            to="/movies"
            type="button"
            className="pink-btn hover:scale-105 transition-all"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeMarketing;
