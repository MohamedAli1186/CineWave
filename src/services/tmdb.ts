import type { ITrendActor } from "../types/actor";
import type {
  IActorInfo,
  IImages,
  IMovie,
  IMovieCast,
  IMovies,
  INode,
  ISearch,
  ITVSeries,
  ITVShow,
  ITVShows,
  IVideo,
} from "../types/movies";
import type { ISession, IToken, IUser } from "../types/user";
import type { IAddWatchlist } from "../types/watchlist";
import { getCookie, setCookie } from "../utils/cookies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (
  page: number,
  genre?: number,
  year?: number
) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${
      year ? `&primary_release_year=${year}` : ""
    }&sort_by=popularity.desc${genre ? `&with_genres=${genre}` : ""}`,
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
export const getTvShow = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: ITVShows = await res.json();
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
export const getTVShowCast = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IMovieCast = await res.json();
  return data;
};
export const getTVShows = async (page: number, genre?: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc${
      genre ? `&with_genres=${genre}` : ""
    }`,
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
export const searchMulti = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
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
  // Check if valid token already exists
  const existingToken = getCookie("request_token");
  if (existingToken) {
    return { success: true, request_token: existingToken };
  }

  // Otherwise, get a new one
  const res = await fetch(`${BASE_URL}/authentication/token/new`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });

  const data: IToken = await res.json();

  if (data.success) {
    const requestToken = data.request_token;
    // Set cookie with 60-minute expiry
    setCookie("request_token", requestToken, 60);
  } else {
    throw new Error("Failed to get request token");
  }

  return data;
};

export const createSession = async (request_token: string) => {
  const res = await fetch(`${BASE_URL}/authentication/session/new`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_token,
    }),
  });
  const data: ISession = await res.json();
  return data;
};

export const getMovieGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: { genres: [{ id: number; name: string }] } = await res.json();
  return data;
};
export const getTVGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/tv/list?language=en`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: { genres: [{ id: number; name: string }] } = await res.json();
  return data;
};
export const getTvSeries = async (page: number) => {
  const res = await fetch(
    `${BASE_URL}/tv/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data: INode<ITVSeries[]> = await res.json();
  return data;
};
export const getPopularMovies = async (page: number) => {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?language=en-US&page=${page}`,
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
export const getSimilarMovies = async (id: number) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
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
export const getSimilarTVShows = async (id: number) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/similar?language=en-US&page=1`,
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
export const getActor = async (id: number) => {
  const res = await fetch(`${BASE_URL}/person/${id}?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IActorInfo = await res.json();
  return data;
};
export const getTrendingActors = async () => {
  const res = await fetch(`${BASE_URL}/trending/person/week?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: INode<ITrendActor[]> = await res.json();
  return data;
};
export const getMoviesImages = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/images`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IImages = await res.json();
  return data;
};
export const getTVImages = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/images`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IImages = await res.json();
  return data;
};

export const addToWatchlist = async (
  session_id: string,
  media_type: string,
  media_id: number
) => {
  const res = await fetch(
    `${BASE_URL}/account/22134396/watchlist?session_id=${session_id}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        media_type,
        media_id,
        watchlist: true,
      }),
    }
  );
  const data: IAddWatchlist = await res.json();
  return data;
};

export const getMovieWatchlist = async (session_id: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/account/22134396/watchlist/movies?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`,
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
export const getTVShowWatchlist = async (session_id: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/account/22134396/watchlist/tv?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`,
    {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data: INode<ITVShow[]> = await res.json();
  return data;
};

export const getAllTrends = async () => {
  const res = await fetch(`${BASE_URL}/trending/all/week?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: INode<ISearch[]> = await res.json();
  return data;
};

export const getMovieVideos = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: { id: number; results: IVideo[] } = await res.json();
  return data;
};

export const getTVShowVideos = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/videos?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: { id: number; results: IVideo[] } = await res.json();
  return data;
};

export const getUserDetails = async (sessionId: string) => {
  const res = await fetch(`${BASE_URL}/account/null?session_id=${sessionId}`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data: IUser = await res.json();
  return data;
};
