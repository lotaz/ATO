import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateDriverRequest, Driver, UpdateDriverRequest } from '../../types/tourism-company/driver.types';
import { driverService } from '../../services/tourism-company/driver.service';

interface DriverState {
  drivers: Driver[];
  specific: Driver | null;
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchDrivers = createAsyncThunk('driver/fetchDrivers', async () => {
  const response = await driverService.getDrivers();
  return response;
});

export const fetchDriver = createAsyncThunk('driver/fetchDriver', async (id: string) => {
  const response = await driverService.getDriverById(id);
  return response;
});

export const createDriver = createAsyncThunk('driver/createDriver', async (data: CreateDriverRequest) => {
  const response = await driverService.createDriver(data);
  return response;
});

export const updateDriver = createAsyncThunk('driver/updateDriver', async ({ id, data }: { id: string; data: UpdateDriverRequest }) => {
  const response = await driverService.updateDriver(id, data);
  return response;
});

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    resetSpecific: (state) => {
      state.specific = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      })
      .addCase(fetchDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch driver';
      })
      .addCase(createDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers.push(action.payload);
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create driver';
      })
      .addCase(updateDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.map((driver) => (driver.driverId === action.payload.driverId ? action.payload : driver));
        state.specific = action.payload;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update driver';
      });
  }
});

export const { resetSpecific } = driverSlice.actions;
export default driverSlice;
