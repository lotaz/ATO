import { get } from '../../helpers/axios-helper';

export interface User {
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean;
  avatarURL?: string;
  dob: string;
  isAccountActive: boolean;
}

export const userService = {
  getUsers: () => get<User[]>('api/admin/user/get-list-users')
};