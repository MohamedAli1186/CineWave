import { useEffect, useState } from "react";
import { getTVImages } from "../services/tmdb";
import type { IImagesData } from "../types/movies";

const TVImages = ({ id }: { id: number }) => {
  const [images, setImages] = useState<IImagesData[]>();
  useEffect(() => {
    const fetchImages = async () => {
      const res = await getTVImages(id);
      setImages(res.backdrops);
    };
    fetchImages();
  }, [id]);

  if (!images) return <p className="text-white p-8">Loading...</p>;
  if (images?.length < 4) return <></>;
  return (
    <div className="grid grid-cols-3 gap-4 w-full my-5 p-5 ">
      {images?.map(
        (image, i) =>
          i < 3 && (
            <img
              key={i}
              src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
              alt={image.file_path}
              className={`w-full h-full object-cover rounded-lg`}
            />
          )
      )}
    </div>
  );
};

export default TVImages;
