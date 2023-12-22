/* eslint consistent-return: 0 */

import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AuthContext } from '../hoc/AuthProvider';
import { ApiContext } from '../hoc/ApiProvider';
import { FilterContext } from '../hoc/FilterProfanityProvider';

const msTimeout = 5000;

const NewMessageForm = ({ currentChannelID }) => {
  const { username } = useContext(AuthContext);
  const { t } = useTranslation();
  const [isDisabledForm, setDisabledForm] = useState(false);
  const { socket } = useContext(ApiContext);
  const filter = useContext(FilterContext);
  const textArea = useRef();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      if (formik.values.body !== '') {
        setDisabledForm(true);

        socket.timeout(msTimeout).emit('newMessage', { body: filter.clean(values.body), channelId: currentChannelID, username }, (err, response) => {
          if (err) {
            setDisabledForm(false);
            return toast.error(t('notifications.connection_error'));
          }
          if (response.status === 'ok') {
            formik.values.body = '';
            setDisabledForm(false);
          }
        });
      }
    },
  });

  useEffect(() => textArea.current.focus());

  return (
    <form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          ref={textArea}
          className="border-0 p-0 ps-2 form-control"
          name="body"
          aria-label={t('chat_page.chat.new_message')}
          placeholder={t('chat_page.chat.enter_message')}
          type="text"
          value={formik.values.body}
          onChange={formik.handleChange}
          disabled={isDisabledForm}
        />
        <button className="btn btn-group-vertical" type="submit" disabled={isDisabledForm}>
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">{t('chat_page.chat.send_btn')}</span>
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
