import type { IMovies, INode, ITVShow } from "../types/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (page: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data: INode<IMovies[]> = await res.json();
  return data;
};

export const getTVShows = async (page: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data: INode<ITVShow[]> = await res.json();
  return data;
};

export const getTrends = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: INode<IMovies[]> = await res.json();
  return data;
};
