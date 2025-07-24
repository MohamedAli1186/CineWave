export interface IToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ISession {
  success: boolean;
  failure: boolean;
  status_code: number;
  status_message: string;
  error: string;
  session_id: string;
}

export interface IUser {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}
