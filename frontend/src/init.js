import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App.js';
import resources from './locales/index.js';
import AuthProvider from './hoc/AuthProvider.js';
import store from './store/store.js';
import ApiProvider from './hoc/ApiProvider.js';
import FPProvider from './hoc/FilterProfanityProvider.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <ReduxProvider store={store}>
              <ApiProvider>
                <FPProvider>
                  <App />
                </FPProvider>
              </ApiProvider>
            </ReduxProvider>
          </AuthProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
