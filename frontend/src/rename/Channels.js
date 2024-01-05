import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import ChannelBtn from './ChannelBtn';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const { channels } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat_page.chat.header')}</b>
        <button onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical" type="button">
          <PlusSquare width="20" height="20" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ChannelBtn
            key={channel.id}
            channel={channel}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
