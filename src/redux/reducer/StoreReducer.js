import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listStores: [],
};

const storeSlice = createSlice({
  name: 'storeSlice',
  initialState,
  reducers: {
    getStoresSuccess: (state, action) => {
      state.listStores = action.payload.listStores;
    },
  },
});

export const storeActions = storeSlice.actions;

export default storeSlice.reducer;
