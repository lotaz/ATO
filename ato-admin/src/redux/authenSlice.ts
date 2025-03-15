import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { decryptJWT } from '../helpers/jwt-helper';
import { authenService } from '../services/authen';
import { IChangePasswordRequest, ISignInRequest, ISignInResponse, ISignUpRequest } from '../services/authen/types';

export const signin = createAsyncThunk('signin', async (request: ISignInRequest) => await authenService.signIn(request));
export const signup = createAsyncThunk('signup', async (request: ISignUpRequest) => await authenService.signUp(request));
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string) => await authenService.forgotPassword(email));
export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (otp: string) => await authenService.verifyOTP(otp));
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (request: IChangePasswordRequest) => await authenService.changePassword(request)
);

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    user: null,
    forgotPasswordStatus: 'idle',
    forgotPasswordError: null,
    verifyOTPStatus: 'idle',
    verifyOTPError: null,
    changePasswordStatus: 'idle',
    changePasswordError: null,
    username: null
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
    },
    resetForgotPassword: (state) => {
      state.forgotPasswordStatus = 'idle';
      state.forgotPasswordError = null;
    },
    resetVerifyOTP: (state) => {
      state.verifyOTPStatus = 'idle';
      state.verifyOTPError = null;
    },
    resetChangePassword: (state) => {
      state.changePasswordStatus = 'idle';
      state.changePasswordError = null;
    },

    setUsername: (state, action) => {
      state.username = action.payload;
    },

    resetUsername: (state) => {
      state.username = null;
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

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordStatus = 'loading';
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, _) => {
        state.forgotPasswordStatus = 'succeeded';
        enqueueSnackbar('Mã OPT đã được gửi về email của bạn', {
          variant: 'success'
        });
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordStatus = 'failed';
        state.forgotPasswordError = action.error.message;
        enqueueSnackbar('Tên đăng nhập không tồn tại', {
          variant: 'error'
        });
      });

    builder
      .addCase(verifyOTP.pending, (state) => {
        state.verifyOTPStatus = 'loading';
        state.verifyOTPError = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.verifyOTPStatus = 'succeeded';
        enqueueSnackbar('Xác thực OTP thành công', { variant: 'success' });
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyOTPStatus = 'failed';
        state.verifyOTPError = action.error.message || 'Mã OTP không chính xác';
        enqueueSnackbar(state.verifyOTPError, { variant: 'error' });
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = 'loading';
        state.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordStatus = 'succeeded';
        enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = 'failed';
        state.changePasswordError = action.error.message || 'Đổi mật khẩu thất bại';
        enqueueSnackbar(state.changePasswordError, { variant: 'error' });
      });
  }
});

export const { resetForgotPassword, resetVerifyOTP, resetChangePassword, setUsername, resetUsername } = authenSlice.actions;

export default authenSlice;
