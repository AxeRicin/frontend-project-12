import {
  Link, Outlet, useLocation, Navigate,
} from 'react-router-dom';
import getRoutes from '../routes';
import useAuth from '../hook/useAuth';
import Modal from './Modal';

const Layout = () => {
  const location = useLocation();
  const { userToken } = useAuth();
  if (location.pathname === getRoutes.main() && !userToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={getRoutes.main()}>Hexlet Chat</Link>
        </div>
      </nav>
      <Outlet />
      <Modal />
    </>
  );
};

export default Layout;
