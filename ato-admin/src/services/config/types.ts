export interface IEmailConfig {
  email: string;
  appPassword: string;
}

export interface IEmailConfigResponse {
  success: boolean;
  message: string;
  data?: IEmailConfig;
}
