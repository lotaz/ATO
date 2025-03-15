import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { facilityService } from '../services/facility/facilityService';
import { Facility, CreateFacilityRequest, UpdateFacilityRequest } from '../services/facility/types';
import { User } from '../types';

interface FacilityState {
  list: Facility[];
  specific: Facility | null;
  loading: boolean;
  error: string | null;
  unassigned: User[] | null;
}

const initialState: FacilityState = {
  list: [],
  specific: null,
  loading: false,
  error: null,
  unassigned: []
};

export const getFacilities = createAsyncThunk('facility/getFacilities', async () => {
  const response = await facilityService.getCompanies();
  return response;
});

export const getFacility = createAsyncThunk('facility/getFacility', async (id: string) => {
  const response = await facilityService.getCompany(id);
  return response;
});

export const createFacility = createAsyncThunk('facility/createFacility', async (data: CreateFacilityRequest) => {
  const response = await facilityService.createCompany(data);
  return response;
});

export const updateFacility = createAsyncThunk('facility/updateFacility', async (data: UpdateFacilityRequest) => {
  const response = await facilityService.updateCompany(data);
  return response;
});
export const getUnAssigedAccounts = createAsyncThunk('facility/account', async () => await facilityService.getUnAssigedAccounts());

const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnAssigedAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnAssigedAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.unassigned = action.payload;
      })
      .addCase(getFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch facilities';
      })
      .addCase(getFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacility.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(getFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch facility';
      })
      .addCase(createFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFacility.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create facility';
      })
      .addCase(updateFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFacility.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(updateFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update facility';
      });
  }
});

export default facilitySlice;
