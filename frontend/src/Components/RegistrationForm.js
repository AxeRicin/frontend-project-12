import axios from 'axios';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getRoutes from '../routes.js';
import { AuthContext } from '../hoc/AuthProvider';

const RegistrationForm = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isExistingUser, setExistingUser] = useState(false);
  const usernameRef = useRef();

  const fromPage = location.state?.from?.pathname ?? getRoutes.main();

  const registrationSchema = yup.object().shape({
    username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
    password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string().required('Обязательное поле').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
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
          const { data } = await axios.post(getRoutes.signup(), { username, password });
          signIn(data, () => navigate(fromPage, { replace: true }));
        } catch (err) {
          switch (err.response.status) {
            case 409:
              setExistingUser(true);
              break;

            default:
              console.error('Возникла непредвиденная ошибка');
              break;
          }
        }
      }}
    >
      {(props) => (
        <Form className="w-50" onSubmit={props.handleSubmit}>
          <h1 className="text-center mb-4">Регистрация</h1>
          <Form.Group className="form-floating mb-3" controlId="username">
            <Form.Control
              ref={usernameRef}
              name="username"
              autoComplete="username"
              placeholder="От 3 до 20 символов"
              required
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={(props.touched.username && props.errors.username) || isExistingUser}
            />
            <Form.Label>Имя пользователя</Form.Label>
            {
              props.touched.username
              && props.errors.username
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.username}</Form.Control.Feedback>
            }
            {isExistingUser && <Form.Control.Feedback type="invalid" tooltip>Такой пользователь уже существует</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="form-floating mb-3" controlId="password">
            <Form.Control
              name="password"
              autoComplete="new-password"
              placeholder="Не менее 6 символов"
              required
              type="password"
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={(props.touched.password && props.errors.password) || isExistingUser}
            />
            <Form.Label>Пароль</Form.Label>
            {
              props.touched.password
              && props.errors.password
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.password}</Form.Control.Feedback>
            }
            {isExistingUser && <Form.Control.Feedback type="invalid" tooltip>Такой пользователь уже существует</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="form-floating mb-4" controlId="confirmPassword">
            <Form.Control
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Пароли должны совпадать"
              required
              type="password"
              value={props.values.confirmPassword}
              onChange={props.handleChange}
              isInvalid={
                (props.touched.confirmPassword && props.errors.confirmPassword) || isExistingUser
              }
            />
            <Form.Label>Подтвердите пароль</Form.Label>
            {
              props.touched.confirmPassword
              && props.errors.confirmPassword
              && <Form.Control.Feedback type="invalid" tooltip>{props.errors.confirmPassword}</Form.Control.Feedback>
            }
            {isExistingUser && <Form.Control.Feedback type="invalid" tooltip>Такой пользователь уже существует</Form.Control.Feedback>}
          </Form.Group>
          <Button className="w-100" variant="outline-primary" type="submit">Зарегистрироваться</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
