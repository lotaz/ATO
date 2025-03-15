import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { configService } from '../services/config';
import { IEmailConfig } from '../services/config/types';
import { enqueueSnackbar } from 'notistack';

interface EmailConfigState {
  config: IEmailConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailConfigState = {
  config: null,
  loading: false,
  error: null
};

export const getEmailConfig = createAsyncThunk('emailConfig/getConfig', async () => {
  const response = await configService.getEmailConfig();
  return response;
});

export const updateEmailConfig = createAsyncThunk('emailConfig/updateConfig', async (data: IEmailConfig) => {
  const response = await configService.updateEmailConfig(data);
  return response.data;
});

const emailConfigSlice = createSlice({
  name: 'emailConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmailConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmailConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(getEmailConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Không thể tải cấu hình email';
        enqueueSnackbar(state.error, { variant: 'error' });
      })
      .addCase(updateEmailConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailConfig.fulfilled, (state, action) => {
        state.loading = false;

        enqueueSnackbar('Cập nhật cấu hình email thành công', { variant: 'success' });
      })
      .addCase(updateEmailConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra';
        enqueueSnackbar(state.error, { variant: 'error' });
      });
  }
});

export default emailConfigSlice;
