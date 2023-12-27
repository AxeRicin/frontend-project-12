import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import getRoutes from '../routes.js';
import Layout from './Layout.js';
import NotFoundPage from '../page/NotFoundPage.js';
import LoginPage from '../page/LoginPage.js';
import AuthProvider from '../hoc/AuthProvider.js';
import ChatPage from '../page/ChatPage.js';
import store from '../store/store.js';
import ApiProvider from '../hoc/ApiProvider.js';
import RegistrationPage from '../page/RegistrationPage.js';
import FPProvider from '../hoc/FilterProfanityProvider.js';

const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <ApiProvider>
        <FPProvider>
          <BrowserRouter>
            <div className="d-flex flex-column h-100">
              <Routes>
                <Route path={getRoutes.main()} element={<Layout />}>
                  <Route index element={<ChatPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path={getRoutes.loginPage()} element={<LoginPage />} />
                  <Route path={getRoutes.signupPage()} element={<RegistrationPage />} />
                </Route>
              </Routes>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </FPProvider>
      </ApiProvider>
    </Provider>
  </AuthProvider>
);

export default App;
