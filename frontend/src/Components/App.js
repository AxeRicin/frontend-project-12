import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import getRoutes from '../routes.js';
import Layout from './Layout.js';
import NotfoundPage from '../page/NotfoundPage.js';
import LoginPage from '../page/LoginPage.js';
import AuthProvider from '../hoc/AuthProvider.js';
import ChatPage from '../page/ChatPage.js';
import store from '../store/store.js';
import ApiProvider from '../hoc/ApiProvider.js';
import RegistrationPage from '../page/RegistrationPage.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Provider store={store}>
        <ApiProvider>
          <BrowserRouter>
            <Routes>
              <Route path={getRoutes.main()} element={<Layout />}>
                <Route index element={<ChatPage />} />
                <Route path="*" element={<NotfoundPage />} />
                <Route path={getRoutes.loginpage()} element={<LoginPage />} />
                <Route path={getRoutes.signuppage()} element={<RegistrationPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiProvider>
      </Provider>
    </AuthProvider>
  </div>
);

export default App;
