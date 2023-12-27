import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../slices/channelSlice';
import messagesReducer from '../slices/messagesSlice';
import modalReducer from '../slices/modalSlice';

const store = configureStore({
  reducer: {
    channelsInfo: channelReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
  },
});

export default store;
