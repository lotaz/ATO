import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Activity } from '../../types/tourism-facility/activity.types';
import { activityService } from '../../services/tourism-facility/activity.service';

interface ActivityState {
  activities: Activity[];
  specific: Activity | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchActivities = createAsyncThunk('activity/fetchByPackage', async (packageId: number) => {
  const response = await activityService.getAllByPackage(packageId);
  console.log('re', response);

  return response;
});

export const fetchActivity = createAsyncThunk('activity/fetchOne', async (activityId: number) => {
  const response = await activityService.getById(activityId);
  return response;
});

export const createActivity = createAsyncThunk('activity/create', async (data: any) => {
  const response = await activityService.create(data);
  return response;
});

export const updateActivity = createAsyncThunk('activity/update', async ({ id, data }: { id: number; data: any }) => {
  const response = await activityService.update(id, data);
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
      // Fetch Activities
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch activities';
      })
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
