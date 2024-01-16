import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  ComponentContent: <p>Nội dung mặc định</p>,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.ComponentContent = action.payload.ComponentContent;
    },
    hideModal: (state, action) => {
      state.visible = false;
      state.ComponentContent = <p>Nội dung mặc định</p>;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
