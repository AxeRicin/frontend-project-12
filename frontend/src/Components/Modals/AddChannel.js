import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import * as yup from 'yup';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';

const ModalAddChannel = () => {
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const { sendNewChannel } = useContext(ApiContext);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);

  const channelNames = channels.map((channel) => channel.name);

  const handleCancel = () => dispatch(modalClose());

  const newChannelSchema = yup.object().shape({
    name: yup.string().required('От 3 до 20 символов').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов')
      .test({ message: () => 'Должно быть уникальным', test: (newName) => !channelNames.includes(newName) }),
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={newChannelSchema}
      onSubmit={(values) => {
        setDisabledSubmit(true);
        sendNewChannel(values.name);
      }}
    >
      {(props) => (
        <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={props.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Control
                  ref={inputRef}
                  className="mb-2"
                  name="name"
                  value={props.values.name}
                  onChange={props.handleChange}
                  isInvalid={props.touched.name && props.errors.name}
                />
                {props.touched.name && props.errors.name && <Form.Control.Feedback type="invalid">{props.errors.name}</Form.Control.Feedback>}
                <Form.Label className="visually-hidden">Имя канала</Form.Label>
                <div className="d-flex justify-content-end">
                  <Button className="me-2" variant="secondary" onClick={handleCancel}>Отменить</Button>
                  <Button variant="primary" type="submit" disabled={isDisabledSubmit}>Отправить</Button>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}

    </Formik>
  );
};

export default ModalAddChannel;
