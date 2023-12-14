import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';

const RemoveChannel = () => {
  const { isOpened, extra: channelId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { sendRemoveChannel } = useContext(ApiContext);
  const { t } = useTranslation();

  const handleCancel = () => dispatch(modalClose());

  const handleRemoveChannel = () => sendRemoveChannel(channelId);

  return (
    <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove_channel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove_channel.paragraph')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleCancel}>{t('modals.cancel_btn')}</Button>
          <Button variant="danger" type="button" onClick={handleRemoveChannel}>{t('modals.delete_btn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
