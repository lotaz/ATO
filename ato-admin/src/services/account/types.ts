export interface ICreateAccountRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean;
  avatarURL?: string;
  dob: string;
  role: string;
}

export interface IAccount {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean;
  avatarURL?: string;
  dob: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}