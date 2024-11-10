import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { store } from './store/store';
import AuthPage from './pages/AuthPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SettingsGendersPage from './pages/SettingsGendersPage.tsx';
import SettingsKindsPage from './pages/SettingsKindsPage.tsx';
import SettingsRolesPage from './pages/SettingsRolesPage.tsx';
import SettingsServicesPage from './pages/SettingsServicesPage.tsx';
import SettingsUserPage from './pages/SettingsUsersPage.tsx';

import './index.css';


const isAuthenticated = !!localStorage.getItem('token');

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute element={<HomePage />} />
  },
  {
    path: '/settings/users',
    element: <PrivateRoute element={<SettingsUserPage />} />
  },
  {
    path: '/settings/services',
    element: <PrivateRoute element={<SettingsServicesPage />} />
  },
  {
    path: '/settings/roles',
    element: <PrivateRoute element={<SettingsRolesPage />} />
  },
  {
    path: '/settings/kinds',
    element: <PrivateRoute element={<SettingsKindsPage />} />
  },
  {
    path: '/settings/genders',
    element: <PrivateRoute element={<SettingsGendersPage />} />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
];

const router = createBrowserRouter(routes, {
  basename: '/dv-idico-web/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
