import {
  Link, Outlet, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import getRoutes from '../routes';
import useAuth from '../hook/useAuth';
import getModal from './Modals/index';

const Layout = () => {
  const location = useLocation();
  const { userToken } = useAuth();
  const { type } = useSelector(((state) => state.modal));
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
      {getModal(type)}
    </>
  );
};

export default Layout;
