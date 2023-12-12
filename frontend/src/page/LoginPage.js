import { Link } from 'react-router-dom';
import getRoutes from '../routes.js';
import avatar from '../assets/avatar.jpg';
import LoginForm from '../Components/LoginForm.js';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img className="rounded-circle" src={avatar} alt="Войти" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <Link to={getRoutes.signuppage()}>Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
