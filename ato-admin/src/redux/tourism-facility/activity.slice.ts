import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { activityService } from '../../services/tourism-facility/activity.service';
import { ActivityResponse } from '../../types/tourism-facility/package.types';

interface ActivityState {
  activities: ActivityResponse[];
  specific: ActivityResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchActivity = createAsyncThunk('activity/fetchOne', async (activityId: string) => {
  const response = await activityService.getActivity(activityId);
  return response;
});

export const createActivity = createAsyncThunk('activity/create', async (data: any) => {
  const response = await activityService.createActivity(data);
  return response;
});

export const updateActivity = createAsyncThunk('activity/update', async ({ id, data }: { id: string; data: any }) => {
  const response = await activityService.updateActivity(id, data);
  return response;
});

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    resetSpecific: (state) => {
      state.specific = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Fetch Single Activity
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch activity';
      })
      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create activity';
      })
      // Update Activity
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.activities.findIndex((activity) => activity.activityId === action.payload.activityId);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
        state.specific = action.payload;
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update activity';
      });
  }
});

export const { resetSpecific } = activitySlice.actions;
export default activitySlice;
