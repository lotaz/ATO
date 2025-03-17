import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tourPackageService } from '../../services/tourism-company/tour-package.service';
import { CreateTourPackageRequest, TourPackage, UpdateTourPackageRequest } from '../../types/tourism-company/tour-package.types';

interface TourPackageState {
  list: TourPackage[];
  specific: TourPackage | null;
  loading: boolean;
  error: string | null;
}

const initialState: TourPackageState = {
  list: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchTourPackages = createAsyncThunk('tourPackage/fetchAll', async () => {
  return await tourPackageService.getAll();
});

export const fetchTourPackage = createAsyncThunk('tourPackage/fetchOne', async (id: number) => {
  return await tourPackageService.getById(id);
});

export const createTourPackage = createAsyncThunk('tourPackage/create', async (data: CreateTourPackageRequest) => {
  return await tourPackageService.create(data);
});

export const updateTourPackage = createAsyncThunk('tourPackage/update', async (data: UpdateTourPackageRequest) => {
  return await tourPackageService.update(data);
});

const tourPackageSlice = createSlice({
  name: 'tourPackage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTourPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTourPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tour packages';
      })
      .addCase(fetchTourPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tour package';
      });
  }
});

export default tourPackageSlice;
