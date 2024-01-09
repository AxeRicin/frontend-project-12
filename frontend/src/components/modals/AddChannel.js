import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';
import { FilterContext } from '../../hoc/FilterProfanityProvider';

const ModalAddChannel = () => {
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const { sendNewChannel } = useContext(ApiContext);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const filter = useContext(FilterContext);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const { t } = useTranslation();

  const channelNames = channels.map((channel) => channel.name);

  const handleCancel = () => dispatch(modalClose());

  const newChannelSchema = yup.object().shape({
    name: yup.string().required(t('modals.errValid.minOrMaxLengthUsername')).min(3, t('modals.errValid.minOrMaxLengthUsername')).max(20, t('modals.errValid.minOrMaxLengthUsername'))
      .test({ message: () => t('modals.errValid.notUniqueName'), test: (newName) => !channelNames.includes(newName) }),
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
      onSubmit={async (values) => {
        try {
          setDisabledButton(true);
          await sendNewChannel(filter.clean(values.name));
          dispatch(modalClose());
          toast.success(t('notifications.channelAdd'));
        } catch (error) {
          setDisabledButton(false);
          toast.error(t('notifications.connectionError'));
        }
      }}
    >
      {(props) => (
        <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
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
                <Form.Label className="visually-hidden">{t('modals.addChannel.label')}</Form.Label>
                <div className="d-flex justify-content-end">
                  <Button className="me-2" variant="secondary" onClick={handleCancel} disabled={isDisabledButton}>{t('modals.cancelBtn')}</Button>
                  <Button variant="primary" type="submit" disabled={isDisabledButton}>{t('modals.sendBtn')}</Button>
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
