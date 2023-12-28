/* eslint consistent-return: 0 */

import { createContext, useMemo } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelSlice';
import { modalClose } from '../slices/modalSlice';

const msTimeout = 5000;

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sendNewMessage = (message) => new Promise((resolve, rejected) => {
    socket.timeout(msTimeout).emit('newMessage', message, (err, response) => {
      if (err) rejected(err);
      else {
        resolve(response);
      }
    });
  });

  const takeMessage = () => {
    socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
  };

  const takeRemoveChannel = () => {
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });
  };

  const takeChannel = () => {
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
  };

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

  const takeRenameChannel = () => {
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
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
    sendNewMessage,
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
