import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { decryptJWT } from '../helpers/jwt-helper';
import { authenService } from '../services/authen';
import { ISignInRequest, ISignInResponse, ISignUpRequest } from '../services/authen/types';

export const signin = createAsyncThunk('signin', async (request: ISignInRequest) => await authenService.signIn(request));
export const signup = createAsyncThunk('signup', async (request: ISignUpRequest) => await authenService.signUp(request));

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    user: null
  },
  reducers: {
    signOut: (state, _) => {
      state.user = null;

      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      localStorage.removeItem('currentPage');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const { bear }: ISignInResponse = action.payload;

      if (bear == null) {
        const { message } = action.payload;
        enqueueSnackbar(message);
      } else {
        const user = decryptJWT(bear);

        state.user = user!;

        sessionStorage.setItem('token', bear);
        sessionStorage.setItem('user', JSON.stringify(user));

        enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
      }
    });

    builder.addCase(signin.rejected, () => {
      enqueueSnackbar('Tài khoản hoặc mật khẩu không chính xác', { variant: 'error' });
    });

    builder.addCase(signup.fulfilled, (_, action) => {
      enqueueSnackbar('Tạo tài khoản thành công');
      console.log('create account successfully', action.payload);
    });

    builder.addCase(signup.rejected, () => {
      enqueueSnackbar('Email đã tồn tại');
    });
  }
});

export default authenSlice;
