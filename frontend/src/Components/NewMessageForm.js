import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';
import { ApiContext } from '../hoc/ApiProvider';

const NewMessageForm = ({ currentChannelID }) => {
  const { username } = useContext(AuthContext);
  const { sendMessage } = useContext(ApiContext);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      if (formik.values.body !== '') {
        sendMessage({ ...values, channelId: currentChannelID, username });
        formik.values.body = '';
      }
    },
  });

  return (
    <form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          className="border-0 p-0 ps-2 form-control"
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          type="text"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <button className="btn btn-group-vertical" type="submit" disabled="">
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
