import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../assets/notFound.svg';
import getRoutes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        src={notFoundImg}
        alt={t('notFoundPage.header')}
      />
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.paragraph')}
        {' '}
        <Link to={getRoutes.main()}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
