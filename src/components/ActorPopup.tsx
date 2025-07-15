import { useEffect, useState, type FC } from "react";
import Popup from "./global/PopUp";
import type { IActorInfo } from "../types/movies";
import { getActor } from "../services/tmdb";
import user from "../../public/user.png";

interface PopUpProps {
  onClose: () => void;
  actorId: number;
}

const ActorPopup: FC<PopUpProps> = ({ onClose, actorId }) => {
  const [actorInfo, setActorInfo] = useState<IActorInfo | null>(null);

  useEffect(() => {
    const fetchActorInfo = async () => {
      const info = await getActor(actorId);
      setActorInfo(info);
    };
    fetchActorInfo();
  }, [actorId]);

  const getGender = () => {
    switch (actorInfo?.gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      default:
        return "Not Specified";
    }
  };

  return (
    <Popup
      onClose={onClose}
      className="p-6 text-[#1F1414] bg-[#af8a8b] max-w-2xl w-full"
    >
      <section className="flex flex-col items-center gap-4 text-center">
        {/* Avatar */}
        <img
          src={
            actorInfo?.profile_path
              ? `https://image.tmdb.org/t/p/w500${actorInfo.profile_path}`
              : user
          }
          alt={actorInfo?.name}
          className="w-32 h-32 object-cover bg-white rounded-full shadow-lg border-2 border-[#1F1414]"
        />

        {/* Name and Aliases */}
        <div>
          <h2 className="text-2xl font-bold">{actorInfo?.name}</h2>
          {actorInfo?.also_known_as?.length && (
            <p className="text-sm mt-1">
              Also known as:{" "}
              {actorInfo.also_known_as.length > 3 ? (
                <span className="text-black font-bold ">
                  {actorInfo.also_known_as.slice(0, 3).join(", ") +
                    (actorInfo.also_known_as.length > 3 ? "..." : "")}
                </span>
              ) : (
                <span className="text-black font-bold">
                  {actorInfo.also_known_as.join(", ")}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Details */}
        <ul className="text-left w-full text-sm space-y-2">
          <li>
            <strong>Known For:</strong>{" "}
            {actorInfo?.known_for_department ?? "Not Specified"}
          </li>
          <li>
            <strong>Gender:</strong> {getGender()}
          </li>
          {actorInfo?.birthday && (
            <li>
              <strong>Born:</strong> {actorInfo.birthday}
              {actorInfo.place_of_birth && ` — ${actorInfo.place_of_birth}`}
            </li>
          )}
          {actorInfo?.deathday && (
            <li>
              <strong>Died:</strong> {actorInfo.deathday}
            </li>
          )}
          <li>
            <strong>Popularity:</strong>{" "}
            {actorInfo?.popularity ? actorInfo.popularity.toFixed(2) : "N/A"}
          </li>
          {actorInfo?.imdb_id && (
            <li>
              <strong>IMDb:</strong>{" "}
              <a
                href={`https://www.imdb.com/name/${actorInfo.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#6b3c3f]"
              >
                View Profile
              </a>
            </li>
          )}
          <li>
            <strong>TMDB ID:</strong> #{actorInfo?.id}
          </li>
        </ul>

        {/* Biography */}
        {actorInfo?.biography && (
          <div className="mt-4 text-sm text-left bg-[#1F1414] text-white p-4 rounded-xl max-h-60 overflow-y-auto w-full">
            <h3 className="font-bold mb-2">Biography:</h3>
            <p className="leading-relaxed whitespace-pre-wrap">
              {actorInfo.biography}
            </p>
          </div>
        )}
      </section>
    </Popup>
  );
};

export default ActorPopup;
