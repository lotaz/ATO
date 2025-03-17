import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TourPackage } from '../../types/tourism-facility/package.types';
import { packageService } from '../../services/tourism-facility/package.service';

interface PackageState {
  packages: TourPackage[];
  specific: TourPackage | null;
  loading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  packages: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchPackages = createAsyncThunk('package/fetchAll', async () => {
  const response = await packageService.getAll();
  return response;
});

export const fetchPackage = createAsyncThunk('package/fetchOne', async (id: number) => {
  const response = await packageService.getById(id);
  return response;
});

export const createPackage = createAsyncThunk('package/create', async (data: any) => {
  const response = await packageService.create(data);
  return response;
});

export const updatePackage = createAsyncThunk('package/update', async ({ id, data }: { id: number; data: any }) => {
  const response = await packageService.update(id, data);
  return response;
});

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    resetSpecific: (state) => {
      state.specific = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch packages';
      })
      .addCase(fetchPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch package';
      })
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.push(action.payload);
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create package';
      })
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.packages.findIndex((pkg) => pkg.packageId === action.payload.packageId);
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
        state.specific = action.payload;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update package';
      });
  }
});

export const { resetSpecific } = packageSlice.actions;
export default packageSlice;
