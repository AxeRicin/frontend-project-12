/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelID: null,
};

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChennels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.currentChannelID = currentChannelId;
      state.channels = channels;
    },
    addChennel: (state, { payload }) => {
      console.log(payload, state);
    },
    setCurrentChannel: (state, { payload: id }) => {
      state.currentChannelID = id;
    },
  },
});

export const { addChennels, addChennel, setCurrentChannel } = channelSlice.actions;

export default channelSlice.reducer;
