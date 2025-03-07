import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { accountService } from '../services/account/accountService';

export const getAccounts = createAsyncThunk('get-accounts', async () => await accountService.getAccounts());
export const getAccount = createAsyncThunk('get-account', async (id: string) => await accountService.getAccount(id));

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    data: [],
    specific: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      const payload = action.payload;
      console.log('payload', payload);

      state.data = payload;

      if (payload == null) {
        enqueueSnackbar('Lấy danh sách tài khoản thất bại');
      }
    });

    builder.addCase(getAccount.fulfilled, (state, action) => {
      const payload = action.payload;
      console.log('payload', payload);

      state.specific = payload;

      if (payload == null) {
        enqueueSnackbar('Lấy thông tin người dùng thất bại');
      }
    });
  }
});

export default accountSlice;
