import { useEffect, useState } from "react";
import { getTrendingActors } from "../services/tmdb";
import type { ITrendActor } from "../types/actor";
import ActorPopup from "./ActorPopup";
import user from "../../public/user.png";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";

const TrendingActor = () => {
  const [isActorPopupOpen, setIsActorPopupOpen] = useState(false);
  const [selectedActor, setSelectedActor] = useState<ITrendActor>();
  const [actor, setActor] = useState<ITrendActor[]>();

  useEffect(() => {
    const fetchCast = async () => {
      const res = await getTrendingActors();
      setActor(res.results);
    };
    fetchCast();
  }, []);

  return (
    <>
      {actor?.length && (
        <section className="pt-12 pb-20 w-full ">
          <ShinyText
            text="Trending Actors"
            disabled={false}
            speed={3}
            className="mb-8"
          />
          <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 md:gap-10 gap-5 w-full">
            {actor?.map(
              (person, index) =>
                index < 14 && (
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
                    <span className="md:text-sm text-[10px] mt-2 font-bold">
                      {person.name}
                    </span>
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

export default TrendingActor;
