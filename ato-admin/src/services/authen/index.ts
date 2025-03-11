import { API_URLs } from '../../constants/api';
import { post } from '../../helpers/axios-helper';
import { IChangePasswordRequest, ISignInRequest, ISignInResponse, ISignUpRequest } from './types';

const forgotPassword = async (email: string) => {
  const response = await post(API_URLs.AUTHEN.SEND_OTP, { username: email });
  console.log('response', response);

  return response.data;
};

const verifyOTP = async (otp: string) => {
  return { success: true };
  const response = await post(API_URLs.AUTHEN.VERIFY_OTP, { otp });
  return response.data;
};

const changePassword = async (request: IChangePasswordRequest) => {
  const response = await post(API_URLs.AUTHEN.CHANGE_PASSWORD, {
    username: request.username,
    newPassword: request.password,
    confimPassword: request.confirmPassword
  });
  return response.data;
};

export const authenService = {
  signIn: async (request: ISignInRequest) => {
    const response = await post<ISignInResponse>(API_URLs.AUTHEN.SIGN_IN, request);
    return response.data;
  },
  signUp: async (request: ISignUpRequest) => {
    const response = await post(API_URLs.AUTHEN.SIGN_UP, request);
    return response.data;
  },
  forgotPassword,
  verifyOTP,
  changePassword
};
