import {
  Link, Outlet, useLocation, Navigate, useNavigate,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import getRoutes from '../routes';
import useAuth from '../hook/useAuth';
import { AuthContext } from '../hoc/AuthProvider';

const Layout = () => {
  const location = useLocation();
  const { userToken } = useAuth();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const hendlesignOut = () => {
    signOut(() => navigate(getRoutes.loginpage()));
  };

  if (location.pathname === getRoutes.main() && !userToken) {
    return <Navigate to={getRoutes.loginpage()} state={{ from: location }} />;
  }
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={getRoutes.main()}>Hexlet Chat</Link>
          {userToken && <Button variant="primary" onClick={hendlesignOut}>{t('exit_btn')}</Button>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
