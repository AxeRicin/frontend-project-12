import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRoutes from '../routes.js';
import { AuthContext } from '../hoc/AuthProvider';
import { addChennels } from '../slices/channelSlice';
import { addMessages } from '../slices/messagesSlice.js';
import Loader from '../Components/Loader.js';
import Channels from '../Components/Channels.js';
import ChatChannel from '../Components/ChatChannel.js';
import getModal from '../Components/Modals/index.js';

const ChatPage = () => {
  const { userToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { type } = useSelector(((state) => state.modal));

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
  }, [userToken]);
  if (!isLoaded) return (<Loader />);
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
