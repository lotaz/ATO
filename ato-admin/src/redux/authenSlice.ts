import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenService } from '../services/authen';
import { ISignInRequest, ISignUpRequest } from '../services/authen/types';
import { enqueueSnackbar } from 'notistack';

export const signin = createAsyncThunk('signin', async (request: ISignInRequest) => await authenService.signIn(request));
export const signup = createAsyncThunk('signup', async (request: ISignUpRequest) => await authenService.signUp(request));

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    user: null,
    email: null
  },
  reducers: {
    signOut: (state, _) => {
      state.user = null;
      sessionStorage.removeItem('user');
      localStorage.removeItem('currentPage');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const { user }: any = action.payload;
      if (user == null) {
        const { message } = action.payload;
        enqueueSnackbar(message);
      } else {
        state.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        enqueueSnackbar('Đăng nhập thành công');
      }
    });

    builder.addCase(signin.rejected, () => {
      enqueueSnackbar('Tài khoản hoặc mật khẩu không chính xác');
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
