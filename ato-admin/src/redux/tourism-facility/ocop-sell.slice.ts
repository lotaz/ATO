import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OCOPSell } from '../../types/tourism-facility/ocop-sell.types';
import { ocopSellService } from '../../services/tourism-facility/ocop-sell.service';

interface OCOPSellState {
  list: OCOPSell[];
  selectedOCOPSell: OCOPSell | null;
  loading: boolean;
  error: string | null;
}

const initialState: OCOPSellState = {
  list: [],
  selectedOCOPSell: null,
  loading: false,
  error: null
};

export const fetchOCOPSells = createAsyncThunk('ocopSell/fetchAll', async (id: string) => {
  const response = await ocopSellService.getOCOPSells(id);
  return response.data;
});

export const fetchOCOPSell = createAsyncThunk('ocopSell/fetchOne', async (id: string) => {
  const response = await ocopSellService.getOCOPSell(id);
  return response.data;
});

export const createOCOPSell = createAsyncThunk('ocopSell/create', async (data: any) => {
  const response = await ocopSellService.createOCOPSell(data);
  return response.data;
});

export const updateOCOPSell = createAsyncThunk('ocopSell/update', async ({ id, data }: { id: string; data: any }) => {
  const response = await ocopSellService.updateOCOPSell(id, data);
  return response.data;
});

const ocopSellSlice = createSlice({
  name: 'ocopSell',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOCOPSells.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOCOPSells.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOCOPSells.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOCOPSell.fulfilled, (state, action) => {
        state.selectedOCOPSell = action.payload;
      })
      .addCase(createOCOPSell.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateOCOPSell.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.ocopSellId === action.payload.ocopSellId);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default ocopSellSlice;
