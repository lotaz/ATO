export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
