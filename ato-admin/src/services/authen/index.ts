import { API_URLs } from '../../constants/api';
import { post } from '../../helpers/axios-helper';
import { ISignInRequest, ISignInResponse, ISignUpRequest } from './types';

export const authenService = {
  signIn: async (request: ISignInRequest) => {
    const response = await post<ISignInResponse>(API_URLs.AUTHEN.SIGN_IN, request);
    return response.data;
  },
  signUp: async (request: ISignUpRequest) => {
    const response = await post(API_URLs.AUTHEN.SIGN_UP, request);
    return response.data;
  }
};
