import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRoutes from '../routes.js';
import { AuthContext } from '../hoc/AuthProvider';
import { addChannels } from '../slices/channelSlice';
import { addMessages } from '../slices/messagesSlice.js';
import Loader from '../components/Loader.js';
import Channels from '../components/Channels.js';
import ChatChannel from '../components/ChatChannel.js';
import getModal from '../components/modals/index.js';
import { ApiContext } from '../hoc/ApiProvider.js';

const ChatPage = () => {
  const { user, getAuthHeader } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useSelector(((state) => state.modal));
  const { connectSocket, disconnectSocket } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(getRoutes.data(), getAuthHeader());
      const { data } = response;
      dispatch(addChannels(data));
      dispatch(addMessages(data));
      setIsLoading(true);
    };
    fetchData();
    connectSocket();
    return disconnectSocket;
  }, [user]);

  if (!isLoading) return (<Loader />);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <ChatChannel />
        </div>
      </div>
      {getModal(type)}
    </>
  );
};

export default ChatPage;
