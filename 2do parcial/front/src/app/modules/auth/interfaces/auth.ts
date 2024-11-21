export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: string;
  token: string;
  msn: string;
}
