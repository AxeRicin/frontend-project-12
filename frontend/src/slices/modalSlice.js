/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalClose: (state) => {
      state.isOpened = false;
      state.extra = null;
      state.type = null;
    },
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.type = type;
      state.extra = extra ?? null;
      state.isOpened = true;
    },
  },
});

export const { modalClose, openModal } = modalSlice.actions;

export default modalSlice.reducer;
