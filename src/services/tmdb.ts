import type {
  IMovie,
  IMovieCast,
  IMovies,
  INode,
  ISearch,
  ITVShow,
} from "../types/movies";
import type { ISession } from "../types/user";

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

export const getMovie = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IMovie = await res.json();
  return data;
};

export const getMovieCast = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IMovieCast = await res.json();
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

export const searchMulti = async (query: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data: INode<ISearch[]> = await res.json();
  return data;
};

export const createToken = async () => {
  const res = await fetch(`${BASE_URL}/authentication/token/new`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: ISession = await res.json();
  return data;
};

export const createSession = async (request_token: string) => {
  const res = await fetch(
    `${BASE_URL}/authentication/token/validate_with_login`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        username: "johnny_appleseed",
        password: "test123",
        request_token,
      }),
    }
  );
  console.log(res);
  const data: ISession = await res.json();
  return data;
};
