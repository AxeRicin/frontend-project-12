import { createContext, useMemo } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';

const msTimeout = 5000;

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();
  const takeMessage = () => {
    socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
  };

  const sendMessage = (message) => {
    socket.timeout(msTimeout).emit('newMessage', message, (err, response) => {
      if (!response) {
        console.error('сообщение не отправлено');
      }
      if (err) {
        console.error(err);
      }
    });
  };

  const value = useMemo(() => ({
    sendMessage,
    takeMessage,
  }), []);

  return (<ApiContext.Provider value={value}>{children}</ApiContext.Provider>);
};

export default ApiProvider;
