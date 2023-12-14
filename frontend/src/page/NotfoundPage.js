import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../assets/notFound.svg';
import getRoutes from '../routes.js';

const Notfoundpage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        src={notFoundImg}
        alt={t('not_found_page.header')}
      />
      <h1 className="h4 text-muted">{t('not_found_page.header')}</h1>
      <p className="text-muted">
        {t('not_found_page.paragraph')}
        {' '}
        <Link to={getRoutes.main()}>{t('not_found_page.link')}</Link>
      </p>
    </div>
  );
};

export default Notfoundpage;
