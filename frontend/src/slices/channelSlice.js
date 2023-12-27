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
    addChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.currentChannelID = currentChannelId;
      state.channels = channels;
    },
    addChannel: (state, { payload }) => {
      const isCopy = Boolean(state.channels.find(({ id }) => id === payload.id));
      if (!isCopy) {
        state.channels.push(payload);
      }
    },
    removeChannel: (state, { payload: removeId }) => {
      const { currentChannelID } = state;
      if (currentChannelID === removeId) state.currentChannelID = 1;
      state.channels = state.channels.filter((channel) => channel.id !== removeId);
    },
    renameChannel: (state, { payload: { id, name: newName } }) => {
      const channelTarget = state.channels.find((channel) => channel.id === id);
      channelTarget.name = newName;
    },
    setCurrentChannel: (state, { payload: id }) => {
      state.currentChannelID = id;
    },
  },
});

export const {
  addChannels, addChannel, setCurrentChannel, removeChannel, renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
