import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listVideo: [],
};

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    getVideoSuccess: (state, action) => {
      state.listVideo = action.payload.listVideo;
    },
  },
});

export const videoActions = videoSlice.actions;

export default videoSlice.reducer;
