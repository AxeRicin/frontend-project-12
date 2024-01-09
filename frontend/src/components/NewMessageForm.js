/* eslint consistent-return: 0 */

import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { AuthContext } from '../hoc/AuthProvider';
import { ApiContext } from '../hoc/ApiProvider';
import { FilterContext } from '../hoc/FilterProfanityProvider';

const NewMessageForm = ({ currentChannelID }) => {
  const { user: { username } } = useContext(AuthContext);
  const { t } = useTranslation();
  const { sendNewMessage } = useContext(ApiContext);
  const filter = useContext(FilterContext);
  const textArea = useRef();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      try {
        const message = { body: filter.clean(values.body), channelId: currentChannelID, username };
        await sendNewMessage(message);
        formik.values.body = '';
        formik.setSubmitting(false);
      } catch (err) {
        formik.setSubmitting(false);
        toast.error(t('notifications.connectionError'));
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
          aria-label={t('chatPage.chat.newMessage')}
          placeholder={t('chatPage.chat.enterMessage')}
          type="text"
          value={formik.values.body}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
        />
        <button className="btn btn-group-vertical" type="submit" disabled={formik.isSubmitting}>
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">{t('chatPage.chat.sendBtn')}</span>
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
