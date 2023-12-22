import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { modalClose } from '../../slices/modalSlice';
import { ApiContext } from '../../hoc/ApiProvider';
import { FilterContext } from '../../hoc/FilterProfanityProvider';

const RenameChannel = () => {
  const { isOpened, extra: channelId } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const { sendRenameChannel } = useContext(ApiContext);
  const inputRef = useRef(null);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const { t } = useTranslation();
  const filter = useContext(FilterContext);

  const dispatch = useDispatch();

  const handleCancel = () => dispatch(modalClose());

  const channelNames = channels.map((channel) => channel.name);
  const newChannelSchema = yup.object().shape({
    name: yup.string().required(t('modals.err_valid.min_or_max_length_username')).min(3, t('modals.err_valid.min_or_max_length_username')).max(20, t('modals.err_valid.min_or_max_length_username'))
      .test({ message: () => t('modals.err_valid.notunique_name'), test: (newName) => !channelNames.includes(newName) }),
  });

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={newChannelSchema}
      onSubmit={(values) => {
        setDisabledButton(true);
        sendRenameChannel(channelId, filter.clean(values.name));
        setTimeout(() => {
          setDisabledButton(false);
        }, 5500);
      }}
    >
      {(props) => (
        <Modal dialogClassName="modal-dialog-centered" show={isOpened} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.rename_channel.title')}</Modal.Title>
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
                <Form.Label className="visually-hidden">{t('modals.rename_channel.label')}</Form.Label>
                <div className="d-flex justify-content-end">
                  <Button className="me-2" variant="secondary" onClick={handleCancel} disabled={isDisabledButton}>{t('modals.cancel_btn')}</Button>
                  <Button variant="primary" type="submit" disabled={isDisabledButton}>{t('modals.send_btn')}</Button>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannel;
