import { useFormik } from 'formik';
import axios from 'axios';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AuthContext } from '../hoc/AuthProvider';
import getRoutes from '../routes.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { signIn } = useContext(AuthContext);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fromPage = location.state?.from?.pathname ?? getRoutes.main();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthFailed(false);
        const response = (await axios.post(getRoutes.login(), values));
        const { data } = response;
        signIn(data);
        navigate(fromPage, { replace: true });
      } catch (err) {
        if (!err.response) {
          toast.error(t('notifications.connection_error'));
        }
        if (err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('LoginPage.LoginForm.sign_in')}</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          placeholder={t('LoginPage.LoginForm.your_nickname')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label>{t('LoginPage.LoginForm.your_nickname')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('password')}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label>{t('password')}</Form.Label>
        {authFailed && (
          <Form.Control.Feedback tooltip type={authFailed ? 'invalid' : 'valid'}>
            {t('LoginPage.LoginForm.authFailed')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button className="w-100 mb-3 " variant="outline-primary" type="submit">{t('LoginPage.LoginForm.sign_in')}</Button>
    </Form>
  );
};

export default LoginForm;
