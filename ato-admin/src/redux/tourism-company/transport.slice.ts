import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Transport } from '../../types/tourism-company/transport.types';
import { transportService } from '../../services/tourism-company/transport.service';

interface TransportState {
  list: Transport[];
  loading: boolean;
  error: string | null;
}

const initialState: TransportState = {
  list: [],
  loading: false,
  error: null
};

export const fetchTransports = createAsyncThunk('transport/fetchTransports', async ({ fromId, toId }: { fromId: string; toId: string }) => {
  const response = await transportService.getByDestinations(fromId, toId);
  return response;
});

export const createTransport = createAsyncThunk('transport/createTransport', async (data: any) => {
  const response = await transportService.create(data);
  return response;
});

export const updateTransport = createAsyncThunk('transport/updateTransport', async (data: any) => {
  const response = await transportService.update(data);
  return response;
});

export const deleteTransport = createAsyncThunk('transport/deleteTransport', async (id: string) => {
  await transportService.delete(id);
  return id;
});

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransports.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTransports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transports';
      });
  }
});

export default transportSlice;
