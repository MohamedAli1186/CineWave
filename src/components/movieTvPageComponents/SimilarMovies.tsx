import PosterCard from "../global/PosterCard";
import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/cursorResponsive";
import type { IMovies, ITVShow } from "../../types/movies";

const SimilarMovies = ({ similar }: { similar: ITVShow[] | IMovies[] }) => {
  return (
    <>
      {similar?.length > 0 && (
        <section className="mt-12 w-full p-container">
          <h2 className="small-title">Similar Movies</h2>
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
            {similar?.map((i) => (
              <PosterCard
                key={i.id}
                id={i.id}
                type={i.name ? "tv" : "movie"}
                image={i.poster_path}
                title={i.name || i.title}
                subtitle={i.overview}
              />
            ))}
          </Carousel>
        </section>
      )}
    </>
  );
};

export default SimilarMovies;
