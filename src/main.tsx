import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import { store } from './store/store';

import HomePage from './pages/HomePage.tsx';
import SettingsGendersPage from './pages/SettingsGendersPage.tsx';
import SettingsKindsPage from './pages/SettingsKindsPage.tsx';
import SettingsRolesPage from './pages/SettingsRolesPage.tsx';
import SettingsServicesPage from './pages/SettingsServicesPage.tsx';
import SettingsUserPage from './pages/SettingsUsersPage.tsx';
import SignInFormComponent from './components/auth/SignInFormComponent.tsx';
import useSession from './hooks/useSession.hook.ts';

import './index.css';

const PrivateRoute: React.FC<{ service: string, element: React.ReactNode }> = ({ service, element }) => {
  const { isAuthenticated, isLoading, handleValidateAuthorization } = useSession();
  if (isLoading) return;
  if (!handleValidateAuthorization(service)) return;
  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const routes: RouteObject[] = [
  {
    path: '/settings/users',
    element: <PrivateRoute service={'0201'} element={<SettingsUserPage />} />
  },
  {
    path: '/settings/services',
    element: <PrivateRoute service={'0401'} element={<SettingsServicesPage />} />
  },
  {
    path: '/settings/roles',
    element: <PrivateRoute service={'0301'} element={<SettingsRolesPage />} />
  },
  {
    path: '/settings/kinds',
    element: <PrivateRoute service={'0701'} element={<SettingsKindsPage />} />
  },
  {
    path: '/settings/genders',
    element: <PrivateRoute service={'0801'} element={<SettingsGendersPage />} />
  },
  {
    path: '/auth',
    element: <SignInFormComponent />
  },
  {
    path: '/',
    element: <HomePage />
  },
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
