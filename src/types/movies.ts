export interface INode<data> {
  page: number;
  results: data;
  total_pages: number;
  total_results: number;
}

export interface IMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ITVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface ITrends {
  adult: false;
  backdrop_path: "/g62G6aBcAcJv3ClCKmJgmHarHvq.jpg";
  id: 1061474;
  title: "Superman";
  original_title: "Superman";
  overview: "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.";
  poster_path: "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg";
  media_type: "movie";
  original_language: "en";
  genre_ids: [878, 12, 28];
  popularity: 352.4649;
  release_date: "2025-07-09";
  video: false;
  vote_average: 7.335;
  vote_count: 303;
}
