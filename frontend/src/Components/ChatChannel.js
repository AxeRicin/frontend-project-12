import { useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';
import { ApiContext } from '../hoc/ApiProvider';

const ChatChannel = () => {
  const { channels, currentChannelID } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  const { takeMessage } = useContext(ApiContext);
  const { t } = useTranslation();

  const currentChannel = channels.find((channel) => channel.id === currentChannelID);

  const currentMessages = messages.filter((message) => message.channelId === currentChannelID);

  useEffect(() => {
    takeMessage();
  }, [takeMessage]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chat_page.chat.counter_message.message', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {currentMessages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <NewMessageForm currentChannelID={currentChannelID} />
        </div>
      </div>
    </div>
  );
};

export default ChatChannel;
