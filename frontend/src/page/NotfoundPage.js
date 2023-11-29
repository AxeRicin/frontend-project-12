import { Link } from 'react-router-dom';
import notFoundPNG from '../assets/notFound.png';
import getRoutes from '../routes.js';

const Notfoundpage = () => (
  <div className="text-center">
    <img
      className="img-fluid h-25"
      src={notFoundPNG}
      alt="Страница не найдена"
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <Link to={getRoutes.main()}>на главную страницу</Link>
    </p>
  </div>
);

export default Notfoundpage;
