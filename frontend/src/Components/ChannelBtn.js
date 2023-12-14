import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelSlice';
import { openModal } from '../slices/modalSlice';

const ChannelBtn = ({ channel }) => {
  const { currentChannelID } = useSelector((state) => state.channelsInfo);
  const isCurrentChannel = (id) => currentChannelID === id;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const hendlerClickForChannelBtn = (id) => () => dispatch(setCurrentChannel(id));

  const handleRemoveChannel = (id) => () => dispatch(openModal({ type: 'removeChannel', extra: id }));
  const handleRenameChannel = (id) => () => dispatch(openModal({ type: 'renameChannel', extra: id }));

  const classChannelName = {
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    'text-truncate': channel.removable,
    'btn-secondary': isCurrentChannel(channel.id),
  };
  const classExpandedBtn = {
    'flex-grow-0': true,
    'dropdown-toggle': true,
    'dropdown-toggle-split': true,
    'btn-secondary': isCurrentChannel(channel.id),
  };
  if (channel.removable) {
    return (
      <li className="nav-item w-100">
        <ButtonGroup className="d-flex dropdown">
          <Button onClick={hendlerClickForChannelBtn(channel.id)} variant="" className={cn(classChannelName)}>
            #
            {' '}
            {channel.name}
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="" className={classExpandedBtn}>
              <span className="visually-hidden" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveChannel(channel.id)}>{t('chat_page.chat.dropdown_delete')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRenameChannel(channel.id)}>{t('chat_page.chat.dropdown_rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </li>
    );
  }

  return (
    <li className="nav-item w-100">
      <Button onClick={hendlerClickForChannelBtn(channel.id)} variant="" className={classChannelName}>
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default ChannelBtn;
