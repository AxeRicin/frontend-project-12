/* eslint consistent-return: 0 */

import { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelSlice';
import { modalClose } from '../slices/modalSlice';

const msTimeout = 5000;

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const socket = io({
    autoConnect: false,
  });

  const connectSocket = () => {
    socket.connect();

    socket.on('newMessage', (newMessage) => console.log(newMessage) || dispatch(addMessage(newMessage)));

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
      console.log(response);
      if (err) rejected(err);
      else {
        resolve(response);
      }
    });
  });

  const sendNewChannel = (nameNewChannel) => {
    socket.timeout(msTimeout).emit('newChannel', { name: nameNewChannel }, (err, response) => {
      if (err) return toast.error(t('notifications.connection_error'));
      const { id } = response.data;
      dispatch(addChannel(response.data));
      dispatch(setCurrentChannel(id));
      dispatch(modalClose());
      toast.success(t('notifications.channel_add'));
    });
  };

  const sendRemoveChannel = (id) => {
    socket.timeout(msTimeout).emit('removeChannel', { id }, (err, response) => {
      if (err) return toast.error(t('notifications.connection_error'));
      if (response.status === 'ok') {
        dispatch(removeChannel(id));
        dispatch(modalClose());
        toast.success(t('notifications.channel_remove'));
      }
    });
  };

  const sendRenameChannel = (id, newName) => {
    socket.timeout(msTimeout).emit('renameChannel', { id, name: newName }, (err, response) => {
      if (err) return toast.error(t('notifications.connection_error'));
      if (response.status === 'ok') {
        dispatch(renameChannel({ id, name: newName }));
        dispatch(modalClose());
        toast.success(t('notifications.channel_rename'));
      }
    });
  };

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
