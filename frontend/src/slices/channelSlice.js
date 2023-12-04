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
    addChennels: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.currentChannelID = currentChannelId;
      state.channels = channels;
    },
    setCurrentChannel: (state, { payload: id }) => {
      state.currentChannelID = id;
    },
  },
});

export const { addChennels, setCurrentChannel } = channelSlice.actions;

export default channelSlice.reducer;
