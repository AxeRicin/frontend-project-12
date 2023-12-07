import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../slices/channelSlice';
import messagesReduser from '../slices/messagesSlice';
import modalReduser from '../slices/modalSlice';

const store = configureStore({
  reducer: {
    channelsInfo: channelReducer,
    messagesInfo: messagesReduser,
    modal: modalReduser,
  },
});

export default store;
