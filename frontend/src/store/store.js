import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../slices/channelSlice';
import messagesReduser from '../slices/messagesSlice';

const store = configureStore({
  reducer: {
    channelsInfo: channelReducer,
    messagesInfo: messagesReduser,
  },
});

export default store;
