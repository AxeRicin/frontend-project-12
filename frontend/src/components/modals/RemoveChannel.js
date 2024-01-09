import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';

const RemoveChannel = () => {
  const { isOpened, extra: channelId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { sendRemoveChannel } = useContext(ApiContext);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const { t } = useTranslation();

  const handleCancel = () => dispatch(modalClose());

  const handleRemoveChannel = () => {
    setDisabledButton(true);
    sendRemoveChannel(channelId);
    setTimeout(() => {
      setDisabledButton(false);
    }, 5500);
  };

  return (
    <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.paragraph')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleCancel} disabled={isDisabledButton}>{t('modals.cancelBtn')}</Button>
          <Button variant="danger" type="button" onClick={handleRemoveChannel} disabled={isDisabledButton}>{t('modals.deleteBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
