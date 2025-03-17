import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tourDestinationService } from '../../services/tourism-company/tour-destination.service';
import {
  CreateTourDestinationRequest,
  TourDestination,
  UpdateTourDestinationRequest
} from '../../types/tourism-company/tour-destination.types';

interface TourDestinationState {
  list: TourDestination[];
  specific: TourDestination | null;
  loading: boolean;
  error: string | null;
}

const initialState: TourDestinationState = {
  list: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchTourDestinations = createAsyncThunk('tourDestination/fetchAll', async (tourPackageId: number) => {
  return await tourDestinationService.getAll(tourPackageId);
});

export const fetchTourDestination = createAsyncThunk('tourDestination/fetchOne', async (id: number) => {
  return await tourDestinationService.getById(id);
});

export const createTourDestination = createAsyncThunk('tourDestination/create', async (data: CreateTourDestinationRequest) => {
  return await tourDestinationService.create(data);
});

export const updateTourDestination = createAsyncThunk('tourDestination/update', async (data: UpdateTourDestinationRequest) => {
  return await tourDestinationService.update(data);
});

const tourDestinationSlice = createSlice({
  name: 'tourDestination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTourDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTourDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchTourDestination.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTourDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchTourDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export default tourDestinationSlice;
