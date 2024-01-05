import axios from 'axios';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import getRoutes from '../routes.js';
import { AuthContext } from '../hoc/AuthProvider';

const RegistrationForm = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isExistingUser, setExistingUser] = useState(false);
  const usernameRef = useRef();
  const { t } = useTranslation();

  const fromPage = location.state?.from?.pathname ?? getRoutes.main();

  const registrationSchema = yup.object().shape({
    username: yup.string().required(t('reg_page.reg_form.reg_error.mandatory_field')).min(3, t('reg_page.reg_form.reg_error.min_or_max_length_username')).max(20, t('reg_page.reg_form.reg_error.min_or_max_length_username')),
    password: yup.string().required(t('reg_page.reg_form.reg_error.mandatory_field')).min(6, t('reg_page.reg_form.reg_error.min_length_password')),
    confirmPassword: yup.string().required(t('reg_page.reg_form.reg_error.mandatory_field')).oneOf([yup.ref('password')], t('reg_page.reg_form.reg_error.passwords_must_match')),
  });

  useEffect(() => {
    usernameRef.current.select();
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={registrationSchema}
      onSubmit={async ({ username, password }) => {
        try {
          setExistingUser(false);
          const { data } = await axios.post(getRoutes.signUp(), { username, password });
          signIn(data);
          navigate(fromPage, { replace: true });
        } catch (err) {
          switch (err.response.status) {
            case 409:
              setExistingUser(true);
              break;

            default:
              console.error('An unexpected error occurred');
              break;
          }
        }
      }}
    >
      {(props) => (
        <Form className="w-50" onSubmit={props.handleSubmit}>
          <h1 className="text-center mb-4">{t('registration')}</h1>
          <Form.Group className="form-floating mb-3" controlId="username">
            <Form.Control
              ref={usernameRef}
              name="username"
              autoComplete="username"
              placeholder={t('reg_page.reg_form.reg_error.min_or_max_length_username')}
              required
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={(props.touched.username && props.errors.username) || isExistingUser}
            />
            <Form.Label>{t('reg_page.reg_form.username_lable')}</Form.Label>
            {
              props.touched.username
              && props.errors.username
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.username}</Form.Control.Feedback>
            }
          </Form.Group>
          <Form.Group className="form-floating mb-3" controlId="password">
            <Form.Control
              name="password"
              autoComplete="new-password"
              placeholder={t('reg_page.reg_form.reg_error.min_length_password')}
              required
              type="password"
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={(props.touched.password && props.errors.password) || isExistingUser}
            />
            <Form.Label>{t('password')}</Form.Label>
            {
              props.touched.password
              && props.errors.password
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.password}</Form.Control.Feedback>
            }
          </Form.Group>
          <Form.Group className="form-floating mb-4" controlId="confirmPassword">
            <Form.Control
              name="confirmPassword"
              autoComplete="new-password"
              placeholder={t('reg_page.reg_form.reg_error.passwords_must_match')}
              required
              type="password"
              value={props.values.confirmPassword}
              onChange={props.handleChange}
              isInvalid={
                (props.touched.confirmPassword && props.errors.confirmPassword) || isExistingUser
              }
            />
            <Form.Label>{t('reg_page.reg_form.confirm_password')}</Form.Label>
            {
              props.touched.confirmPassword
              && props.errors.confirmPassword
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.confirmPassword}</Form.Control.Feedback>
            }
            {isExistingUser && <Form.Control.Feedback type="invalid" tooltip>{t('reg_page.reg_form.reg_error.user_exist')}</Form.Control.Feedback>}
          </Form.Group>
          <Button className="w-100" variant="outline-primary" type="submit">{t('reg_page.reg_form.sign_up_btn')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
