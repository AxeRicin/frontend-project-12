import { useSelector } from 'react-redux';
import { Modal as Mbs } from 'react-bootstrap';

const getTitle = (type) => {
  switch (type) {
    case 'addChannel':
      return 'Добавить канал';

    default:
      return 'Неизвестная модалка!!! О_О';
  }
};

const Modal = () => {
  const { isOpened, type, extra } = useSelector((state) => state.modal);

  return (
    <Mbs show={isOpened}>
      <Mbs.Header closeButton>
        <Mbs.Title>{getTitle(type)}</Mbs.Title>
      </Mbs.Header>
      <Mbs.Body>{getBody(type)}</Mbs.Body>
    </Mbs>
  );
};

export default Modal;
