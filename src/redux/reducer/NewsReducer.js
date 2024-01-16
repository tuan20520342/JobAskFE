import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listNews: [],
};

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    getNewsSuccess: (state, action) => {
      state.listNews = action.payload.listNews;
    },
  },
});

export const newsActions = newsSlice.actions;

export default newsSlice.reducer;
