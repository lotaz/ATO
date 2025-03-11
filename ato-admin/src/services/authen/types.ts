export interface ISignInRequest {
  username: string;
  password: string;
}

export interface IChangePasswordRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInResponse {
  bear?: string; // Optional string
  expiration?: Date | null; // Nullable Date (null is allowed)
  role?: string; // Optional string
  message?: string;
}

export interface ISignUpRequest {
  username: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}
