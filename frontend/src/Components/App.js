import { BrowserRouter, Routes, Route } from 'react-router-dom';
import getRoutes from '../routes.js';
import Layout from './Layout.js';
import NotfoundPage from '../page/NotfoundPage.js';
import LoginPage from '../page/LoginPage.js';
import AuthProvider from '../hoc/AuthProvider.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getRoutes.main()} element={<Layout />}>
            <Route path="*" element={<NotfoundPage />} />
            <Route path={getRoutes.login()} element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
