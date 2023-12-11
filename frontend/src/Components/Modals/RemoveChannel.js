import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';

const RemoveChannel = () => {
  const { isOpened, extra: channelId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { sendRemoveChannel } = useContext(ApiContext);

  const handleCancel = () => dispatch(modalClose());

  const handleRemoveChannel = () => sendRemoveChannel(channelId);

  return (
    <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleCancel}>Отменить</Button>
          <Button variant="danger" type="button" onClick={handleRemoveChannel}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
