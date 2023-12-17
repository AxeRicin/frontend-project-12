/* eslint consistent-return: 0 */

import { createContext, useMemo } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import {
  addChennel, setCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelSlice';
import { modalClose } from '../slices/modalSlice';

const msTimeout = 5000;

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const takeMessage = () => {
    socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
  };

  const takeRemoveChannel = () => {
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });
  };

  const takeChannel = () => {
    socket.on('newChannel', (payload) => dispatch(addChennel(payload)));
  };

  const sendMessage = (message) => {
    socket.timeout(msTimeout).emit('newMessage', message, (err) => {
      if (err) return console.error(err);
    });
  };

  const sendNewChannel = (nameNewChannel) => {
    socket.timeout(msTimeout).emit('newChannel', { name: nameNewChannel }, (err, response) => {
      if (err) return console.error(err);
      const { id } = response.data;
      dispatch(addChennel(response.data));
      dispatch(setCurrentChannel(id));
      dispatch(modalClose());
    });
  };

  const sendRemoveChannel = (id) => {
    socket.timeout(msTimeout).emit('removeChannel', { id }, (err, response) => {
      if (err) console.log(err);
      if (response.status === 'ok') {
        dispatch(removeChannel(id));
        dispatch(modalClose());
      }
    });
  };

  const takeRenameChannel = () => {
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
  };

  const sendRenameChannel = (id, newName) => {
    socket.timeout(msTimeout).emit('renameChannel', { id, name: newName }, (err, response) => {
      if (err) console.log(err);
      if (response.status === 'ok') {
        dispatch(renameChannel({ id, name: newName }));
        dispatch(modalClose());
      }
    });
  };

  const value = useMemo(() => ({
    sendMessage,
    takeMessage,
    sendNewChannel,
    takeChannel,
    sendRemoveChannel,
    takeRemoveChannel,
    sendRenameChannel,
    takeRenameChannel,
  }), []);

  return (<ApiContext.Provider value={value}>{children}</ApiContext.Provider>);
};

export default ApiProvider;
