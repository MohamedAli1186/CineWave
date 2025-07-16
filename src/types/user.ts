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
