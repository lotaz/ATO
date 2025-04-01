import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supportService } from '../../services/admin/support.service';
import { ReplyUserSupportRequest, UserSupport } from '../../types/admin/support.types';

interface SupportState {
  supports: UserSupport[];
  selectedSupport: UserSupport | null;
  loading: boolean;
  error: string | null;
}

const initialState: SupportState = {
  supports: [],
  selectedSupport: null,
  loading: false,
  error: null
};

export const fetchUserSupports = createAsyncThunk('support/fetchAll', async () => {
  const response = await supportService.getUserSupports();
  return response.data;
});

export const fetchSupportDetail = createAsyncThunk('support/fetchOne', async (id: string) => {
  const response = await supportService.getSupportDetail(id);
  return response.data;
});

export const replySupport = createAsyncThunk('support/reply', async (data: ReplyUserSupportRequest) => {
  const response = await supportService.replySupport(data);
  return response.data;
});

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSupports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSupports.fulfilled, (state, action) => {
        state.loading = false;
        state.supports = action.payload;
        state.error = null;
      })
      .addCase(fetchUserSupports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch supports';
      })
      .addCase(fetchSupportDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupportDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSupport = action.payload;
        state.error = null;
      })
      .addCase(replySupport.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.supports.findIndex((support) => support.supportId === action.payload.supportId);
        if (index !== -1) {
          state.supports[index] = action.payload;
        }
        state.selectedSupport = action.payload;
        state.error = null;
      });
  }
});

export default supportSlice;
