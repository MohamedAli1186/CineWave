import { useState, type FC } from "react";
import type { IMovieCast, IActor } from "../types/movies";
import ActorPopup from "./ActorPopup";
import user from "../../public/user.png";

interface CastProps {
  cast: IMovieCast;
}
const Cast: FC<CastProps> = ({ cast }) => {
  const [isActorPopupOpen, setIsActorPopupOpen] = useState(false);
  const [selectedActor, setSelectedActor] = useState<IActor>();
  return (
    <>
      {cast?.cast?.length > 0 && (
        <section className="mt-12 w-full p-container">
          <h2 className="text-3xl md:text-start text-center font-semibold mb-6">
            Cast
          </h2>
          <div className="flex justify-center flex-wrap md:gap-10 gap-5 w-full">
            {cast?.cast?.map(
              (person, index) =>
                index < 8 && (
                  <div
                    key={person.id}
                    className="flex  flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => {
                      setSelectedActor(person);
                      setIsActorPopupOpen(true);
                    }}
                  >
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                          : user
                      }
                      alt={person.name}
                      className="md:h-40 h-20 md:w-[107px] w-[80px] rounded-full bg-white object-contain"
                    />
                    <span className="md:text-sm text-[10px] mt-2">
                      {person.name}
                    </span>
                    <p className="text-[10px] text-gray-400 w-[100px]">
                      {person.character}
                    </p>
                  </div>
                )
            )}
          </div>
        </section>
      )}
      {isActorPopupOpen && selectedActor && (
        <ActorPopup
          onClose={() => setIsActorPopupOpen(false)}
          actorId={selectedActor.id}
        />
      )}
    </>
  );
};

export default Cast;
