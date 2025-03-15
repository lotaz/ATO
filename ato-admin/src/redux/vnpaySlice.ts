import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vnpayService } from '../services/vnpay/vnpayService';
import { VNPayConfig, UpdateVNPayConfigRequest } from '../services/vnpay/types';
import { enqueueSnackbar } from 'notistack';

interface VNPayState {
  config: VNPayConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: VNPayState = {
  config: null,
  loading: false,
  error: null
};

export const getVNPayConfig = createAsyncThunk('vnpay/getConfig', async () => {
  const response = await vnpayService.getConfig();
  return response;
});

export const updateVNPayConfig = createAsyncThunk('vnpay/updateConfig', async (data: UpdateVNPayConfigRequest) => {
  const response = await vnpayService.updateConfig(data);
  return response;
});

const vnpaySlice = createSlice({
  name: 'vnpay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVNPayConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVNPayConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(getVNPayConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch VNPay config';

        enqueueSnackbar(state.error, {
          variant: 'error'
        });
      })
      .addCase(updateVNPayConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVNPayConfig.fulfilled, (state, _) => {
        state.loading = false;
        enqueueSnackbar('Cập nhật cấu hình VNPay thành công', {
          variant: 'success'
        });
      })
      .addCase(updateVNPayConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update VNPay config';

        enqueueSnackbar(state.error, {
          variant: 'error'
        });
      });
  }
});

export default vnpaySlice;
