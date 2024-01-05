import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </div>
    </div>
  );
};

export default Loader;
