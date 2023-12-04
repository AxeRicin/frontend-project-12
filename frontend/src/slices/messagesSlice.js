/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
  },
});

export const { addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
