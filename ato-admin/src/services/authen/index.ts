import axios from 'axios';

import { ISignInRequest, ISignUpRequest } from './types';
import { API_URLs } from '../../constants/api';

export const authenService = {
  signIn: async (request: ISignInRequest) => {
    const response = await axios.post(API_URLs.AUTHEN.SIGN_IN, request);
    return response.data;
  },
  signUp: async (request: ISignUpRequest) => {
    const response = await axios.post(API_URLs.AUTHEN.SIGN_UP, request);
    return response.data;
  }
};
