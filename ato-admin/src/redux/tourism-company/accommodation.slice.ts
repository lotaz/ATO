import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest } from '../../types/tourism-company/accommodation.types';
import { accommodationService } from '../../services/tourism-company/accommodation.service';

interface AccommodationState {
  accommodations: Accommodation[];
  specific: Accommodation | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccommodationState = {
  accommodations: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchAccommodations = createAsyncThunk('accommodation/fetchAccommodations', async () => {
  const response = await accommodationService.getAccommodations();
  return response;
});

export const fetchAccommodation = createAsyncThunk('accommodation/fetchAccommodation', async (id: string) => {
  const response = await accommodationService.getAccommodationById(id);
  return response;
});

export const createAccommodation = createAsyncThunk('accommodation/createAccommodation', async (data: CreateAccommodationRequest) => {
  const response = await accommodationService.createAccommodation(data);
  return response;
});

export const updateAccommodation = createAsyncThunk(
  'accommodation/updateAccommodation',
  async ({ id, data }: { id: string; data: UpdateAccommodationRequest }) => {
    const response = await accommodationService.updateAccommodation(id, data);
    return response;
  }
);

const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {
    resetSpecific: (state) => {
      state.specific = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accommodations';
      })
      .addCase(fetchAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accommodation';
      })
      .addCase(createAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations.push(action.payload);
      })
      .addCase(createAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create accommodation';
      })
      .addCase(updateAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations = state.accommodations.map((acc) =>
          acc.accommodationId === action.payload.accommodationId ? action.payload : acc
        );
        state.specific = action.payload;
      })
      .addCase(updateAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update accommodation';
      });
  }
});

export const { resetSpecific } = accommodationSlice.actions;
export default accommodationSlice;
