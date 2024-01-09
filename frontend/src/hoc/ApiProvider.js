/* eslint consistent-return: 0 */

import { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelSlice';

const msTimeout = 5000;

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io({
    autoConnect: false,
  });

  const connectSocket = () => {
    socket.connect();

    socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });

    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));

    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
  };

  const disconnectSocket = () => {
    socket.off('newMessage');
    socket.off('removeChannel');
    socket.off('newChannel');
    socket.off('renameChannel');
    socket.disconnect();
  };

  const sendNewMessage = (message) => new Promise((resolve, rejected) => {
    socket.timeout(msTimeout).emit('newMessage', message, (err, response) => {
      if (err) rejected(err);
      else {
        resolve(response);
      }
    });
  });

  const sendNewChannel = (nameNewChannel) => new Promise((resolve, rejected) => {
    socket.timeout(msTimeout).emit('newChannel', { name: nameNewChannel }, (err, response) => {
      if (err) {
        rejected(err);
      } else {
        const { id } = response.data;
        dispatch(addChannel(response.data));
        dispatch(setCurrentChannel(id));
        resolve();
      }
    });
  });

  const sendRemoveChannel = (id) => new Promise((resolve, rejected) => {
    socket.timeout(msTimeout).emit('removeChannel', { id }, (err) => {
      if (err) {
        rejected(err);
      } else {
        dispatch(removeChannel(id));
        resolve();
      }
    });
  });

  const sendRenameChannel = (id, newName) => new Promise((resolve, rejected) => {
    socket.timeout(msTimeout).emit('renameChannel', { id, name: newName }, (err) => {
      if (err) {
        rejected(err);
      } else {
        dispatch(renameChannel({ id, name: newName }));
        resolve();
      }
    });
  });

  const value = useMemo(() => ({
    disconnectSocket,
    sendNewMessage,
    sendNewChannel,
    sendRemoveChannel,
    sendRenameChannel,
    connectSocket,
  }), [socket]);

  return (<ApiContext.Provider value={value}>{children}</ApiContext.Provider>);
};

export default ApiProvider;
