/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice';

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload: remoteChannelID }) => {
      state.messages = state.messages.filter(({ channelId }) => channelId !== remoteChannelID);
    });
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
