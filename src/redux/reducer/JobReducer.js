import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listJobs: [],
};

const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    getJobsSuccess: (state, action) => {
      state.listJobs = action.payload.listJobs;
    },
  },
});

export const jobActions = jobSlice.actions;

export default jobSlice.reducer;
