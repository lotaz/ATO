import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { accountService } from '../services/account/accountService';
import { ICreateAccountRequest } from '../services/account/types';
import { IUpdateAccountRequest } from '../services/account/accountService';

export const getAccounts = createAsyncThunk('get-accounts', async () => await accountService.getAccounts());
export const getAccount = createAsyncThunk('get-account', async (id: string) => await accountService.getAccount(id));
export const createAccount = createAsyncThunk('account/create', async (data: ICreateAccountRequest, { rejectWithValue }) => {
  try {
    const response = await accountService.createAccount(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add new thunk
export const updateAccount = createAsyncThunk('account/update', async (data: IUpdateAccountRequest, { rejectWithValue }) => {
  try {
    const response = await accountService.updateAccount(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    data: [],
    specific: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null
  },
  reducers: {
    clearCreateError: (state) => {
      state.createError = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log('payload', payload);

        state.data = payload;

        if (payload == null) {
          enqueueSnackbar('Lấy danh sách tài khoản thất bại');
        }
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log('payload', payload);

        state.specific = payload;

        if (payload == null) {
          enqueueSnackbar('Lấy thông tin người dùng thất bại');
        }
      })
      .addCase(createAccount.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.createLoading = false;
        enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
        enqueueSnackbar('Tạo tài khoản thất bại', { variant: 'error' });
      })
      .addCase(updateAccount.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateAccount.fulfilled, (state) => {
        state.updateLoading = false;
        enqueueSnackbar('Cập nhật tài khoản thành công', { variant: 'success' });
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
        enqueueSnackbar('Cập nhật tài khoản thất bại', { variant: 'error' });
      });
  }
});

export const { clearCreateError } = accountSlice.actions;
export default accountSlice;
