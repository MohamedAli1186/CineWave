import type { IVideo } from "../../types/movies";

const Trailers = ({ trailer }: { trailer: IVideo[] }) => {
  const trailerVideo = trailer.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  return (
    <>
      {trailerVideo && (
        <div className="w-full mb-8 p-container">
          <h2 className="small-title">Watch the Trailer</h2>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
            title={trailerVideo.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Trailers;
