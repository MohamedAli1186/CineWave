const LOCAL_WATCHLIST_KEY = "localWatchlist";

export const getLocalWatchlist = (): number[] => {
  const raw = localStorage.getItem(LOCAL_WATCHLIST_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const addMovieToLocalWatchlist = (movieId: number) => {
  const current = getLocalWatchlist();
  if (!current.includes(movieId)) {
    current.push(movieId);
    localStorage.setItem(LOCAL_WATCHLIST_KEY, JSON.stringify(current));
  }
};

export const isMovieInLocalWatchlist = (movieId: number): boolean => {
  return getLocalWatchlist().includes(movieId);
};
