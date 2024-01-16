import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listProducts: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    getProductsSuccess: (state, action) => {
      state.listProducts = action.payload.listProducts;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
