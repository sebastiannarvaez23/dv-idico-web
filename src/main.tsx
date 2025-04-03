import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import { store } from './store/store';

import AdminGendersPage from './pages/AdminGendersPage.tsx';
import AdminKindsPage from './pages/AdminKindsPage.tsx';
import AdminPersonsPage from './pages/AdminPersonsPage.tsx';
import AdminRolesPage from './pages/AdminRolesPage.tsx';
import AdminServicesPage from './pages/AdminServicesPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SignInFormComponent from './components/auth/SignInFormComponent.tsx';
import useSession from './hooks/useSession.hook.ts';

import './index.css';
import AdminUsersPage from './pages/AdminUsersPage.tsx';

const PrivateRoute: React.FC<{ service: string, element: React.ReactNode }> = ({ service, element }) => {
  const { isAuthenticated, isLoading, handleValidateAuthorization } = useSession();
  if (isLoading) return;
  if (!handleValidateAuthorization(service)) return;
  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const routes: RouteObject[] = [
  {
    path: '/settings/persons',
    element: <PrivateRoute service={'0201'} element={<AdminPersonsPage />} />
  },
  {
    path: '/settings/users',
    element: <PrivateRoute service={'0201'} element={<AdminUsersPage />} />
  },
  {
    path: '/settings/services',
    element: <PrivateRoute service={'0401'} element={<AdminServicesPage />} />
  },
  {
    path: '/settings/roles',
    element: <PrivateRoute service={'0301'} element={<AdminRolesPage />} />
  },
  {
    path: '/settings/kinds',
    element: <PrivateRoute service={'0701'} element={<AdminKindsPage />} />
  },
  {
    path: '/settings/genders',
    element: <PrivateRoute service={'0801'} element={<AdminGendersPage />} />
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
