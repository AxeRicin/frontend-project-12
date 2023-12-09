import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';

const ModalAddChannel = () => {
  const { isOpened } = useSelector((state) => state.modal);
  const { sendNewChannel } = useContext(ApiContext);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [inputInvalid] = useState(false);
  // setInputInvalid
  const handlerСlosure = () => dispatch(modalClose());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      sendNewChannel(values.name);
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handlerСlosure}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              ref={inputRef}
              className={cn({
                'mb-2': true,
                'is-invalid': inputInvalid,
              })}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary">Отменить</Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
