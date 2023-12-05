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
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
