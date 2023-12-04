import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import getRoutes from '../routes.js';
import { AuthContext } from '../hoc/AuthProvider';
import { addChennels } from '../slices/channelSlice';
import { addMessages } from '../slices/messagesSlice.js';
import Loader from '../Components/Loader.js';
import Channels from '../Components/Channels.js';
import ChatChannel from '../Components/ChatChannel.js';

const ChatPage = () => {
  const { userToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(getRoutes.data(), {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const { data } = response;
      dispatch(addChennels(data));
      dispatch(addMessages(data));
      setIsLoaded(true);
    };
    fetchData();
  });
  if (!isLoaded) return (<Loader />);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <ChatChannel />
      </div>
    </div>
  );
};

export default ChatPage;
