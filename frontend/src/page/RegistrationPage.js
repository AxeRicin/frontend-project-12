import { useTranslation } from 'react-i18next';
import avatar1 from '../assets/avatar1.jpg';
import RegistrationForm from '../Components/RegistrationForm';

const RegistrationPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img className="rounded-circle" src={avatar1} alt={t('registration')} />
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
