import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../hoc/AuthProvider';
import getRoutes from '../routes.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { signIn } = useContext(AuthContext);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.from?.pathname ?? getRoutes.main();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthFailed(false);
        const response = (await axios.post('/api/v1/login', values));
        console.log(response);
        const { data } = response;
        signIn(data, () => navigate(fromPage, { replace: true }));
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
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
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          ref={inputRef}
          className={cn({
            'form-control': true,
            'is-invalid': authFailed,
          })}
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">
          Ваш Ник
        </label>
      </div>
      <div className="form-floating mb-5">
        <input
          className={cn({
            'form-control': true,
            'is-invalid': authFailed,
          })}
          id="password"
          name="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">Пароль</label>
        {authFailed && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
      </div>
      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>

    </form>
  );
};

export default LoginForm;
